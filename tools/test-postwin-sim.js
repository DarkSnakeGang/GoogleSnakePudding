#!/usr/bin/env node
/**
 * Microbenchmark of the post-win state in TimeKeeper, outside the browser.
 *
 * After gotAll() the game keeps ticking and tick() calls timeKeeper.death() every
 * tick (see test-postwin-static.js). This measures what one idle minute / hour of
 * that costs: localStorage.setItem calls, bytes serialized, wall time, heap, and
 * SpeedInfoUpdate calls. "legacy-*" rows force playing=true before each tick to
 * show the cost of the old `playing || runStarted` guard in death().
 *
 * Usage:
 *   node tools/test-postwin-sim.js
 *   node tools/test-postwin-sim.js --store my_snake_timeKeeper.json   # real exported store
 *   node tools/test-postwin-sim.js --json
 *
 * Exit code 1 if idle ticks after a win or death still write storage.
 */

const { spawnSync } = require("child_process");
if (typeof global.gc !== "function") {
  const r = spawnSync(process.execPath, ["--expose-gc", __filename, ...process.argv.slice(2)], { stdio: "inherit" });
  process.exit(r.status == null ? 2 : r.status);
}

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib/snake-cache.js");
const verify = require("./verify.js");
const { syntheticStore } = require("./lib/synthetic-store.js");

const RESULTS_DIR = path.join(__dirname, ".postwin-results");
const TICK_MS = 135; // desktop normal speed (see static test)
const DURATIONS_MIN = [1, 10, 60];
const SKIP_OVER_MS = 20000; // extrapolate instead of running a single scenario longer than this

const argv = process.argv.slice(2);
const storeArg = argv.includes("--store") ? argv[argv.indexOf("--store") + 1] : null;
const wantJson = argv.includes("--json");

// ---- counting localStorage ----
const counters = { setItem: 0, setItemBytes: 0, speedInfoUpdate: 0, paintRow: 0 };
function installCountingStorage() {
  const store = Object.create(null);
  global.localStorage = {
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
    },
    setItem(k, v) {
      counters.setItem++;
      const s = String(v);
      counters.setItemBytes += s.length * 2; // UTF-16 in DOMStorage
      store[k] = s;
    },
    removeItem(k) {
      delete store[k];
    },
  };
}

function loadLib(name) {
  const src = fs.readFileSync(path.join(ROOT, "Libraries", `${name}.js`), "utf8");
  // Libraries attach to window.X; indirect eval runs in global scope where the stubs live
  (0, eval)(src);
}

function setupTimeKeeper(storeObj) {
  verify.installBrowserStubs();
  installCountingStorage();
  global.window.count_var = "0";
  global.window.speed_var = "0";
  global.window.size_var = "0";
  global.window.SpeedInfoUpdate = () => {
    counters.speedInfoUpdate++;
    return Promise.resolve();
  };
  global.window.SpeedInfoPaintPersonalRow = () => {
    counters.paintRow++;
  };
  localStorage.setItem("snake_timeKeeper", JSON.stringify(storeObj));
  loadLib("ModeRegistry");
  loadLib("TimeKeeper");
  window.ModeRegistry.getCurrentModeKey = () => "classic";
  window.TimeKeeper.make(); // runs makeStorage(): migrates + mirrors like page load
  return window.timeKeeper;
}

function resetCounters() {
  for (const k of Object.keys(counters)) counters[k] = 0;
}

function heapMB() {
  global.gc();
  global.gc();
  return process.memoryUsage().heapUsed / 1048576;
}

// variant: "win"   idle ticks after gotAll()
//          "death" idle ticks after the real death() call
//          "menu"  runStarted false, never played
//          "legacy-win" / "legacy-death": same, but playing is forced back to true
//          before every tick, reproducing the old `playing || runStarted` guard.
function runScenario(tk, variant, ticks) {
  tk.addAttempt(); // clear state from previous scenario
  tk.playing = false;
  tk.runStarted = false;
  const legacy = variant.startsWith("legacy-");
  const kind = legacy ? variant.slice(7) : variant;
  if (kind !== "menu") {
    tk.start();
    for (let apple = 1; apple <= 30; apple++) tk.gotApple(apple * 2000, apple);
  }
  if (kind === "win") tk.gotAll(62000, 30);
  if (kind === "death") tk.death(62000, 30);
  resetCounters();
  const h0 = heapMB();
  const t0 = process.hrtime.bigint();
  for (let i = 0; i < ticks; i++) {
    if (legacy) tk.playing = true;
    tk.death(62000 + i * TICK_MS, 30);
  }
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  const h1 = heapMB();
  return {
    variant,
    ticks,
    setItem: counters.setItem,
    setItemMB: +(counters.setItemBytes / 1048576).toFixed(2),
    speedInfoUpdate: counters.speedInfoUpdate,
    ms: +ms.toFixed(1),
    msPerTick: +(ms / ticks).toFixed(3),
    heapDeltaMB: +(h1 - h0).toFixed(2),
  };
}

function storeSummary(tk) {
  const s = tk.getStorage();
  const keys = Object.keys(s).length;
  const bytes = JSON.stringify(s).length * 2;
  return { keys, kb: +(bytes / 1024).toFixed(1) };
}

function main() {
  const stores = [];
  if (storeArg) {
    const raw = fs.readFileSync(path.resolve(storeArg), "utf8").trim();
    stores.push({ name: path.basename(storeArg), obj: JSON.parse(raw.startsWith('"') ? JSON.parse(raw) : raw) });
  } else {
    stores.push({ name: "small (5 modes x 3 settings)", obj: syntheticStore(5, 3) });
    stores.push({ name: "medium (40 modes x 6 settings)", obj: syntheticStore(40, 6) });
    stores.push({ name: "large (150 modes x 12 settings)", obj: syntheticStore(150, 12) });
  }

  const report = [];
  const failures = [];
  for (const st of stores) {
    const tk = setupTimeKeeper(st.obj);
    const sum = storeSummary(tk);
    console.log(`\n=== store: ${st.name} -> ${sum.keys} keys after mirror sync, ${sum.kb} KB JSON ===`);
    console.log("variant       idle   ticks   setItem   MB-written  SpeedInfoUpd   ms-total  ms/tick  heapDeltaMB");
    const msPerTickSeen = {};
    for (const minutes of DURATIONS_MIN) {
      const ticks = Math.round((minutes * 60000) / TICK_MS);
      for (const variant of ["win", "death", "menu", "legacy-win", "legacy-death"]) {
        const predicted = (msPerTickSeen[variant] || 0) * ticks;
        if (predicted > SKIP_OVER_MS) {
          console.log(
            `${variant.padEnd(12)} ${String(minutes).padStart(4)}m ${String(ticks).padStart(7)}   skipped (extrapolated ~${(predicted / 1000).toFixed(0)} s, ${ticks} setItem)`
          );
          report.push({ variant, minutes, ticks, store: st.name, extrapolatedMs: Math.round(predicted) });
          continue;
        }
        const r = runScenario(tk, variant, ticks);
        msPerTickSeen[variant] = r.msPerTick;
        r.minutes = minutes;
        r.store = st.name;
        r.storeKeys = sum.keys;
        r.storeKB = sum.kb;
        report.push(r);
        console.log(
          `${variant.padEnd(12)} ${String(minutes).padStart(4)}m ${String(ticks).padStart(7)} ${String(r.setItem).padStart(9)} ${String(r.setItemMB).padStart(12)} ${String(r.speedInfoUpdate).padStart(13)} ${String(r.ms).padStart(10)} ${String(r.msPerTick).padStart(8)} ${String(r.heapDeltaMB).padStart(12)}`
        );
        if ((variant === "win" || variant === "death" || variant === "menu") && r.setItem !== 0) {
          failures.push(`${st.name} ${variant} ${minutes}m: ${r.setItem} setItem while idle`);
        }
      }
    }
  }

  console.log(
    failures.length
      ? `\nFAIL: idle ticks after the run ended still write storage:\n  ${failures.join("\n  ")}`
      : "\nPASS: after a win or death, idle ticks write storage 0 times (legacy rows show the pre-fix cost)."
  );
  console.log(
    "Note: a hidden tab returning after N minutes runs all N minutes of ticks in ONE frame; ms-total above is that freeze (Node, no DOM/SpeedInfo cost)."
  );

  if (wantJson) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    const out = path.join(RESULTS_DIR, "sim.json");
    fs.writeFileSync(out, JSON.stringify({ when: new Date().toISOString(), tickMs: TICK_MS, report }, null, 2));
    console.log(`wrote ${out}`);
  }
  process.exit(failures.length ? 1 : 0);
}

main();
