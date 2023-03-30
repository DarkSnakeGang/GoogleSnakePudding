window.MorePudding = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.MorePudding.runCodeBefore = function() {
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

    loadAndRunCodeSynchronous('http://127.0.0.1:5500/PuddingMod.js');
    loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff/main/modloadercode.js');

    console.log("Enabling Pudding Mod");
    window.PuddingMod.runCodeBefore();
    window.moreMenu.runCodeBefore();

    function getImgFromElement(element){
      return element.replace('class=', '').replace('width=', '').replace('height=', '').split('=')[1].split('"')[1];
    }

    count_img = document.querySelector('#count').innerHTML.split('<');
    count_img_arr = [];
    for (let index = 0; index < count_img.length; index++) {
      const element = count_img[index];
      if(element != "")
      {
        count_img_arr.push(getImgFromElement(element));
      }
    }

    speed_img = document.querySelector('#speed').innerHTML.split('<');
    speed_img_arr = [];
    for (let index = 0; index < speed_img.length; index++) {
      const element = speed_img[index];
      if(element != "")
      {
        speed_img_arr.push(getImgFromElement(element));
      }
    }

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.MorePudding.alterSnakeCode = function(code) {

  code = window.PuddingMod.alterSnakeCode(code);
  code = window.moreMenu.alterSnakeCode(code);
  return code;
}


window.MorePudding.runCodeAfter = function() {
  window.moreMenu.runCodeAfter();
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'More Pudding Mod';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
