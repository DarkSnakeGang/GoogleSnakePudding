window.PuddingMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeBefore = function () {

  console.log("Thank you for loading Yarmiplay's Pudding Mod! Hope you enjoy :)");
  console.log("Please provide feedback and report bugs in #snake-modding in the Official Google Snake Discord");
  console.log("Google Snake SRC Discord link: https://discord.gg/dDuCTm62EZ");

  window.getRandomBoolean = function () {
    return Math.random() < 0.5;
  }

  window.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.escapeRegex = function escapeRegex(string) {
      return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  window.loadCode = function loadAndRunCodeSynchronous(url) {
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
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
  }

  window.NepDebug = false;
  if (localStorage.getItem('snakeChosenMod') === "customUrl") {
    console.log("Detect customUrl - enabling debug mode and printing initial code")
    window.NepDebug = true;
  }

  window.catchError = function catchError(culprit_regex, code) {
    try {
      something = code.match(culprit_regex)[0];
    } catch (e) {
      console.log("I caught it!")
      console.log(culprit_regex)
      console.log(code)
      throw e
    }
    return false;
  }

  //Style differently depending on if snake is centered.
  let isSnakeCentered = !window.location.href.includes('fbx');
  let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {};
  if (advancedSettings.hasOwnProperty('fbxCentered') && advancedSettings.fbxCentered) {
    isSnakeCentered = true;
  }

  //if (!isSnakeCentered) {
    // Move menu so it doesn't overlap panels
    //document.getElementsByClassName('bZUgDf')[0].style.width = '50%';
  //}

  window.Libraries = ["Core", "Theme", "DistinctVisual", "Counter", "TimeKeeper", "Fruit", "TopBar", "SnakeColor",  "SettingsSaver", "SpeedInfo", "InputDisplay", "Timer", "BootstrapMenu","CustomPortalPairs"];
  console.log("Enabling Pudding Mod");

  libUrlPrefix = window.NepDebug ? "http://127.0.0.1:5500/Libraries/" : "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/Libraries/";
  window.Libraries.forEach(LibName => {
    console.log("Loading library: " + LibName)
    loadCode(libUrlPrefix + LibName + ".js")
    eval("window." + LibName + ".make();")
  });


};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.PuddingMod.alterSnakeCode = function (code) {
  if (window.NepDebug) {
    console.log(code)
  }

  code = code.replaceAll(/\$\$/gm, `doubleD`)
  code = code.replaceAll(/\$\&/gm, `$ &`)


  //code = code.assertReplaceAll(/\$i/gm, `something_i`)

  window.Libraries.forEach(LibName => {
    console.log("Alter code with library: " + LibName)
    eval("code = window." + LibName + ".alterCode(code);")
  });

  /*
  twin_all_global = `window.snake.twinAll`

  all_regex = new RegExp(/\"ALL\"\);/);
  window.catchError(all_regex, code)
  add_direction = `"ALL");
  ${twin_all_global}=true;
  `

  timer_update_regex = new RegExp(/&"NONE"!==this\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.direction/);
  if (!window.catchError(timer_update_regex, code)) {

    ka_oa_fill = code.match(timer_update_regex)[0].split('.')[1] + '.' + code.match(timer_update_regex)[0].split('.')[2]
    twin_timer_update = `&("NONE"!==this.${ka_oa_fill}.direction||${twin_all_global})`
    reset_regex = new RegExp(/;this\.reset\(\)/)
    set_twinall = `${twin_all_global}=false;`
    code = code.assertReplace(reset_regex, ";" + set_twinall + "this.reset()");
    code = code.assertReplace(all_regex, add_direction)
    code = code.assertReplace(timer_update_regex, twin_timer_update)
    console.log("Fixing Twin All Timer");
  } else {
    console.log("Twin All Timer Seems Already Fixed!");
  }
  */
  console.log("Done, enjoy Pudding Mod!");

  if (window.NepDebug) {
    console.log(code)
  }

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function () {

  let modIndicator = document.createElement('div');
  modIndicator.style = 'position:absolute;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Pudding Mod';
  if (window.loaded_code) {
    modIndicator.textContent = 'Pudding Mod - Google Test Version';
  }
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
