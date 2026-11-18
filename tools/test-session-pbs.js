#!/usr/bin/env node
/**
 * Session PBs are an in-memory Speed Info view.
 * They use the same keys as all-time PBs and must never write snake_timeKeeper.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function makeLocalStorage(initial) {
  const data = Object.assign({}, initial || {});
  return {
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null;
    },
    setItem(k, v) {
      data[k] = String(v);
    },
    removeItem(k) {
      delete data[k];
    },
    _data: data,
  };
}

function bootTimeKeeper(localStorage) {
  const sandbox = {
    window: {},
    console,
    localStorage,
    document: {},
    queueMicrotask(fn) {
      fn();
    },
    Date,
    Math,
    JSON,
    Object,
    Number,
    String,
    isFinite,
    isNaN,
  };
  sandbox.window.window = sandbox.window;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, "Libraries", "TimeKeeper.js"), "utf8"),
    sandbox,
    { filename: "TimeKeeper.js" }
  );
  sandbox.window.ModeRegistry = {
    has() {
      return false;
    },
    getCurrentModeKey() {
      return "classic";
    },
    isBitstringModePart() {
      return false;
    },
  };
  sandbox.window.pudding_settings = { SessionPbs: false };
  sandbox.window.TimeKeeper.make();
  return sandbox;
}

function stored(localStorage) {
  return JSON.parse(localStorage.getItem("snake_timeKeeper"));
}

function armRun(tk) {
  tk.runStarted = true;
  tk.playing = true;
  tk.mode = "classic";
  tk.count = 0;
  tk.speed = 0;
  tk.size = 0;
}

function testSessionDoesNotWriteAllTime() {
  const localStorage = makeLocalStorage();
  const sandbox = bootTimeKeeper(localStorage);
  const tk = sandbox.window.timeKeeper;
  const key = "25-classic-0-0-0";
  const allKey = "ALL-classic-0-0-0";
  const highKey = "H-classic-0-0-0";
  const storage = tk.getStorage();
  storage[key] = {
    time: 10000,
    date: "2020-01-01T00:00:00.000Z",
    att: 2,
    sum: 25000,
  };
  storage[allKey] = {
    time: 40000,
    date: "2020-01-02T00:00:00.000Z",
    att: 1,
    sum: 40000,
  };
  storage[highKey] = {
    high: 40,
    time: 5000,
    date: "2020-01-03T00:00:00.000Z",
  };
  tk.setStorage(storage);
  const baseline = localStorage.getItem("snake_timeKeeper");
  const baselinePb = stored(localStorage)[key];

  armRun(tk);

  // Worse than the stored PB: all-time best stays, session records the run.
  tk.savePB(15000, 25);
  assert(tk.getStorage()[key].time === 10000, "worse run must not replace all-time time");
  assert(tk.getStorage()[key].date === baselinePb.date, "worse run must not replace all-time date");
  assert(tk.getStorage()[key].att === 3, "all-time attempt count still increments");
  assert(tk.getStorage()[key].sum === 40000, "all-time sum still increments");
  assert(tk._sessionPbs[key].time === 15000, "session PB records the run");
  assert(tk._sessionPbs[key] !== tk.getStorage()[key], "session row is not the stored row");
  tk.flushStorage();
  assert(stored(localStorage)[key].time === 10000, "persisted all-time time unchanged by session PB");
  assert(!Object.prototype.hasOwnProperty.call(stored(localStorage), "session"), "no session blob in storage");
  assert(
    !JSON.stringify(stored(localStorage)).includes('"time":15000'),
    "session-only time must not be persisted"
  );

  // Direct session write, including a time that would be a new all-time best.
  const beforeDirect = localStorage.getItem("snake_timeKeeper");
  assert(tk.recordSessionTime(7000, 25, tk.getSaveContext()) === true, "session accepts a faster time");
  tk._sessionPbs[key].time = 1;
  assert(tk.getStorage()[key].time === 10000, "mutating the session row must not touch all-time");
  tk._sessionPbs[key].time = 7000;
  tk.markStorageDirty();
  tk.flushStorage();
  assert(
    stored(localStorage)[key].time === 10000,
    "flush after a session-only write keeps the stored best"
  );
  assert(
    !JSON.stringify(stored(localStorage)).includes('"time":7000'),
    "session best must not appear in snake_timeKeeper"
  );
  // att/sum changed earlier, so the raw string differs from the pre-savePB baseline
  // but not from the post-savePB snapshot taken before the direct session write.
  assert(localStorage.getItem("snake_timeKeeper") === beforeDirect, "session write does not rewrite storage");

  // A genuinely faster run still updates all-time through the existing path.
  tk.savePB(8000, 25);
  assert(tk.getStorage()[key].time === 8000, "faster run still updates all-time");
  assert(tk._sessionPbs[key].time === 7000, "slower all-time update does not worsen the session PB");
  tk.flushStorage();
  assert(stored(localStorage)[key].time === 8000, "persisted all-time follows savePB, not the session row");

  // Separate keys stay independent.
  tk.savePB(30000, "ALL");
  assert(tk.getStorage()[allKey].time === 30000, "ALL all-time updates on a faster finish");
  assert(tk._sessionPbs[allKey].time === 30000, "ALL session key matches the all-time key");
  assert(tk.getStorage()[key].time === 8000, "ALL save does not rewrite the 25 PB");
  tk.savePB(50000, "ALL");
  assert(tk.getStorage()[allKey].time === 30000, "slower ALL keeps the stored best");
  assert(tk._sessionPbs[allKey].time === 30000, "slower ALL keeps the session best");

  // Highscore below the stored best updates the session only.
  tk.lastAppleTime = 9000;
  tk.lastAppleDate = new Date("2024-05-01T00:00:00.000Z");
  const highBefore = JSON.stringify(tk.getStorage()[highKey]);
  sandbox.window.pudding_settings.SessionPbs = false;
  tk.updateHighscoreLive(9000, 10);
  assert(tk.getStorage()[highKey].high === 40, "lower score must not change stored highscore");
  assert(JSON.stringify(tk.getStorage()[highKey]) === highBefore, "stored highscore object stays put");
  assert(tk._sessionPbs[highKey].high === 10, "session highscore records the lower score");
  assert(tk._sessionPbs[highKey] !== tk.getStorage()[highKey], "session highscore is a different object");
  tk.flushStorage();
  assert(stored(localStorage)[highKey].high === 40, "persisted highscore ignores the session score");

  tk.updateHighscoreLive(9000, 12);
  assert(tk._sessionPbs[highKey].high === 12, "session highscore improves");
  assert(tk.getStorage()[highKey].high === 40, "stored highscore still unchanged");

  tk.updateHighscoreLive(4000, 55);
  assert(tk.getStorage()[highKey].high === 55, "a real highscore still updates all-time");
  assert(tk._sessionPbs[highKey].high === 55, "session highscore follows a better score");
  tk.flushStorage();
  assert(stored(localStorage)[highKey].high === 55, "persisted highscore is the all-time value");

  // Display toggle: default off, no fallback onto all-time when the session is empty.
  sandbox.window.pudding_settings.SessionPbs = false;
  assert(tk.usesSessionPbs() === false, "session display defaults off");
  assert(tk.personalSectionTitle() === "Personal", "all-time heading");
  assert(tk.personalEmptyText("25 Apples") === "25 Apples: None", "all-time placeholder");
  assert(tk.readDisplayedRecord(tk.getStorage(), key, "time").time === 8000, "off shows all-time");

  sandbox.window.pudding_settings.SessionPbs = true;
  assert(tk.personalSectionTitle() === "Session PBs", "session heading");
  assert(tk.readDisplayedRecord(tk.getStorage(), key, "time").time === 7000, "on shows session time");
  assert(tk.readDisplayedRecord(tk.getStorage(), highKey, "high").high === 55, "on shows session highscore");
  delete tk._sessionPbs["50-classic-0-0-0"];
  assert(
    tk.readDisplayedRecord(tk.getStorage(), "50-classic-0-0-0", "time") === null,
    "missing session PB does not fall back to all-time"
  );
  assert(tk.personalEmptyText("50 Apples") === "50 Apples: —", "session placeholder");
  assert(tk.personalEmptyText("Highscore") === "Highscore: —", "session highscore placeholder");

  // Tracking while the game is not supposed to record does nothing to either store.
  const sessionSnapshot = JSON.stringify(tk._sessionPbs);
  const storageSnapshot = localStorage.getItem("snake_timeKeeper");
  sandbox.window.daily_challenge = true;
  tk.savePB(1000, 25);
  tk.updateHighscoreLive(1000, 99);
  sandbox.window.daily_challenge = false;
  assert(JSON.stringify(tk._sessionPbs) === sessionSnapshot, "untracked runs skip session PBs");
  assert(localStorage.getItem("snake_timeKeeper") === storageSnapshot, "untracked runs skip all-time PBs");

  // Checkbox defaults off and persists through the existing settings saver.
  const box = {
    checked: true,
    addEventListener(name, fn) {
      this["on" + name] = fn;
    },
  };
  sandbox.window.pudding_settings.SessionPbs = false;
  let saved = 0;
  sandbox.window.saveSettings = function () {
    saved++;
    localStorage.setItem("PuddingSettings", JSON.stringify(sandbox.window.pudding_settings));
  };
  tk.bindSessionPbCheckbox(box);
  assert(box.checked === false, "checkbox defaults off");
  box.checked = true;
  box.onchange();
  assert(sandbox.window.pudding_settings.SessionPbs === true, "checkbox turns session display on");
  assert(saved === 1, "checkbox uses saveSettings");
  assert(stored(localStorage)[key].time === 8000, "toggling session display does not rewrite PBs");
  const settings = JSON.parse(localStorage.getItem("PuddingSettings"));
  assert(settings.SessionPbs === true, "toggle is persisted on PuddingSettings");
  assert(!Object.prototype.hasOwnProperty.call(settings, "_sessionPbs"), "PBs are not stored in settings");
}

function testSettingsDefaults() {
  const localStorage = makeLocalStorage();
  const sandbox = {
    window: {},
    console,
    localStorage,
    document: { getElementById() { return null; }, querySelector() { return null; } },
    setTimeout,
    JSON,
    Object,
    Number,
    String,
    isNaN,
    Math,
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, "Libraries", "SettingsSaver.js"), "utf8"),
    sandbox,
    { filename: "SettingsSaver.js" }
  );
  sandbox.window.SettingsSaver.make();
  assert(sandbox.window.pudding_settings.SessionPbs === false, "fresh settings default Session PBs off");

  localStorage.setItem(
    "PuddingSettings",
    JSON.stringify({
      StorageVersion: 1,
      Skull: false,
      SokoGoals: true,
      InputDisplay: false,
      TopBar: true,
      SpeedInfo: true,
      PortalPairs: false,
      DisableRandom: false,
      randomizeThemeApple: false,
    })
  );
  const loaded = sandbox.window.loadSettings();
  assert(loaded.SessionPbs === false, "older saves default Session PBs off");
  sandbox.window.pudding_settings = loaded;
  sandbox.window.pudding_settings.SessionPbs = true;
  sandbox.window.saveSettings();
  const roundTrip = JSON.parse(localStorage.getItem("PuddingSettings"));
  assert(roundTrip.SessionPbs === true, "SessionPbs round-trips in PuddingSettings");
  assert(localStorage.getItem("snake_timeKeeper") === null, "settings save does not create timekeeper storage");
}

function testSpeedrunSettingsDefault() {
  const init = fs.readFileSync(path.join(ROOT, "SpeedrunModInit.js"), "utf8");
  const start = init.indexOf("window.loadSpeedrunSettings = function");
  const end = init.indexOf("window.pudding_settings = window.loadSpeedrunSettings");
  assert(start > 0 && end > start, "Speedrun settings loader not found");
  const localStorage = makeLocalStorage({
    PuddingSettings: JSON.stringify({ TopBar: false, SpeedInfo: false }),
  });
  const sandbox = { window: {}, localStorage, console, JSON };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(init.slice(start, end), sandbox, { filename: "SpeedrunModInit.js" });
  const settings = sandbox.window.loadSpeedrunSettings();
  assert(settings.SessionPbs === false, "Speedrun loader defaults Session PBs off");
  assert(settings.TopBar === false, "existing Speedrun settings are kept");
  assert(settings.SpeedInfo === false, "existing Speed Info setting is kept");
}

function main() {
  testSessionDoesNotWriteAllTime();
  testSettingsDefaults();
  testSpeedrunSettingsDefault();
  console.log("session PB tests passed");
}

main();
