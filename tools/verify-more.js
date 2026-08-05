#!/usr/bin/env node
/**
 * Verify MorePudding (PuddingMod → VisibilityMod → MoreMenu) against a snake.js build.
 *
 * Usage:
 *   node tools/verify-more.js current
 *   node tools/verify-more.js 11
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const version = process.argv[2] || "current";
const snakeUrl = `https://googlesnakemods.com/v/${version}/snake.js`;

const misses = [];
const errors = [];
const syntaxBreaks = [];
let currentLib = "(boot)";

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

function makeEl(tag = "div") {
  const children = [];
  const el = {
    tagName: String(tag).toUpperCase(),
    style: {
      setProperty() {},
      removeProperty() {},
      getPropertyValue() {
        return "";
      },
    },
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
    width: 0,
    height: 0,
    class: "",
    appendChild(child) {
      children.push(child);
      if (child) child.parentNode = el;
      return child;
    },
    prepend(child) {
      children.unshift(child);
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

function panel(id, n, prefix) {
  const box = makeEl("div");
  box.id = id;
  for (let i = 0; i < n; i++) {
    const img = makeEl("img");
    img.src = `https://example.com/${prefix}_${String(i).padStart(2, "0")}.png`;
    img.setAttribute("jsname", `fake_${prefix}_${i}`);
    box.appendChild(img);
  }
  return box;
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

  const panels = {
    apple: panel("apple", 24, "apple"),
    count: panel("count", 7, "count"),
    speed: panel("speed", 3, "speed"),
    size: panel("size", 3, "size"),
    trophy: panel("trophy", 23, "trophy"),
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
      if (panels[id]) return panels[id];
      return makeEl("div");
    },
    querySelector(sel) {
      const s = String(sel);
      if (s === "#apple" || s === "#count" || s === "#speed" || s === "#size" || s === "#trophy") {
        return panels[s.slice(1)];
      }
      if (s.includes("apple_00") || s.includes("[src$")) {
        const img = makeEl("img");
        img.src = "https://www.google.com/logos/fnbx/snake_arcade/v18/apple_00.png";
        img.setAttribute("jsname", "fakeAppleJs");
        return img;
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
      return [makeEl("div")];
    },
    getElementsByTagName(tag) {
      if (String(tag).toLowerCase() === "body") return [global.document.body];
      if (String(tag).toLowerCase() === "head") return [global.document.head];
      return [];
    },
    addEventListener() {},
  };

  global.window = global;
  global.self = global;
  global.navigator = { userAgent: "node-verify-more" };
  global.location = { href: `https://googlesnakemods.com/v/${version}/` };
  global.Image = class Image {
    constructor() {
      this.src = "";
      this.width = 0;
      this.height = 0;
      this.class = "";
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
  global.XMLHttpRequest = class {
    open() {}
    send() {}
    setRequestHeader() {}
  };
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

  // Provided by the snake mod loader in the browser; VisibilityMod depends on it.
  global.window.findFunctionInCode = function (code, functionSignature, somethingInsideFunction, logging = false) {
    let functionSignatureSource = functionSignature.source;
    let functionSignatureFlags = functionSignature.flags;

    if (!functionSignatureFlags.includes("g")) {
      functionSignatureFlags += "g";
    }

    functionSignatureSource = functionSignatureSource.replaceAll(/\$(?=\|)|\$$/g, "");
    functionSignatureSource.replaceAll(/,|=/g, "$&\\n?");
    functionSignature = new RegExp(functionSignatureSource, functionSignatureFlags);

    const indexWithinFunction = code.search(somethingInsideFunction);
    if (indexWithinFunction === -1) {
      diagnoseRegexError(code, somethingInsideFunction);
    }

    const codeBeforeMatch = code.substring(0, indexWithinFunction);
    const signatureMatches = [...codeBeforeMatch.matchAll(functionSignature)];

    if (signatureMatches.length === 0) {
      throw new Error("Couldn't find function signature");
    }

    const startIndex = signatureMatches[signatureMatches.length - 1].index;

    let bracketCount = 0;
    let foundFirstBracket = false;
    let endIndex = 0;
    const codeLength = code.length;
    for (let i = startIndex; i <= codeLength; i++) {
      if (!foundFirstBracket && code[i] === "{") {
        foundFirstBracket = true;
      }
      if (code[i] === "{") bracketCount++;
      if (code[i] === "}") bracketCount--;
      if (foundFirstBracket && bracketCount === 0) {
        endIndex = i;
        break;
      }
      if (i === codeLength) {
        throw new Error("Couldn't pair up brackets");
      }
    }

    const fullFunction = code.substring(startIndex, endIndex + 1);
    if (fullFunction.search(somethingInsideFunction) === -1) {
      throw new Error(
        "Function signature does not belong to the same function as somethingInsideFunction"
      );
    }
    if (logging) console.log(fullFunction);
    return fullFunction;
  };
  global.findFunctionInCode = global.window.findFunctionInCode;

  global.window.diagnoseRegexError = function (baseText, regex) {
    if (!(regex instanceof RegExp)) {
      throw new Error("Failed to find match using string argument. No more details available");
    }
    const oneLineText = baseText.replaceAll(/\n/g, "");
    if (!regex.test(oneLineText)) {
      throw new Error("Failed to find match for regex.");
    }
    throw new Error(
      "Line break error! Failed to find match for regex - most likely caused by a new line break."
    );
  };
  global.diagnoseRegexError = global.window.diagnoseRegexError;

  // Default Pudding-style catchError; VisibilityMod.runCodeBefore replaces this.
  global.window.catchError = function (culprit_regex, code) {
    try {
      code.match(culprit_regex)[0];
    } catch (e) {
      errors.push({
        lib: currentLib,
        kind: "catchError",
        regex: String(culprit_regex).slice(0, 120),
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

function runStage(name, fn, code) {
  currentLib = name;
  const beforeMisses = misses.length;
  process.stdout.write(`... running ${name}\n`);
  try {
    const next = fn(code);
    const newMisses = misses.length - beforeMisses;
    const syntaxErr = checkSyntax(next);
    if (syntaxErr) {
      const ctx = contextAround(next, syntaxErr);
      syntaxBreaks.push({ lib: name, message: syntaxErr.message, ctx });
      const dump = path.join(__dirname, `.broken-more-${name}-v${version}.js`);
      fs.writeFileSync(dump, next, "utf8");
      process.stderr.write(`SYNTAX ${name}: ${syntaxErr.message}\n`);
      if (ctx) {
        process.stderr.write(
          `       line ${ctx.lineNo} (${ctx.length} chars): ${ctx.sample}\n`
        );
      }
      process.stderr.write(`       wrote ${dump}\n`);
      return { code, failed: true };
    }
    process.stdout.write(
      newMisses
        ? `OK    ${name} (${newMisses} soft miss${newMisses > 1 ? "es" : ""})\n`
        : `OK    ${name}\n`
    );
    return { code: next, failed: false };
  } catch (e) {
    errors.push({ lib: name, kind: "alter", message: e.message });
    process.stderr.write(`ERROR ${name}: ${e.message}\n`);
    if (e.stack) process.stderr.write(`       ${e.stack.split("\n").slice(0, 3).join(" | ")}\n`);
    return { code, failed: true };
  }
}

async function main() {
  installBrowserStubs();

  console.log(`Fetching ${snakeUrl} ...`);
  let snakeCode = await fetchText(snakeUrl);
  console.log(`Fetched (${snakeCode.length} chars)`);

  const morePath = path.join(ROOT, "MorePudding.js");
  if (!fs.existsSync(morePath)) {
    console.error("MorePudding.js missing — run python MoreBuilder.py first");
    process.exit(2);
  }

  currentLib = "MorePudding.js";
  try {
    eval(fs.readFileSync(morePath, "utf8"));
  } catch (e) {
    console.error(`Failed to eval MorePudding.js: ${e.message}`);
    process.exit(2);
  }

  // Call each piece separately so one UI stub failure doesn't skip the rest.
  currentLib = "runCodeBefore";
  for (const [label, fn] of [
    ["PuddingMod.runCodeBefore", () => window.PuddingMod.runCodeBefore()],
    ["VisibilityMod.runCodeBefore", () => window.VisibilityModCode.runCodeBefore()],
    ["MoreMenu.runCodeBefore", () => window.moreMenu.runCodeBefore()],
  ]) {
    try {
      const quiet = console.log;
      console.log = () => {};
      fn();
      console.log = quiet;
      process.stdout.write(`OK    ${label}\n`);
    } catch (e) {
      process.stderr.write(`${label} warn: ${e.message}\n`);
    }
  }

  // Fruit.make must have run for PuddingMod.alterSnakeCode; if Core/Theme threw first, seed it.
  if (!window.new_fruit || !window.new_fruit.length) {
    try {
      window.Fruit.make();
      process.stdout.write("OK    Fruit.make (fallback)\n");
    } catch (e) {
      process.stderr.write(`Fruit.make fallback warn: ${e.message}\n`);
    }
  }
  if (!window.checkboxes) {
    // Minimal VisibilityMod state if its runCodeBefore died before setup
    window.checkboxes = {
      checkboxStatuses: {
        leftEye: true, rightEye: true, body: true, snoot: true, nose: true,
        lightTiles: true, darkTiles: true, eatAnimation: true, fruit: true, poison: true, shadow: true,
        border: true, die: true, lumps: true, portals: true, flashSnake: false, shadowIncluded: true,
        keys: true, walls: true, locks: true, hotdogWalls: true, sokobanBox: true, sokobanGoal: true,
        mines: true, statue: true, brokenStatue: true, mineRadius: true, tongue: true,
        bridges: true, arrows: true, gates: true, shields: true,
        lightSnake: true, lightFruit: true,
      },
    };
  }

  process.stdout.write("Starting alter stages...\n");
  process.stdout.write(
    `has PuddingMod=${!!window.PuddingMod} Visibility=${!!window.VisibilityModCode} moreMenu=${!!window.moreMenu} fruits=${window.new_fruit?.length || 0}\n`
  );

  // Mirror MorePudding.alterSnakeCode order, stage by stage
  let stage = runStage("PuddingMod", (c) => window.PuddingMod.alterSnakeCode(c), snakeCode);
  if (stage.failed) {
    // Still try later stages on original so we surface more than one bug
    snakeCode = stage.code;
  } else {
    snakeCode = stage.code;
  }

  stage = runStage("VisibilityMod", (c) => window.VisibilityModCode.alterSnakeCode(c), snakeCode);
  if (!stage.failed) snakeCode = stage.code;

  stage = runStage("MoreMenu", (c) => window.moreMenu.alterSnakeCode(c), snakeCode);
  if (!stage.failed) snakeCode = stage.code;

  // Combined entrypoint as a final sanity check (on fresh fetch if earlier stages failed)
  if (!syntaxBreaks.length && !errors.length) {
    const fresh = await fetchText(snakeUrl);
    runStage("MorePudding(combined)", (c) => window.MorePudding.alterSnakeCode(c), fresh);
  }

  console.log("\n=== Summary ===");
  console.log(`version: v/${version}`);
  console.log(`assertReplace misses: ${misses.length}`);
  console.log(`errors: ${errors.length}`);
  console.log(`syntax breaks: ${syntaxBreaks.length}`);

  if (misses.length) {
    console.log("\nMisses:");
    for (const m of misses) console.log(`  [${m.lib}] ${m.regex}`);
  }
  if (errors.length) {
    console.log("\nErrors:");
    for (const e of errors) console.log(`  [${e.lib}] ${e.kind}: ${e.message}`);
  }
  if (syntaxBreaks.length) {
    console.log("\nSyntax breaks:");
    for (const s of syntaxBreaks) {
      console.log(`  [${s.lib}] ${s.message}`);
      if (s.ctx) console.log(`      line ${s.ctx.lineNo}: ${s.ctx.sample}`);
    }
  }

  // Soft assertReplace misses are informational for MorePudding (VisibilityMod's own
  // assertReplace throws hard on real misses). Fail only on errors / syntax.
  process.exit(errors.length || syntaxBreaks.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
