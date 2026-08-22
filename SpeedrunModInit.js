window.SpeedrunMod = window.SpeedrunMod || {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.SpeedrunMod.runCodeBefore = function () {
  window.isVisi = false;

  console.log("Thank you for loading Speedrun Mod!");
  console.log("Please provide feedback and report bugs in #snake-modding in the Official Google Snake Discord");
  console.log("Google Snake SRC Discord link: https://discord.gg/dDuCTm62EZ");

  window.getRandomBoolean = function () {
    return Math.random() < 0.5;
  };

  window.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.escapeRegex = function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  window.loadCode = function loadAndRunCodeSynchronous(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.onload = function () {
      if (this.status === 200) {
        (1, eval)(this.responseText);
      } else {
        console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
      }
    };
    req.onerror = function (event) {
      console.error(`Error when attempting to retrieve mod code from ${url}`);
      console.log(event);
    };
    req.send();
  };

  window.NepDebug = false;
  if (localStorage.getItem("snakeChosenMod") === "customUrl") {
    console.log("Detect customUrl - enabling debug mode and printing initial code");
    window.NepDebug = true;
  }

  window.catchError = function catchError(culprit_regex, code) {
    try {
      something = code.match(culprit_regex)[0];
    } catch (e) {
      console.log("I caught it!");
      console.log(culprit_regex);
      console.log(code);
      throw e;
    }
    return false;
  };

  window.loadSpeedrunSettings = function () {
    let settings = null;
    try {
      const raw = localStorage.getItem("PuddingSettings");
      if (raw) settings = JSON.parse(raw);
    } catch (e) {
      settings = null;
    }
    if (!settings || typeof settings !== "object") {
      settings = {};
    }
    if (typeof settings.TopBar !== "boolean") settings.TopBar = true;
    if (typeof settings.SpeedInfo !== "boolean") settings.SpeedInfo = true;
    if (typeof settings.ShowWrHolders !== "boolean") settings.ShowWrHolders = true;
    if (typeof settings.TrackedPlayerName !== "string") settings.TrackedPlayerName = "";
    return settings;
  };

  window.pudding_settings = window.loadSpeedrunSettings();

  window.saveSettings = function () {
    const s = window.pudding_settings;
    if (s && typeof s === "object") {
      localStorage.setItem("PuddingSettings", JSON.stringify(s));
    }
  };

  window.Libraries = [
    "Core",
    "Theme",
    "SpeedrunCss",
    "ModeRegistry",
    "TimeKeeper",
    "TopBar",
    "SpeedInfo",
    "ResetKey",
  ];
  console.log("Enabling Speedrun Mod");

  libUrlPrefix = window.NepDebug
    ? "http://127.0.0.1:5500/Libraries/"
    : "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/Libraries/";
  window.Libraries.forEach((LibName) => {
    console.log("Loading library: " + LibName);
    try {
      if (!window[LibName] && typeof window.loadCode === "function") {
        window.loadCode(libUrlPrefix + LibName + ".js");
      }
      eval("window." + LibName + ".make();");
    } catch (e) {
      console.error("Library failed: " + LibName, e);
    }
  });

};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.SpeedrunMod.alterSnakeCode = function (code) {
  if (window.NepDebug) {
    console.log(code);
  }

  code = code.replaceAll(/\$\$/gm, `doubleD`);
  code = code.replaceAll(/\$\&/gm, `$ &`);

  window.Libraries.forEach((LibName) => {
    console.log("Alter code with library: " + LibName);
    eval("code = window." + LibName + ".alterCode(code);");
  });

  console.log("Done, enjoy Speedrun Mod!");

  if (window.NepDebug) {
    console.log(code);
  }

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.SpeedrunMod.runCodeAfter = function () {
  let modIndicator = document.createElement("div");
  modIndicator.style =
    "position:absolute;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;";
  modIndicator.textContent = "Speedrun Mod";
  let canvasNode = document.getElementsByClassName("jNB0Ic")[0];
  document.getElementsByClassName("EjCLSb")[0].insertBefore(modIndicator, canvasNode);

  if (window.pudding_settings && window.pudding_settings.SpeedInfo && typeof window.SpeedInfoShow === "function") {
    window.SpeedInfoShow();
  }

  const prefetchSrc = function () {
    if (typeof window.getAllSrc === "function") {
      window.getAllSrc().catch(function (e) {
        console.error("getAllSrc error:", e);
      });
    }
  };
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(prefetchSrc, { timeout: 2500 });
  } else {
    setTimeout(prefetchSrc, 0);
  }
};
