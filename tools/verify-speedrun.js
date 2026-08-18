#!/usr/bin/env node
/**
 * Run the SpeedrunMod alterCode chain against a vendored snake.js build.
 *
 * Usage:
 *   node tools/verify-speedrun.js current
 *   node tools/verify-speedrun.js current path/to/local/snake.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LIBS = [
  "Core",
  "Theme",
  "SpeedrunCss",
  "ModeRegistry",
  "TimeKeeper",
  "TopBar",
  "SpeedInfo",
  "ResetKey",
];

const version = process.argv[2] || "current";
const localPath = process.argv[3];
const snakeUrl = `https://googlesnakemods.com/v/${version}/snake.js`;

const misses = [];
const errors = [];
const syntaxBreaks = [];
let currentLib = "(boot)";

function checkSyntax(code) {
  try {
    new vm.Script(code, { filename: "snake.altered.js" });
    return null;
  } catch (e) {
    return e;
  }
}

function contextAround(code, needleErr) {
  const m = /snake\.altered\.js:(\d+)/.exec(needleErr.stack || "");
  if (!m) return null;
  const lineNo = Number(m[1]);
  const lines = code.split("\n");
  const line = lines[lineNo - 1] || "";
  return { lineNo, length: line.length, sample: line.slice(0, 400) };
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function makeEl(tag = "div") {
  const children = [];
  const el = {
    tagName: String(tag).toUpperCase(),
    style: {},
    classList: { add() {}, remove() {}, contains() { return false; }, toggle() {} },
    children,
    childNodes: children,
    parentNode: null,
    innerHTML: "",
    textContent: "",
    value: "",
    checked: false,
    disabled: false,
    src: "",
    href: "",
    id: "",
    type: "",
    dataset: {},
    attributes: {},
    appendChild(child) {
      children.push(child);
      if (child) child.parentNode = el;
      return child;
    },
    append(...nodes) {
      nodes.forEach((n) => el.appendChild(n));
    },
    removeChild(child) {
      const i = children.indexOf(child);
      if (i >= 0) children.splice(i, 1);
      return child;
    },
    insertBefore(node) {
      children.unshift(node);
      return node;
    },
    setAttribute(k, v) {
      el.attributes[k] = v;
      if (k === "id") el.id = v;
    },
    getAttribute(k) {
      return el.attributes[k] ?? null;
    },
    addEventListener() {},
    removeEventListener() {},
    querySelector() {
      return makeEl();
    },
    querySelectorAll() {
      return [];
    },
    getElementsByClassName() {
      return [];
    },
    getElementsByTagName() {
      return [];
    },
    cloneNode() {
      return makeEl(tag);
    },
    focus() {},
    click() {},
    remove() {},
  };
  return el;
}

function installBrowserStubs() {
  const store = Object.create(null);
  global.localStorage = {
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
    },
    setItem(k, v) {
      store[k] = String(v);
    },
    removeItem(k) {
      delete store[k];
    },
  };

  global.document = {
    body: makeEl("body"),
    head: makeEl("head"),
    documentElement: makeEl("html"),
    createElement(tag) {
      return makeEl(tag);
    },
    createTextNode(t) {
      return { textContent: t, nodeType: 3 };
    },
    createDocumentFragment() {
      return makeEl("fragment");
    },
    getElementById() {
      return makeEl("div");
    },
    querySelector(sel) {
      const s = String(sel);
      if (s.includes("apple_00") || s.includes("[src$")) {
        const img = makeEl("img");
        img.src = "https://www.google.com/logos/fnbx/snake_arcade/v18/apple_00.png";
        img.setAttribute("jsname", "fakeAppleJs");
        return img;
      }
      if (s === "#count" || s === "#speed" || s === "#trophy" || s === "#size") {
        const box = makeEl("div");
        const n = s === "#trophy" ? 23 : s === "#count" ? 7 : 3;
        for (let i = 0; i < n; i++) {
          const img = makeEl("img");
          img.src = `https://example.com/${s.slice(1)}_${i}.png`;
          box.appendChild(img);
        }
        return box;
      }
      return makeEl("div");
    },
    querySelectorAll(sel) {
      if (String(sel).includes("Mute") || String(sel).includes("aria-label")) {
        return [makeEl("div"), makeEl("div")];
      }
      return [];
    },
    getElementsByClassName() {
      return [];
    },
    getElementsByTagName() {
      return [];
    },
    addEventListener() {},
  };

  global.window = global;
  global.self = global;
  global.navigator = { userAgent: "node-verify" };
  global.location = { href: "https://googlesnakemods.com/v/current/" };
  global.Image = class Image {
    constructor() {
      this.src = "";
      this.classList = { add() {}, remove() {} };
    }
  };
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  global.MutationObserver = class {
    observe() {}
    disconnect() {}
  };
  global.HTMLElement = class {};
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  global.cancelAnimationFrame = clearTimeout;
  global.alert = () => {};
  global.confirm = () => true;
  global.prompt = () => "";
  global.getComputedStyle = () => new Proxy({}, { get: () => "" });

  global.window.NepDebug = false;
  global.window.SpeedrunMod = {};
  global.window.pudding_settings = {
    Skull: false,
    SokoGoals: true,
    InputDisplay: false,
    TopBar: true,
    SpeedInfo: false,
    DisableRandom: false,
    ScrollBar: false,
    SaveGameSettings: true,
  };

  global.window.escapeRegex = function (string) {
    return String(string).replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  global.window.catchError = function (culprit_regex, code) {
    try {
      code.match(culprit_regex)[0];
    } catch (e) {
      errors.push({
        lib: currentLib,
        kind: "catchError",
        regex: String(culprit_regex),
        message: e.message,
      });
      throw e;
    }
    return false;
  };

  function recordingAssertReplace(baseText, regex, replacement) {
    baseText = String(baseText);
    const outputText = baseText.replace(regex, replacement);
    if (baseText === outputText) {
      misses.push({ lib: currentLib, regex: String(regex).slice(0, 200) });
    }
    return outputText;
  }

  global.assertReplace = recordingAssertReplace;
  global.window.assertReplace = recordingAssertReplace;
  // eslint-disable-next-line no-extend-native
  String.prototype.assertReplace = function (regex, replacement) {
    return recordingAssertReplace(this.toString(), regex, replacement);
  };
  // eslint-disable-next-line no-extend-native
  String.prototype.assertMatch = function (regex) {
    const output = this.match(regex);
    if (output === null) {
      misses.push({ lib: currentLib, regex: String(regex).slice(0, 200), match: true });
      throw new Error("Failed to find match for regex: " + String(regex).slice(0, 120));
    }
    return output;
  };
}

async function main() {
  installBrowserStubs();

  let snakeCode;
  if (localPath) {
    snakeCode = fs.readFileSync(path.resolve(localPath), "utf8");
    console.log(`Loaded local snake.js (${snakeCode.length} chars) as v/${version}`);
  } else {
    console.log(`Fetching ${snakeUrl} ...`);
    snakeCode = await fetchText(snakeUrl);
    console.log(`Fetched (${snakeCode.length} chars)`);
  }

  snakeCode = snakeCode.replaceAll(/\$\$/gm, "doubleD");
  snakeCode = snakeCode.replaceAll(/\$\&/gm, "$ &");

  for (const name of LIBS) {
    const file = path.join(ROOT, "Libraries", `${name}.js`);
    currentLib = name;
    try {
      const src = fs.readFileSync(file, "utf8");
      eval(src);
    } catch (e) {
      errors.push({ lib: name, kind: "load", message: e.message });
      console.error(`LOAD FAIL  ${name}: ${e.message}`);
      continue;
    }

    const lib = global.window[name];
    if (!lib) {
      errors.push({ lib: name, kind: "missing", message: "window." + name + " not defined" });
      continue;
    }

    if (typeof lib.make === "function") {
      try {
        lib.make();
      } catch (e) {
        console.warn(`make() warn ${name}: ${e.message}`);
      }
    }

    if (typeof lib.alterCode !== "function") {
      errors.push({ lib: name, kind: "missing", message: "alterCode missing" });
      continue;
    }

    const beforeMisses = misses.length;
    const quietLog = console.log;
    if (name === "Core") console.log = () => {};
    try {
      const before = snakeCode;
      snakeCode = lib.alterCode(snakeCode);
      console.log = quietLog;

      const newMisses = misses.length - beforeMisses;
      const syntaxErr = checkSyntax(snakeCode);
      const wasBrokenBefore = syntaxBreaks.length > 0;

      if (syntaxErr && !wasBrokenBefore) {
        const ctx = contextAround(snakeCode, syntaxErr);
        syntaxBreaks.push({ lib: name, message: syntaxErr.message, ctx });
        console.error(`SYNTAX ${name}: ${syntaxErr.message}`);
        snakeCode = before;
        continue;
      }

      console.log(
        newMisses
          ? `MISS  ${name} (${newMisses} assertReplace miss${newMisses > 1 ? "es" : ""})`
          : `OK    ${name}`
      );
    } catch (e) {
      console.log = quietLog;
      errors.push({ lib: name, kind: "alterCode", message: e.message });
      console.error(`ERROR ${name}: ${e.message}`);
    }
  }

  console.log("\n=== Summary ===");
  console.log(`version: v/${version}`);
  console.log(`assertReplace misses: ${misses.length}`);
  console.log(`errors: ${errors.length}`);
  console.log(`syntax breaks: ${syntaxBreaks.length}`);

  process.exit(misses.length || errors.length || syntaxBreaks.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
