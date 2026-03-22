window.RenderDelayFix = {};

window.RenderDelayFix.make = function () {
  window.lastFrameTime = 0;
  window.resetTime = 0;
  window.oldResetTime = 0;
  window.delayedKeyStorage = false;
  window.keyObject = false;
  window.stuffKeys = ()=>{};
}

window.RenderDelayFix.alterCode = function (code) {
  code = assertReplace(
    code,
    /render\s*\(\s*a\s*,\s*b\s*\)\s*\{\s*this\.Db\.Uj\s*&&/,
    "render(a,b){window.lastFrameTime=Date.now();if(window.resetTime!=window.oldResetTime){window.oldResetTime=window.resetTime;}this.Db.Uj&&"
  );
  // intercepts the game's reset function for when you click play
  code = assertReplace(
    code,
    /reset\s*\(\s*\)\s*\{\s*this\.Db\.oa\.oa\s*=\s*0\s*;/,
    "reset(){window.resetTime=Date.now();setTimeout(()=>{if(delayedKeyStorage){stuffKeys.call(keyObject,delayedKeyStorage);delayedKeyStorage=false;keyObject=false}},20);this.Db.oa.oa=0;"
  );
  code = assertReplace(
    code,
    /J8\s*\(\s*a\s*\)\s*\{\s*if\s*\(\s*!this\.closed\s*\)\s*\{/,
    "J8=window.stuffKeys=function(a){if(!this.closed){if(window.resetTime<window.lastFrameTime){"
  );
  code = assertReplace(
    code,
    /a\.preventDefault\s*\(\s*\)\s*\}\s*\}\}/,
    "a.preventDefault()}}else{delayedKeyStorage=a;keyObject=this}}};"
  );
  return code;
}
