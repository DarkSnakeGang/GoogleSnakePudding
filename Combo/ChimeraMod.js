window.ChimeraMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.ChimeraMod.runCodeBefore = function() {

  // MouseMod is assumed to run Pudding Mod on it's own.
    window.mouseMode.runCodeBefore();
    window.VisibilityModCode.runCodeBefore();
    window.moreMenu.runCodeBefore();
}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.ChimeraMod.alterSnakeCode = function(code) {
  return window.moreMenu.alterSnakeCode(window.VisibilityModCode.alterSnakeCode(window.mouseMode.alterSnakeCode(code)));
}


window.ChimeraMod.runCodeAfter = function() {
  window.mouseMode.runCodeAfter();
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Chimera Mod';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
