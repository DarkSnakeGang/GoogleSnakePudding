#!/usr/bin/env node
/**
 * Static post-win analysis of the PuddingMod-altered snake.js.
 *
 * Proves (or disproves) that after the win the game keeps calling tick() every
 * frame, and inventories which mod hooks run per tick / per frame in that state.
 *
 * Usage:
 *   node tools/test-postwin-static.js            # PuddingMod library chain
 *   node tools/test-postwin-static.js --json     # also dump JSON to tools/.postwin-results/
 *
 * Exit code 1 if any structural expectation fails (snake.js or mod layout changed).
 */

const fs = require("fs");
const path = require("path");
const { ROOT, loadAltered, blockAt } = require("./lib/snake-cache.js");

const RESULTS_DIR = path.join(__dirname, ".postwin-results");
const ID = "[a-zA-Z0-9_$]{1,8}";

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "\n        " + detail : ""}`);
}
function info(name, detail) {
  results.push({ name, info: true, detail });
  console.log(`INFO  ${name}${detail ? "\n        " + detail : ""}`);
}

function puddingLibraries() {
  const src = fs.readFileSync(path.join(ROOT, "PuddingInit.js"), "utf8");
  const m = /window\.Libraries\s*=\s*\[([\s\S]*?)\]/.exec(src);
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

// window.* identifiers referenced inside a code block, deduped, in order of first use.
function windowRefs(text) {
  const seen = new Map();
  for (const m of text.matchAll(/window\.([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?)/g)) {
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
  return seen;
}

// Bare global helpers the mods inject (e.g. SplitPanelOnSplit, persistSnakePb).
function injectedGlobals(vanillaText, alteredText) {
  const re = /\b(SplitPanel[A-Za-z]*|persistSnakePb|SpeedInfo[A-Za-z]*|IncrementCounter|saveStatistics|timeKeeper)\b/g;
  const v = new Set([...vanillaText.matchAll(re)].map((m) => m[1]));
  const out = new Set();
  for (const m of alteredText.matchAll(re)) if (!v.has(m[1])) out.add(m[1]);
  return [...out];
}

function findTick(code) {
  const i = code.search(/\btick\(\)\{/);
  return i < 0 ? null : blockAt(code, i);
}

// Frame callback: `Zw(a){if(this.yb&&!this.closed){var b=this.wb.update(a);this.render(...`
function findFrame(code) {
  const re = new RegExp(`(${ID})\\(a\\)\\{if\\(this\\.${ID}&&!this\\.closed\\)\\{var b=this\\.(${ID})\\.update\\(a\\)`);
  const m = re.exec(code);
  if (!m) return null;
  const blk = blockAt(code, m.index);
  return { ...blk, name: m[1], engineField: m[2] };
}

// Engine update(a): contains the fixed-step catch-up loop that calls tick().
function findUpdate(code) {
  const loopRe = new RegExp(
    `if\\(([^;{}]{1,80})\\)for\\(;a-this\\.(${ID})>=this\\.(${ID});\\)this\\.\\2\\+=this\\.\\3,this\\.ticks\\+\\+,this\\.tick\\(\\)`
  );
  const m = loopRe.exec(code);
  if (!m) return null;
  const head = code.lastIndexOf("update(a){", m.index);
  const blk = head >= 0 ? blockAt(code, head) : null;
  return { loopIndex: m.index, guard: m[1], lastField: m[2], stepField: m[3], block: blk };
}

function findRenders(code) {
  const out = [];
  for (const m of code.matchAll(/\brender\(a,b\)\{/g)) {
    const blk = blockAt(code, m.index);
    if (blk) out.push(blk);
  }
  return out;
}

function summarizeRefs(label, vanillaText, alteredText) {
  const v = windowRefs(vanillaText);
  const a = windowRefs(alteredText);
  const added = [...a.entries()].filter(([k]) => !v.has(k)).map(([k, n]) => (n > 1 ? `${k} x${n}` : k));
  const globals = injectedGlobals(vanillaText, alteredText);
  const all = added.concat(globals.map((g) => g + " (bare)"));
  info(`${label}: mod hooks (${all.length})`, all.length ? all.join(", ") : "(none)");
  return all;
}

async function main() {
  const wantJson = process.argv.includes("--json");
  const libs = puddingLibraries();
  console.log(`Libraries (PuddingInit order): ${libs.join(", ")}\n`);
  const { vanilla, altered, verify } = await loadAltered(libs);
  if (verify.misses.length || verify.errors.length || verify.syntaxBreaks.length) {
    info(
      "alterCode chain problems",
      `misses=${verify.misses.length} errors=${verify.errors.length} syntax=${verify.syntaxBreaks.length}`
    );
  }

  // ---- tick(): TimeKeeper prefix ----
  const vTick = findTick(vanilla);
  const aTick = findTick(altered);
  check("vanilla tick() found", !!vTick);
  check("altered tick() found", !!aTick);
  if (!vTick || !aTick) return finish(wantJson);

  const prefixRe = new RegExp(
    `^tick\\(\\)\\{if\\(this\\.(${ID})\\)\\{window\\.timeKeeper\\.death\\(([^;]*?)\\);\\}else if\\(!window\\.timeKeeper\\.runStarted\\)\\{window\\.timeKeeper\\.start\\(\\);\\}`
  );
  const pm = prefixRe.exec(aTick.text);
  check(
    "tick() starts with TimeKeeper death/start prefix",
    !!pm,
    pm ? `if(this.${pm[1]}) window.timeKeeper.death(${pm[2]}) else if(!runStarted) start()` : aTick.text.slice(0, 200)
  );
  const endFlag = pm ? pm[1] : null;

  // ---- Win sets the same flag ----
  const winRe = new RegExp(
    `window\\.timeKeeper\\.gotAll\\([^;]*?\\),this\\.(${ID})=this\\.(${ID})=!0`
  );
  const wm = winRe.exec(altered);
  check(
    "win path calls gotAll() then sets the end flag",
    wm && endFlag && (wm[1] === endFlag || wm[2] === endFlag),
    wm ? `this.${wm[1]}=this.${wm[2]}=!0 (tick prefix flag: ${endFlag})` : "gotAll injection not found"
  );

  if (endFlag) {
    const reset = new RegExp(`this\\.${endFlag}=!1`).test(altered);
    const deathSet = new RegExp(`\\{this\\.${endFlag}=!0;this\\.${ID}=this\\.ticks`).test(altered);
    info("end flag lifecycle", `cleared by reset: ${reset}; also set by death Dc(): ${deathSet}`);
  }

  // ---- update(): catch-up loop is not gated by the end flag ----
  const vUpd = findUpdate(vanilla);
  const aUpd = findUpdate(altered);
  check("engine update() catch-up loop found", !!aUpd, aUpd ? `guard: if(${aUpd.guard})` : "");
  if (aUpd && endFlag) {
    const gated = new RegExp(`this\\.${endFlag}\\b`).test(aUpd.guard);
    check(
      "catch-up loop guard ignores the end flag (ticks continue after win)",
      !gated,
      `guard "${aUpd.guard}" (step ms field: this.${aUpd.stepField})`
    );
    const noneOnWin = wm ? /"NONE"/.test(altered.slice(wm.index, wm.index + 800)) : false;
    check("win path does not reset direction to NONE", !noneOnWin);
  }
  if (vUpd && aUpd) {
    check("catch-up loop unchanged by mods", vUpd.guard === aUpd.guard);
  }

  const fbRe = /this\.(\w+)=\(d\.isMobile\?(\d+):(\d+)\)\*a/.exec(vanilla);
  if (fbRe) {
    const desk = Number(fbRe[3]);
    const rates = [0.66, 1, 1.33].map((f) => `${(desk * f).toFixed(0)}ms (${(1000 / (desk * f)).toFixed(1)}/s)`);
    info("tick period desktop (fast/normal/slow)", rates.join(", "));
  }

  // ---- Frame callback: no win gate ----
  const aFrame = findFrame(altered);
  check("frame callback found", !!aFrame, aFrame ? `${aFrame.name}(a) -> this.${aFrame.engineField}.update(a)` : "");
  if (aFrame && endFlag) {
    const beforeUpdate = aFrame.text.slice(0, aFrame.text.indexOf(".update(a)"));
    check(
      "frame callback calls update() without an end-flag gate",
      !beforeUpdate.includes(`.${endFlag}`),
      beforeUpdate
    );
  }

  // ---- Hook inventory ----
  console.log("");
  const inventory = {};
  inventory.tick = summarizeRefs("tick()", vTick.text, aTick.text);
  if (vUpd && aUpd && vUpd.block && aUpd.block) {
    inventory.update = summarizeRefs("update(a)", vUpd.block.text, aUpd.block.text);
  }
  const vFrame = findFrame(vanilla);
  if (vFrame && aFrame) inventory.frame = summarizeRefs(`${aFrame.name}(a) frame`, vFrame.text, aFrame.text);

  const vR = findRenders(vanilla);
  const aR = findRenders(altered);
  const vRefCount = vR.reduce((n, b) => n + windowRefs(b.text).size, 0);
  const renderHooks = new Set();
  for (const b of aR) for (const k of windowRefs(b.text).keys()) renderHooks.add(k);
  info(
    `render(a,b) methods: ${aR.length} altered / ${vR.length} vanilla`,
    `mod window refs: ${[...renderHooks].join(", ") || "(none)"} (vanilla had ${vRefCount})`
  );
  inventory.render = [...renderHooks];

  // Which tick hooks fire in the post-win state (end flag true) vs only on live ticks.
  const postWinOnly = pm ? ["timeKeeper.death (no-op once playing=false)"] : [];
  info("hooks called on EVERY post-win / post-death tick", postWinOnly.join(", ") || "(none)");

  // ---- TimeKeeper runtime state machine (source-level) ----
  console.log("");
  const tk = fs.readFileSync(path.join(ROOT, "Libraries", "TimeKeeper.js"), "utf8");
  const fnBody = (name) => {
    const i = tk.indexOf(`window.timeKeeper.${name} = function`);
    return i < 0 ? "" : blockAt(tk, i).text;
  };
  const gotAll = fnBody("gotAll");
  const death = fnBody("death");
  const saveScore = fnBody("saveScore");
  info(
    "saveScore() cost",
    /setStorage\(/.test(saveScore) && /refreshSpeedInfo\(/.test(saveScore) ? "setStorage + refreshSpeedInfo" : "(changed)"
  );
  check("gotAll() clears playing", /playing\s*=\s*false/.test(gotAll));
  check(
    "death() saves only while playing (not while runStarted, which lasts until reset)",
    /if\s*\(window\.timeKeeper\.playing\)\s*\{\s*window\.timeKeeper\.saveScore\(/.test(death) && !/runStarted/.test(death)
  );
  check("death() clears playing", /playing\s*=\s*false;\s*\}\s*$/.test(death));
  const clears = [...tk.matchAll(/window\.timeKeeper\.(\w+) = function[\s\S]*?(?=\n    window\.timeKeeper\.\w+ = function|$)/g)]
    .filter((m) => /runStarted\s*=\s*false/.test(m[0]))
    .map((m) => m[1]);
  info("functions that clear runStarted", clears.join(", ") || "(none)");
  const setStorage = fnBody("setStorage");
  info(
    "setStorage() per call",
    [
      /syncLegacyTimeKeeperMirrors/.test(setStorage) && "syncLegacyTimeKeeperMirrors (JSON clone of every PB row x2)",
      /JSON\.stringify/.test(setStorage) && "JSON.stringify(whole store)",
      /localStorage\.setItem/.test(setStorage) && "localStorage.setItem",
    ]
      .filter(Boolean)
      .join(" + ")
  );

  finish(wantJson, { inventory, endFlag, guard: aUpd && aUpd.guard });
}

function finish(wantJson, extra = {}) {
  const failed = results.filter((r) => r.ok === false);
  console.log(`\n${failed.length ? "FAILED" : "OK"}: ${results.filter((r) => r.ok).length} passed, ${failed.length} failed`);
  if (wantJson) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    const out = path.join(RESULTS_DIR, "static.json");
    fs.writeFileSync(out, JSON.stringify({ when: new Date().toISOString(), results, ...extra }, null, 2));
    console.log(`wrote ${out}`);
  }
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
