#!/usr/bin/env node
/**
 * Run the PuddingMod alterCode chain against a vendored snake.js build.
 * Records every assertReplace miss and continues, instead of dying on the first.
 *
 * Usage:
 *   node tools/verify.js current
 *   node tools/verify.js 11
 *   node tools/verify.js current path/to/local/snake.js
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
  "DistinctVisual",
  "Counter",
  "TimeKeeper",
  "Fruit",
  "TopBar",
  "SnakeColor",
  "SettingsSaver",
  "SpeedInfo",
  "InputDisplay",
  "Timer",
  "BootstrapMenu",
  "ResetKey",
  "RenderDelayFix",
];

const version = process.argv[2] || "current";
const localPath = process.argv[3];
const snakeUrl = `https://googlesnakemods.com/v/${version}/snake.js`;

const misses = [];
const errors = [];
const syntaxBreaks = [];
let currentLib = "(boot)";

// Parse-only check. A matched regex can still emit invalid JS, which the
// browser only reports as an opaque SyntaxError inside eval.
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
  // Enough fake apple/count/trophy children for Fruit/Timer index math
  if (tag === "apple" || tag === "#apple") {
    for (let i = 0; i < 24; i++) children.push(makeEl("img"));
  }
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
    getElementById(id) {
      // Fruit.make needs #apple with children
      if (id === "apple") {
        const apple = makeEl("div");
        apple.id = "apple";
        for (let i = 0; i < 24; i++) apple.appendChild(makeEl("img"));
        return apple;
      }
      if (id === "count") {
        const count = makeEl("div");
        count.id = "count";
        for (let i = 0; i < 7; i++) count.appendChild(makeEl("img"));
        return count;
      }
      if (id === "trophy") {
        const trophy = makeEl("div");
        trophy.id = "trophy";
        for (let i = 0; i < 23; i++) trophy.appendChild(makeEl("img"));
        return trophy;
      }
      return makeEl("div");
    },
    querySelector(sel) {
      const s = String(sel);
      if (s === "#apple" || s.includes("apple_00") || s.includes("#apple")) {
        const apple = makeEl("div");
        apple.id = "apple";
        for (let i = 0; i < 24; i++) {
          const img = makeEl("img");
          img.src = `https://www.google.com/logos/fnbx/snake_arcade/v18/apple_${String(i).padStart(2, "0")}.png`;
          img.setAttribute("jsname", "fakeAppleJs");
          apple.appendChild(img);
        }
        if (s.includes("apple_00") || s.includes("[src$")) {
          const img = makeEl("img");
          img.src = "https://www.google.com/logos/fnbx/snake_arcade/v18/apple_00.png";
          img.setAttribute("jsname", "fakeAppleJs");
          return img;
        }
        return apple;
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
  global.window.pudding_settings = {
    Skull: false,
    SokoGoals: true,
    InputDisplay: false,
    TopBar: true,
    SpeedInfo: false,
    PortalPairs: false,
    SelectedPairs: [0, 1, 2, 3, 4, 5],
    DisableRandom: false,
    randomizeThemeApple: false,
    ScrollBar: false,
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

  function recordingAssertReplaceAll(baseText, regex, replacement) {
    baseText = String(baseText);
    const outputText = baseText.replaceAll(regex, replacement);
    if (baseText === outputText) {
      misses.push({ lib: currentLib, regex: String(regex).slice(0, 200), all: true });
    }
    return outputText;
  }

  global.assertReplace = recordingAssertReplace;
  global.window.assertReplace = recordingAssertReplace;

  // Match ModLoader: coerce with toString() so boxed String works
  // eslint-disable-next-line no-extend-native
  String.prototype.assertReplace = function (regex, replacement) {
    return recordingAssertReplace(this.toString(), regex, replacement);
  };
  // eslint-disable-next-line no-extend-native
  String.prototype.assertReplaceAll = function (regex, replacement) {
    return recordingAssertReplaceAll(this.toString(), regex, replacement);
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

  // Mirror PuddingInit preprocessing
  snakeCode = snakeCode.replaceAll(/\$\$/gm, "doubleD");
  snakeCode = snakeCode.replaceAll(/\$\&/gm, "$ &");

  for (const name of LIBS) {
    const file = path.join(ROOT, "Libraries", `${name}.js`);
    currentLib = name;
    try {
      // Libraries attach to window.X; eval in this scope has access to global stubs
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
        // make() is DOM-heavy; note but continue — alterCode is what we care about
        console.warn(`make() warn ${name}: ${e.message}`);
      }
    }

    if (typeof lib.alterCode !== "function") {
      errors.push({ lib: name, kind: "missing", message: "alterCode missing" });
      continue;
    }

    const beforeMisses = misses.length;
    const quietLog = console.log;
    // Core.alterCode dumps the whole snake.js on a false-positive "loaded_" match
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
        if (ctx) {
          console.error(`       line ${ctx.lineNo} (${ctx.length} chars): ${ctx.sample}`);
        }
        const dump = path.join(__dirname, `.broken-${name}-v${version}.js`);
        fs.writeFileSync(dump, snakeCode, "utf8");
        console.error(`       wrote ${dump}`);
        // Keep the pre-break code so later libs are still exercised
        snakeCode = before;
        console.error(`       reverted ${name} to keep checking later libraries`);
        continue;
      }

      console.log(
        newMisses
          ? `MISS  ${name} (${newMisses} assertReplace miss${newMisses > 1 ? "es" : ""})`
          : `OK    ${name}`
      );
    } catch (e) {
      console.log = quietLog;
      errors.push({
        lib: name,
        kind: "alterCode",
        message: e.message,
        stack: e.stack?.split("\n").slice(0, 4).join(" | "),
      });
      console.error(`ERROR ${name}: ${e.message}`);
    }
  }

  console.log("\n=== Summary ===");
  console.log(`version: v/${version}`);
  console.log(`assertReplace misses: ${misses.length}`);
  console.log(`errors: ${errors.length}`);
  console.log(`syntax breaks: ${syntaxBreaks.length}`);

  if (syntaxBreaks.length) {
    console.log("\nSyntax breaks:");
    for (const s of syntaxBreaks) {
      console.log(`  [${s.lib}] ${s.message}`);
      if (s.ctx) console.log(`      line ${s.ctx.lineNo}: ${s.ctx.sample}`);
    }
  }

  if (misses.length) {
    console.log("\nMisses:");
    for (const m of misses) {
      console.log(`  [${m.lib}] ${m.regex}`);
    }
  }
  if (errors.length) {
    console.log("\nErrors:");
    for (const e of errors) {
      console.log(`  [${e.lib}] ${e.kind}: ${e.message}`);
    }
  }

  process.exit(misses.length || errors.length || syntaxBreaks.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
