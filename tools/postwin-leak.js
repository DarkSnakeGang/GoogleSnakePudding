#!/usr/bin/env node
/**
 * Browser (Edge) runner for the post-win idle memory / slowdown investigation.
 *
 * Serves the local mod bundle in place of the GitHub copy, appends a test-only
 * patch (window.__snakeGame, window.__forceWin), injects tools/postwin-probe.js,
 * and samples CDP metrics (after a forced GC), probe counters and Edge process
 * memory while the game sits on the win screen.
 *
 * Usage:
 *   node tools/postwin-leak.js [options]
 *
 *   --mod PuddingMod|SpeedrunMod|MorePudding|vanilla   (default PuddingMod, built from Libraries/)
 *   --scenarios S0,S1,S2,S3,S3b                         (default S2,S3)
 *        S0  menu idle            S1  idle after death      S2  idle on win screen (visible)
 *        S3  simulated hidden tab: after win, rewind the frame clock by N minutes so the
 *            next frame runs the same catch-up loop a returning background tab would
 *        S3b real background tab (headed): switch to another tab for --bg-minutes, return
 *   --ablate none|legacy|fix|death-noop|speedinfo-off|splitpanel-off   (default none)
 *        legacy = force playing=true before every death() call (old `playing || runStarted` guard)
 *        fix    = runStarted=false right after the run ends
 *   --store small|medium|large|none|path.json          (seeded snake_timeKeeper, default medium)
 *   --minutes 10  --interval 10                        (S0/S1/S2 idle length / sample period, s)
 *   --hidden 1,5,15                                     (S3 rewind minutes)
 *   --bg-minutes 3                                      (S3b)
 *   --headed    --tag name
 *
 * Writes tools/.postwin-results/<tag>.json and prints a summary.
 */

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { chromium } = require(path.join(__dirname, "..", "node_modules", "playwright-core"));
const { PRESETS } = require("./lib/synthetic-store.js");

const ROOT = path.resolve(__dirname, "..");
const RESULTS_DIR = path.join(__dirname, ".postwin-results");
const GAME_URL = "https://googlesnakemods.com/v/current/";
const MOD_URL_RE = /^https:\/\/raw\.githubusercontent\.com\/DarkSnakeGang\/GoogleSnakePudding\/main\/([A-Za-z]+)\.js/;

// ---------------- args ----------------
function arg(name, def) {
  const i = process.argv.indexOf("--" + name);
  if (i < 0) return def;
  const v = process.argv[i + 1];
  return v === undefined || v.startsWith("--") ? true : v;
}
const opts = {
  mod: arg("mod", "PuddingMod"),
  scenarios: String(arg("scenarios", "S2,S3")).split(","),
  ablate: arg("ablate", "none"),
  store: arg("store", "medium"),
  minutes: Number(arg("minutes", 10)),
  interval: Number(arg("interval", 10)),
  hidden: String(arg("hidden", "1,5,15")).split(",").map(Number),
  bgMinutes: Number(arg("bg-minutes", 3)),
  headed: !!arg("headed", false),
};
opts.tag = arg("tag", `${opts.mod}-${opts.ablate}-${opts.scenarios.join("")}-${opts.store}`.replace(/[^\w.-]+/g, "_"));

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

// ---------------- bundle + patch ----------------
function buildPuddingBundle() {
  const init = fs.readFileSync(path.join(ROOT, "PuddingInit.js"), "utf8");
  const libs = [.../window\.Libraries\s*=\s*\[([\s\S]*?)\]/.exec(init)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const marker = "////////////////////////////////////////////////////////////////////\n//RUNCODEBEFORE";
  const [head, body] = init.includes(marker) ? init.split(marker) : ["", init];
  let out = head;
  for (const lib of libs) out += fs.readFileSync(path.join(ROOT, "Libraries", lib + ".js"), "utf8");
  return out + (init.includes(marker) ? marker + body : body);
}

const TEST_PATCH = `
;window.__postwinPatchCode = function (code) {
  var ok = {};
  var before = code;
  code = code.replace(/(;)(if\\(this\\.[\\w$]+\\.direction!=="NONE"\\|\\|[\\w$]+\\(this\\.[\\w$]+\\)\\)for\\(;a-this\\.)/, "$1window.__snakeGame=this;$2");
  ok.expose = code !== before; before = code;
  code = code.replace(/if\\(([\\w$]{1,8})\\(this\\)===0\\)\\{([\\w$]{1,8})\\.WIN\\.play\\(\\)/, "if((window.__forceWin&&!(window.__forceWin=!1))||$1(this)===0){$2.WIN.play()");
  ok.forceWin = code !== before;
  window.__postwinPatchOk = ok;
  return code;
};
(function (name) {
  var M = window[name];
  if (!M) { console.error("postwin patch: window." + name + " missing"); return; }
  var orig = M.alterSnakeCode;
  M.alterSnakeCode = function (code) {
    code = orig ? orig.call(M, code) : code;
    return window.__postwinPatchCode(code);
  };
})(%NAME%);
`;

function bundleFor(modKey) {
  if (modKey === "vanilla") {
    return {
      servedAs: "PuddingMod",
      code: "window.PuddingMod={runCodeBefore:function(){},alterSnakeCode:function(c){return c},runCodeAfter:function(){}};" + TEST_PATCH.replace("%NAME%", '"PuddingMod"'),
    };
  }
  const code = modKey === "PuddingMod" ? buildPuddingBundle() : fs.readFileSync(path.join(ROOT, modKey + ".js"), "utf8");
  return { servedAs: modKey, code: code + TEST_PATCH.replace("%NAME%", JSON.stringify(modKey)) };
}

function storeSeed(store) {
  if (store === "none") return null;
  if (PRESETS[store]) return JSON.stringify(PRESETS[store]());
  const raw = fs.readFileSync(path.resolve(store), "utf8").trim();
  return raw.startsWith('"') ? JSON.parse(raw) : raw;
}

// ---------------- process memory (Windows) ----------------
function procMem(userDataDir) {
  if (process.platform !== "win32" || !userDataDir) return Promise.resolve(null);
  const needle = userDataDir.replace(/'/g, "''");
  const ps =
    "Get-CimInstance Win32_Process -Filter \"Name='msedge.exe'\" | Where-Object { $_.CommandLine -like '*" +
    needle +
    "*' } | ForEach-Object { $t = if ($_.CommandLine -match '--type=([\\w-]+)') { $matches[1] } else { 'browser' }; if ($_.CommandLine -match '--utility-sub-type=([\\w.]+)') { $t = $t + ':' + $matches[1] }; '{0}|{1}' -f $t, $_.PrivatePageCount }";
  return new Promise((resolve) => {
    execFile("powershell.exe", ["-NoProfile", "-Command", ps], { windowsHide: true, timeout: 20000 }, (err, stdout) => {
      if (err) return resolve(null);
      const byType = {};
      let total = 0;
      for (const line of stdout.split(/\r?\n/)) {
        const [t, v] = line.split("|");
        if (!t || !v) continue;
        const mb = Number(v) / 1048576;
        byType[t] = +((byType[t] || 0) + mb).toFixed(1);
        total += mb;
      }
      resolve({ totalMB: +total.toFixed(1), byType });
    });
  });
}

// ---------------- page helpers ----------------
async function newSession(browser, seed) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const bundle = bundleFor(opts.mod);
  await ctx.route(MOD_URL_RE, (route) => {
    const m = MOD_URL_RE.exec(route.request().url());
    if (m && m[1] === bundle.servedAs) {
      return route.fulfill({ status: 200, contentType: "application/javascript; charset=utf-8", body: bundle.code });
    }
    return route.continue();
  });
  await ctx.addInitScript({ path: path.join(__dirname, "postwin-probe.js") });
  await ctx.addInitScript(
    ({ seed, mod }) => {
      if (!localStorage.getItem("__postwinSeeded")) {
        if (seed) localStorage.setItem("snake_timeKeeper", seed);
        localStorage.setItem("snakeChosenMod", mod);
        localStorage.setItem("__postwinSeeded", "1");
      }
    },
    { seed, mod: bundle.servedAs }
  );
  const page = await ctx.newPage();
  const events = { crashed: false, errors: [] };
  page.on("crash", () => {
    events.crashed = true;
    log("!!! renderer CRASHED");
  });
  page.on("pageerror", (e) => events.errors.push(String(e.message).slice(0, 300)));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Performance.enable");
  return { ctx, page, cdp, events };
}

async function loadGame(s) {
  await s.page.goto(GAME_URL, { waitUntil: "load", timeout: 120000 });
  await s.page.waitForFunction(() => document.querySelector('[jsname^="NSjDf"]') && window.__postwinPatchOk, null, { timeout: 120000 });
  const patch = await s.page.evaluate(() => window.__postwinPatchOk);
  if (!patch.expose || !patch.forceWin) throw new Error("test patch did not apply: " + JSON.stringify(patch));
  await s.page.waitForTimeout(3000);
  // First-visit mod selector dialog covers the board
  await s.page.evaluate(() => {
    const c = document.getElementById("mod-selector-dialogue-container");
    if (!c) return;
    const close = [...c.querySelectorAll("button, .mod-sel-btn, div, span")].find((e) => e.textContent.trim() === "Close");
    if (close) close.click();
    c.style.display = "none";
  });
  await applyAblationBeforeRun(s);
  await s.page.evaluate(() => window.__postwin.install());
}

async function startRun(s) {
  await s.page.click('[jsname^="NSjDf"]', { timeout: 10000 });
  await s.page.waitForTimeout(1200);
  await s.page.keyboard.press("ArrowRight");
  await s.page.waitForFunction(() => window.__snakeGame && window.__snakeGame.oa.direction !== "NONE", null, { timeout: 15000 });
  await s.page.waitForTimeout(800);
}

async function winRun(s) {
  await startRun(s);
  await s.page.evaluate(() => (window.__forceWin = true));
  await s.page.waitForFunction(() => window.__snakeGame.ub && window.__snakeGame.nj, null, { timeout: 15000 });
  await applyAblationAfterEnd(s);
}

async function dieRun(s) {
  await startRun(s);
  await s.page.keyboard.press("ArrowUp");
  await s.page.waitForFunction(() => window.__snakeGame.nj && !window.__snakeGame.ub, null, { timeout: 30000 });
  await applyAblationAfterEnd(s);
}

async function applyAblationBeforeRun(s) {
  if (opts.ablate === "speedinfo-off") {
    await s.page.evaluate(() => {
      window.SpeedInfoUpdate = () => Promise.resolve();
      window.SpeedInfoPaintPersonalRow = () => {};
    });
  } else if (opts.ablate === "splitpanel-off") {
    await s.page.evaluate(() => {
      window.SplitPanelOnSplit = () => {};
      window.SplitPanelRefresh = () => {};
    });
  }
}

async function applyAblationAfterEnd(s) {
  if (opts.ablate === "fix") {
    await s.page.evaluate(() => window.timeKeeper && (window.timeKeeper.runStarted = false));
  } else if (opts.ablate === "legacy") {
    await s.page.evaluate(() => {
      const tk = window.timeKeeper;
      if (!tk) return;
      const death = tk.death;
      tk.death = function () {
        tk.playing = true;
        return death.apply(this, arguments);
      };
      window.__postwin.install();
    });
  } else if (opts.ablate === "death-noop") {
    await s.page.evaluate(() => {
      if (!window.timeKeeper) return;
      window.timeKeeper.death = function () {};
      window.__postwin.install();
    });
  }
}

async function sample(s, userDataDir, label) {
  if (s.events.crashed) return { label, crashed: true };
  await s.cdp.send("HeapProfiler.collectGarbage").catch(() => {});
  const { metrics } = await s.cdp.send("Performance.getMetrics");
  const m = Object.fromEntries(metrics.map((x) => [x.name, x.value]));
  const probe = await s.page.evaluate(() => window.__postwin.report());
  const proc = await procMem(userDataDir);
  return {
    label,
    t: Date.now(),
    heapMB: +(m.JSHeapUsedSize / 1048576).toFixed(2),
    heapTotalMB: +(m.JSHeapTotalSize / 1048576).toFixed(2),
    nodes: m.Nodes,
    listeners: m.JSEventListeners,
    documents: m.Documents,
    taskSec: +m.TaskDuration.toFixed(2),
    scriptSec: +m.ScriptDuration.toFixed(2),
    layouts: m.LayoutCount,
    proc,
    probe,
  };
}

function slope(points, key) {
  const pts = points.filter((p) => typeof key(p) === "number");
  if (pts.length < 2) return 0;
  const t0 = pts[0].t;
  const xs = pts.map((p) => (p.t - t0) / 60000);
  const ys = pts.map(key);
  const mx = xs.reduce((a, b) => a + b) / xs.length;
  const my = ys.reduce((a, b) => a + b) / ys.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  return den ? +(num / den).toFixed(3) : 0;
}

function perMinute(first, last, key) {
  const a = first.probe.counts[key] || 0;
  const b = last.probe.counts[key] || 0;
  const min = (last.t - first.t) / 60000;
  return min > 0 ? +((b - a) / min).toFixed(1) : 0;
}

function summarizeIdle(samples) {
  const ok = samples.filter((x) => !x.crashed);
  if (ok.length < 2) return { crashed: samples.some((x) => x.crashed) };
  const first = ok[0];
  const last = ok[ok.length - 1];
  const mbw = ((last.probe.bytes["localStorage.setItem"] || 0) - (first.probe.bytes["localStorage.setItem"] || 0)) / 1048576;
  const min = (last.t - first.t) / 60000;
  return {
    minutes: +min.toFixed(1),
    crashed: samples.some((x) => x.crashed),
    heapMBperMin: slope(ok, (p) => p.heapMB),
    nodesPerMin: slope(ok, (p) => p.nodes),
    procMBperMin: slope(ok, (p) => p.proc && p.proc.totalMB),
    rendererMBperMin: slope(ok, (p) => p.proc && p.proc.byType.renderer),
    heapMB: [first.heapMB, last.heapMB],
    nodes: [first.nodes, last.nodes],
    procMB: [first.proc && first.proc.totalMB, last.proc && last.proc.totalMB],
    ticksPerMin: first.probe.game && last.probe.game ? +((last.probe.game.ticks - first.probe.game.ticks) / min).toFixed(1) : null,
    setItemPerMin: perMinute(first, last, "localStorage.setItem"),
    setItemMBperMin: +(mbw / min).toFixed(1),
    deathPerMin: perMinute(first, last, "timeKeeper.death"),
    saveScorePerMin: perMinute(first, last, "timeKeeper.saveScore"),
    speedInfoUpdatePerMin: perMinute(first, last, "SpeedInfoUpdate"),
    innerHTMLPerMin: perMinute(first, last, "innerHTML="),
    fetchPerMin: perMinute(first, last, "fetch"),
    setTimeoutPerMin: perMinute(first, last, "setTimeout"),
    createElementPerMin: perMinute(first, last, "createElement"),
    taskSecPerMin: +((last.taskSec - first.taskSec) / min).toFixed(2),
    frameP95: last.probe.frames.p95,
    frameMax: last.probe.frames.max,
    longTasks: last.probe.longTasks,
  };
}

// ---------------- scenarios ----------------
async function idleScenario(browser, name, prepare) {
  const seed = storeSeed(opts.store);
  const s = await newSession(browser, seed);
  const udd = browser.__userDataDir;
  try {
    await loadGame(s);
    await prepare(s);
    await s.page.waitForTimeout(2000);
    await s.page.evaluate(() => window.__postwin.reset());
    const samples = [];
    const n = Math.max(2, Math.round((opts.minutes * 60) / opts.interval) + 1);
    for (let i = 0; i < n; i++) {
      if (i) await s.page.waitForTimeout(opts.interval * 1000);
      const smp = await sample(s, udd, `${name}#${i}`);
      samples.push(smp);
      if (smp.crashed) break;
      if (i % 6 === 0 || i === n - 1) {
        log(
          `${name} t=${((smp.t - samples[0].t) / 60000).toFixed(1)}m heap=${smp.heapMB}MB nodes=${smp.nodes} proc=${smp.proc ? smp.proc.totalMB : "?"}MB setItem=${smp.probe.counts["localStorage.setItem"] || 0} death=${smp.probe.counts["timeKeeper.death"] || 0} ticks=${smp.probe.game ? smp.probe.game.ticks : "-"}`
        );
      }
    }
    return { name, samples, summary: summarizeIdle(samples), errors: s.events.errors.slice(0, 20) };
  } finally {
    await s.ctx.close().catch(() => {});
  }
}

async function catchUp(s, udd, label, run) {
  await s.page.evaluate(() => window.__postwin.reset());
  const before = await sample(s, udd, label + ":before");
  let peak = before.proc ? before.proc.totalMB : 0;
  let peakRenderer = before.proc ? before.proc.byType.renderer || 0 : 0;
  let polling = true;
  const poller = (async () => {
    while (polling) {
      const p = await procMem(udd);
      if (p) {
        peak = Math.max(peak, p.totalMB);
        peakRenderer = Math.max(peakRenderer, p.byType.renderer || 0);
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  })();
  const t0 = Date.now();
  let timedOut = false;
  try {
    await run();
    await s.page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))), null);
  } catch (e) {
    timedOut = true;
    log(`${label}: ${e.message.split("\n")[0]}`);
  }
  const wallMs = Date.now() - t0;
  polling = false;
  await poller;
  const after = s.events.crashed ? { crashed: true } : await sample(s, udd, label + ":after");
  const p = after.probe || {};
  const res = {
    label,
    wallMs,
    timedOut,
    crashed: s.events.crashed,
    maxFrameMs: p.frames ? p.frames.max : null,
    ticksInOneFrame: p.game ? p.game.maxTicksInOneFrame : null,
    setItem: p.counts ? p.counts["localStorage.setItem"] || 0 : null,
    setItemMB: p.bytes ? +((p.bytes["localStorage.setItem"] || 0) / 1048576).toFixed(1) : null,
    death: p.counts ? p.counts["timeKeeper.death"] || 0 : null,
    speedInfoUpdate: p.counts ? p.counts.SpeedInfoUpdate || 0 : null,
    heapMB: [before.heapMB, after.heapMB],
    procMB: [before.proc && before.proc.totalMB, after.proc && after.proc.totalMB],
    procPeakMB: +peak.toFixed(1),
    rendererPeakMB: +peakRenderer.toFixed(1),
  };
  log(
    `${label}: wall=${res.wallMs}ms maxFrame=${res.maxFrameMs}ms ticks/frame=${res.ticksInOneFrame} setItem=${res.setItem} (${res.setItemMB}MB) procPeak=${res.procPeakMB}MB renderPeak=${res.rendererPeakMB}MB crashed=${res.crashed}`
  );
  return res;
}

async function hiddenSimScenario(browser) {
  const s = await newSession(browser, storeSeed(opts.store));
  const udd = browser.__userDataDir;
  try {
    await loadGame(s);
    await winRun(s);
    await s.page.waitForTimeout(3000);
    const results = [];
    for (const minutes of opts.hidden) {
      if (s.events.crashed) break;
      s.page.setDefaultTimeout(Math.max(120000, minutes * 60000));
      const r = await catchUp(s, udd, `S3 rewind ${minutes}m`, () =>
        s.page.evaluate((ms) => {
          window.__snakeGame.ob -= ms;
        }, minutes * 60000)
      );
      r.minutes = minutes;
      results.push(r);
      await s.page.waitForTimeout(3000).catch(() => {});
    }
    return { name: "S3", results, errors: s.events.errors.slice(0, 20) };
  } finally {
    await s.ctx.close().catch(() => {});
  }
}

async function backgroundScenario(browser) {
  const s = await newSession(browser, storeSeed(opts.store));
  const udd = browser.__userDataDir;
  try {
    await loadGame(s);
    await winRun(s);
    await s.page.waitForTimeout(3000);
    await s.page.evaluate(() => window.__postwin.reset());
    const other = await s.ctx.newPage();
    await other.goto("about:blank");
    await other.bringToFront();
    await s.page.waitForTimeout(1500);
    const vis = await s.page.evaluate(() => document.visibilityState);
    log(`S3b: game tab visibility after switching away = ${vis}`);
    const mid = [];
    const steps = Math.max(1, Math.round((opts.bgMinutes * 60) / 30));
    for (let i = 0; i < steps; i++) {
      await s.page.waitForTimeout(30000);
      mid.push(await sample(s, udd, `S3b hidden#${i}`));
      const last = mid[mid.length - 1];
      log(`S3b hidden t=${((i + 1) * 0.5).toFixed(1)}m ticks=${last.probe.game && last.probe.game.ticks} setItem=${last.probe.counts["localStorage.setItem"] || 0} proc=${last.proc && last.proc.totalMB}MB`);
    }
    s.page.setDefaultTimeout(Math.max(120000, opts.bgMinutes * 60000));
    const back = await catchUp(s, udd, `S3b return after ${opts.bgMinutes}m`, () => s.page.bringToFront());
    await other.close();
    return { name: "S3b", visibilityWhileAway: vis, hiddenSamples: mid, result: back, errors: s.events.errors.slice(0, 20) };
  } finally {
    await s.ctx.close().catch(() => {});
  }
}

// ---------------- main ----------------
async function main() {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const needHeaded = opts.headed || opts.scenarios.includes("S3b");
  log(`mod=${opts.mod} ablate=${opts.ablate} store=${opts.store} scenarios=${opts.scenarios.join(",")} headed=${needHeaded}`);
  const server = await chromium.launchServer({ channel: "msedge", headless: !needHeaded });
  const spawnargs = server.process().spawnargs || [];
  const uddArg = spawnargs.find((a) => a.startsWith("--user-data-dir="));
  const browser = await chromium.connect(server.wsEndpoint());
  browser.__userDataDir = uddArg ? uddArg.slice("--user-data-dir=".length) : null;

  const out = { when: new Date().toISOString(), opts, scenarios: {} };
  const save = () => fs.writeFileSync(path.join(RESULTS_DIR, opts.tag + ".json"), JSON.stringify(out, null, 2));
  try {
    for (const sc of opts.scenarios) {
      log(`--- ${sc} ---`);
      try {
        if (sc === "S0") out.scenarios.S0 = await idleScenario(browser, "S0 menu", async () => {});
        else if (sc === "S1") out.scenarios.S1 = await idleScenario(browser, "S1 death", dieRun);
        else if (sc === "S2") out.scenarios.S2 = await idleScenario(browser, "S2 win", winRun);
        else if (sc === "S3") out.scenarios.S3 = await hiddenSimScenario(browser);
        else if (sc === "S3b") out.scenarios.S3b = await backgroundScenario(browser);
        else log(`unknown scenario ${sc}`);
      } catch (e) {
        out.scenarios[sc] = { error: String(e.stack || e) };
        log(`${sc} failed: ${e.message}`);
      }
      save();
    }
  } finally {
    await browser.close().catch(() => {});
    await server.close().catch(() => {});
  }

  console.log(`\n===== SUMMARY ${opts.tag} =====`);
  for (const [k, v] of Object.entries(out.scenarios)) {
    if (v.error) console.log(`${k}: ERROR ${v.error.split("\n")[0]}`);
    else if (v.summary) console.log(`${k}:`, JSON.stringify(v.summary));
    else if (v.results) for (const r of v.results) console.log(`${k} ${r.minutes}m:`, JSON.stringify(r));
    else if (v.result) console.log(`${k} (visibility away: ${v.visibilityWhileAway}):`, JSON.stringify(v.result));
  }
  console.log(`wrote ${path.join(RESULTS_DIR, opts.tag + ".json")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
