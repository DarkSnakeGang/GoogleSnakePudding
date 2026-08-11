const fs = require("fs");
const os = require("os");

const snake = fs.readFileSync(os.tmpdir() + "/snake_current.js", "utf8");
const saverSrc = fs.readFileSync("Libraries/SettingsSaver.js", "utf8");

global.window = global;
global.catchError = function () {
  return false;
};
String.prototype.assertReplace = function (re, rep) {
  re.lastIndex = 0;
  if (!this.match(re)) throw new Error("miss " + re);
  re.lastIndex = 0;
  return this.replace(re, rep);
};

eval(saverSrc);

const patterns = {
  reset: /;this\.reset\(\)\}\}/,
  stop: /stop\(a\){/,
  p7: /([a-zA-Z0-9_$]{1,8})=function\(a,b,c,d=-1\)\{d=d!==-1\?d:([a-zA-Z0-9_$]{1,8})\(a,b\);for\(var e=0;e<b\.children\.length/,
  Ec: /([a-zA-Z0-9_$]{1,8})\(\)\{var a=this\.menu;a\.oa="settings";/,
};
for (const [name, re] of Object.entries(patterns)) {
  console.log(name, !!snake.match(re));
}

const out = window.SettingsSaver.alterCode(snake);
console.log("alterCode ok");
console.log("has p7", out.includes("window._puddingSnakeP7"));
console.log("has Ec capture", out.includes('window._puddingSnakeMenu=a;a.oa="settings"'));
