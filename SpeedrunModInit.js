window.SpeedrunMod = {};

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

  window.Libraries = [
    "Core",
    "Theme",
    "ModeRegistry",
    "DistinctVisual",
    "SettingsSaver",
    "Counter",
    "TimeKeeper",
    "SpeedInfo",
    "TopBar",
    "BootstrapMenuSpeedrun",
    "ResetKey",
  ];
  console.log("Enabling Speedrun Mod");

  libUrlPrefix = window.NepDebug
    ? "http://127.0.0.1:5500/Libraries/"
    : "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/Libraries/";
  window.Libraries.forEach((LibName) => {
    console.log("Loading library: " + LibName);
    eval("window." + LibName + ".make();");
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

  if (typeof window.applySavedGameSettingsOnce === "function") {
    setTimeout(window.applySavedGameSettingsOnce, 0);
  }
};
