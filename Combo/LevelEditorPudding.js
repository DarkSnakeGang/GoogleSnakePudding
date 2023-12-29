window.LevelEditorPudding = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.LevelEditorPudding.runCodeBefore = function() {
    function loadAndRunCodeSynchronous(url) {
        let req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.onload = function() {
          if(this.status === 200) {
            (1,eval)(this.responseText);
          } else {
            console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
          }
        };
        req.onerror = function(event) {
          console.error(`Error when attempting to retrieve mod code from ${url}`);
          console.log(event);
        };
        req.send();
      }

    loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js');
    loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeLevelEditor/main/modloadercode.js');

    console.log("Enabling Pudding Mod");
    window.PuddingMod.runCodeBefore();
    console.log("Enabling Level Editor Mod");
    window.levelEditorMod.runCodeBefore();

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.LevelEditorPudding.alterSnakeCode = function(code) {
  code = window.PuddingMod.alterSnakeCode((window.levelEditorMod.alterSnakeCode(code)));
  return code;
}


window.LevelEditorPudding.runCodeAfter = function() {
  window.levelEditorMod.runCodeAfter();
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Level Editor Mod + Pudding';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
