window.PauseGameMod = {};
window.PauseGameMod.runCodeBefore = function() {
  window.pauseGame = 0;
}
window.PauseGameMod.alterSnakeCode = function(code) {
  //messes with the game frame by frame (update method)
  code = assertReplace(
    code,
    /\(this\.Aa\.direction!=="NONE"\|\|CUD\(this\.Aa\)\)/,
    "((this.Aa.direction!==\"NONE\"||CUD(this.Aa))&&!window.pauseGame)"
  );
  return code;
}
window.PauseGameMod.runCodeAfter = function() {
  function keydownHandler(e){
    if(e.code === "KeyQ"){
      window.pauseGame = !window.pauseGame;
      if(window.pauseGame){
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.visibility = "visible";
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.opacity = 1;
        document.querySelector("body > div.Czus3 > div > div.wjOYOd > div").style.visibility = "hidden";
      } else {
        setTimeout(()=>{if(!window.pauseGame){document.querySelector("body > div.Czus3 > div > div.wjOYOd > div").style.visibility = "visible";}},500);
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.visibility = "hidden";
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.opacity = 0;
      }
    }
  }
  document.addEventListener('keydown', keydownHandler);
}