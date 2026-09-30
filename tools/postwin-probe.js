/**
 * In-page instrumentation for the post-win idle investigation.
 *
 * Injected by tools/postwin-leak.js via addInitScript (runs before any page script),
 * or paste into DevTools on a live googlesnakemods.com tab and call
 * __postwin.install() once the game has loaded.
 *
 *   __postwin.install()   wrap mod functions (idempotent; call after the mod loaded)
 *   __postwin.reset()     zero all counters and frame stats
 *   __postwin.report()    plain-object snapshot of everything below
 *
 * Counters are cumulative since the last reset(). Frame stats come from a private
 * rAF loop, so they stop while the tab is hidden, same as the game.
 */
(function () {
  if (window.__postwin) return;

  const counts = Object.create(null);
  const bytes = Object.create(null);
  const bump = (k, n) => (counts[k] = (counts[k] || 0) + (n || 1));
  const addBytes = (k, n) => (bytes[k] = (bytes[k] || 0) + n);

  let frames = [];
  let longTasks = [];
  let maxFrameGap = 0;
  let lastFrame = 0;
  let resetAt = performance.now();
  let hiddenMs = 0;
  let hiddenSince = document.visibilityState === "hidden" ? performance.now() : 0;
  let maxTickBurst = 0;
  let lastTicks = null;

  // ---- platform wrappers (installed immediately) ----
  const origSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    bump("localStorage.setItem");
    bump("localStorage.setItem:" + k);
    addBytes("localStorage.setItem", String(v).length * 2);
    addBytes("localStorage.setItem:" + k, String(v).length * 2);
    return origSetItem.call(this, k, v);
  };

  const origStringify = JSON.stringify;
  JSON.stringify = function () {
    bump("JSON.stringify");
    return origStringify.apply(this, arguments);
  };

  const origSetTimeout = window.setTimeout;
  window.setTimeout = function () {
    bump("setTimeout");
    return origSetTimeout.apply(this, arguments);
  };

  const origCreateElement = Document.prototype.createElement;
  Document.prototype.createElement = function (tag) {
    bump("createElement");
    bump("createElement:" + String(tag).toLowerCase());
    return origCreateElement.apply(this, arguments);
  };

  const OrigImage = window.Image;
  window.Image = function () {
    bump("new Image");
    return new (Function.prototype.bind.apply(OrigImage, [null].concat([].slice.call(arguments))))();
  };
  window.Image.prototype = OrigImage.prototype;

  const origGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function () {
    bump("getContext");
    return origGetContext.apply(this, arguments);
  };

  const origFetch = window.fetch;
  window.fetch = function (input) {
    bump("fetch");
    try {
      const u = new URL(typeof input === "string" ? input : input.url, location.href);
      bump("fetch:" + u.host);
    } catch (e) {}
    return origFetch.apply(this, arguments);
  };

  const innerHTMLDesc = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
  Object.defineProperty(Element.prototype, "innerHTML", {
    configurable: true,
    enumerable: innerHTMLDesc.enumerable,
    get: innerHTMLDesc.get,
    set: function (v) {
      bump("innerHTML=");
      return innerHTMLDesc.set.call(this, v);
    },
  });

  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) longTasks.push(Math.round(e.duration));
    }).observe({ type: "longtask", buffered: false });
  } catch (e) {}

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") hiddenSince = performance.now();
    else if (hiddenSince) {
      hiddenMs += performance.now() - hiddenSince;
      hiddenSince = 0;
    }
  });

  function onFrame(t) {
    if (lastFrame) {
      const gap = t - lastFrame;
      frames.push(gap);
      if (frames.length > 20000) frames = frames.slice(-10000);
      if (gap > maxFrameGap) maxFrameGap = gap;
    }
    lastFrame = t;
    const g = window.__snakeGame;
    if (g && typeof g.ticks === "number") {
      if (lastTicks !== null) maxTickBurst = Math.max(maxTickBurst, g.ticks - lastTicks);
      lastTicks = g.ticks;
    }
    requestAnimationFrame(onFrame);
  }
  requestAnimationFrame(onFrame);

  // ---- mod function wrappers (installed on demand) ----
  const wrapped = new Set();
  function wrap(owner, name, label) {
    if (!owner || typeof owner[name] !== "function") return false;
    const key = label || name;
    if (owner[name].__postwinWrapped) return true;
    const orig = owner[name];
    const fn = function () {
      bump(key);
      const t0 = performance.now();
      try {
        return orig.apply(this, arguments);
      } finally {
        addBytes(key + ":ms", performance.now() - t0);
      }
    };
    fn.__postwinWrapped = true;
    fn.__postwinOrig = orig;
    owner[name] = fn;
    wrapped.add(key);
    return true;
  }

  function install() {
    const tk = window.timeKeeper;
    if (tk) {
      for (const n of ["death", "gotAll", "gotApple", "start", "saveScore", "savePB", "setStorage", "flushStorage", "syncLegacyTimeKeeperMirrors", "refreshSpeedInfo", "paintSpeedInfoRow", "addAttempt"]) {
        wrap(tk, n, "timeKeeper." + n);
      }
    }
    for (const n of ["SpeedInfoUpdate", "SpeedInfoPaintPersonalRow", "SplitPanelOnSplit", "SplitPanelRefresh", "persistSnakePb", "setTimerDeltaDisplay", "IncrementCounter", "saveStatistics", "saveSettings"]) {
      wrap(window, n);
    }
    return [...wrapped];
  }

  function pct(sorted, p) {
    if (!sorted.length) return 0;
    return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
  }

  function reset() {
    for (const k of Object.keys(counts)) delete counts[k];
    for (const k of Object.keys(bytes)) delete bytes[k];
    frames = [];
    longTasks = [];
    maxFrameGap = 0;
    maxTickBurst = 0;
    hiddenMs = 0;
    resetAt = performance.now();
    const g = window.__snakeGame;
    lastTicks = g && typeof g.ticks === "number" ? g.ticks : null;
  }

  function lsSize() {
    let total = 0;
    const perKey = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      const n = (localStorage.getItem(k) || "").length * 2;
      total += n;
      if (n > 2048) perKey[k] = n;
    }
    return { total, perKey };
  }

  function report() {
    const sorted = frames.slice().sort((a, b) => a - b);
    const g = window.__snakeGame;
    const tk = window.timeKeeper;
    const mem = performance.memory || {};
    const ls = lsSize();
    return {
      sinceResetMs: Math.round(performance.now() - resetAt),
      visibility: document.visibilityState,
      hiddenMs: Math.round(hiddenMs + (hiddenSince ? performance.now() - hiddenSince : 0)),
      counts: Object.assign({}, counts),
      bytes: Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v)])),
      frames: {
        n: frames.length,
        p50: +pct(sorted, 0.5).toFixed(1),
        p95: +pct(sorted, 0.95).toFixed(1),
        p99: +pct(sorted, 0.99).toFixed(1),
        max: Math.round(maxFrameGap),
      },
      longTasks: { n: longTasks.length, total: longTasks.reduce((a, b) => a + b, 0), max: longTasks.length ? Math.max.apply(null, longTasks) : 0 },
      game: g
        ? {
            ticks: g.ticks,
            maxTicksInOneFrame: maxTickBurst,
            ended: !!g.nj,
            won: !!g.ub,
            direction: g.oa && g.oa.direction,
            tickMs: g.Fb,
          }
        : null,
      timeKeeper: tk ? { playing: tk.playing, runStarted: tk.runStarted, storeKeys: Object.keys(tk._storageCache || {}).length } : null,
      domNodes: document.getElementsByTagName("*").length,
      heap: { used: mem.usedJSHeapSize || 0, total: mem.totalJSHeapSize || 0, limit: mem.jsHeapSizeLimit || 0 },
      localStorageBytes: ls.total,
      localStorageBigKeys: ls.perKey,
    };
  }

  window.__postwin = { install, reset, report, wrapped: () => [...wrapped] };
})();
