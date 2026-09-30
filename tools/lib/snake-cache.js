// Shared snake.js fetch/cache + alterCode chain helpers for the post-win tests.
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SNAKE_URL = "https://googlesnakemods.com/v/current/snake.js";
const SNAKE_CACHE = path.join(os.tmpdir(), "snake_current.js");
const CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000;

async function loadSnake({ refresh = false } = {}) {
  const verify = require("../verify.js");
  if (!refresh && fs.existsSync(SNAKE_CACHE)) {
    const age = Date.now() - fs.statSync(SNAKE_CACHE).mtimeMs;
    if (age < CACHE_MAX_AGE_MS) return fs.readFileSync(SNAKE_CACHE, "utf8");
  }
  const code = await verify.fetchText(SNAKE_URL);
  fs.writeFileSync(SNAKE_CACHE, code, "utf8");
  return code;
}

// Returns { vanilla, altered, verify } with vanilla already preprocessed like PuddingInit.
async function loadAltered(libs, { quiet = true } = {}) {
  const verify = require("../verify.js");
  verify.installBrowserStubs();
  const raw = await loadSnake();
  const vanilla = verify.preprocess(raw);
  const log = console.log;
  const warn = console.warn;
  const error = console.error;
  if (quiet) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
  let altered;
  try {
    altered = verify.applyChain(vanilla, libs || verify.LIBS);
  } finally {
    console.log = log;
    console.warn = warn;
    console.error = error;
  }
  return { vanilla, altered, verify };
}

// Extracts a brace-balanced block starting at the first "{" at/after `start`.
// String/regex literals in minified snake.js rarely contain unbalanced braces in the
// methods we look at, so a plain counter plus string skipping is sufficient.
function blockAt(code, start) {
  const open = code.indexOf("{", start);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < code.length; i++) {
    const ch = code[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const q = ch;
      for (i++; i < code.length && code[i] !== q; i++) if (code[i] === "\\") i++;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return { start, open, end: i + 1, text: code.slice(start, i + 1) };
    }
  }
  return null;
}

module.exports = { ROOT, SNAKE_URL, SNAKE_CACHE, loadSnake, loadAltered, blockAt };
