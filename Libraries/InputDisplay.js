window.InputDisplay = {};

window.InputDisplay.make = function () {

  // Code that runs before anything else here, loading variables, etc.
  // Recommended to use "window." for things
  const e = document.createElement('div');
  e.id = 'input-display-container';
  e.style = 'position:absolute;left:-447px;top:530px;z-index:10001;display:block;line-height:normal;';
  window.speedinfoInput.appendChild(e);

  const f = document.createElement('div');
  f.id = 'input-display-container2';
  f.style = 'position:absolute;left:-447px;top:460px;z-index:10001;display:block;line-height:normal;width: 0;height: 0;';
  window.speedinfoInput.appendChild(f);

  const InpBox = document.querySelector('#input-display-container');

  const LeftButton = document.createElement('div');
  LeftButton.style = 'position:absolute;left:460px;top"450px;z-index:10001;width:200px;';
  LeftButton.innerHTML = '<div class="input-button" id="left-button-id" style="border-radius: 10px;font-size:40px;color:white;display:none;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">←</div>'
  InpBox.appendChild(LeftButton);

  const DownButton = document.createElement('div');
  DownButton.style = 'position:absolute;left:530px;top"452px;z-index:10001;width:200px;';
  DownButton.innerHTML = '<div class="input-button" id="down-button-id" style="border-radius: 10px;font-size:40px;color:white;display:none;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">↓</div>'
  InpBox.appendChild(DownButton);

  const RightButton = document.createElement('div');
  RightButton.style = 'position:absolute;left:601px;top"550px;z-index:10001;width:200px;';
  RightButton.innerHTML = '<div class="input-button" id="right-button-id" style="border-radius: 10px;font-size:40px;color:white;display:none;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">→</div>'
  InpBox.appendChild(RightButton);

  const TopButton = document.createElement('div');
  TopButton.style = 'position:relative;left:530px;top"152px;z-index:10001;width:200px;';
  TopButton.innerHTML = '<div class="input-button" id="top-button-id" style="border-radius: 10px;font-size:40px;color:white;display:none;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">↑</div>'
  f.appendChild(TopButton);

  let first_time_checker = true;
  window.toggle_input_display = function toggle_input_display() {
    // this is so that if the input display starts on, it doesnt trigger it to be off, like what normally unchecking the box would do, since I'm using the same function.
    if(first_time_checker){
      first_time_checker=false;
    }
    else
    {window.pudding_settings.InputDisplay = !window.pudding_settings.InputDisplay;}
    //console.log("hmmm");
    if (window.pudding_settings.InputDisplay) {
      document.getElementById('left-button-id').style.display = 'inline-block';
      document.getElementById('down-button-id').style.display = 'inline-block';
      document.getElementById('right-button-id').style.display = 'inline-block';
      document.getElementById('top-button-id').style.display = 'inline-block';

      document.getElementById('left-button-id').style.visibility = 'visible';
      document.getElementById('down-button-id').style.visibility = 'visible';
      document.getElementById('right-button-id').style.visibility = 'visible';
      document.getElementById('top-button-id').style.visibility = 'visible';
    }
    else {
      document.getElementById('left-button-id').style.display = 'none';
      document.getElementById('down-button-id').style.display = 'none';
      document.getElementById('right-button-id').style.display = 'none';
      document.getElementById('top-button-id').style.display = 'none';
    }
  }
  window.LightInputOn = function (direction) {
    //console.log(incrementColor(window.button_color))
    if (window.button_color == "#FFFFFF" || window.button_color == "white") {
      document.getElementById(direction).style.backgroundColor = "#999999"
    }
    document.getElementById(direction).style.backgroundColor = incrementColor(window.button_color);
  }

  window.LightInputOff= function (direction) {

    document.getElementById(direction).style.backgroundColor = window.button_color;

  }

  function incrementColor(hexColor) {
    return '#' + hexColor.slice(1).replace(/../g, char => {
      const incrementedValue = parseInt(char, 16) + 32;
      return incrementedValue > 255 ? 'FF' : incrementedValue.toString(16).padStart(2, '0');
    });
  }
}
window.InputDisplay.alterCode = function (code) {

  // Code to alter snake code here
  document.addEventListener('keydown', (event)=> {

    if (event.key === 'ArrowRight' || (event.code === 'KeyD')){

      window.LightInputOn("right-button-id");
      //console.log('aaaaaas')
    }
    else if (event.key === 'ArrowLeft'|| (event.code === 'KeyA'))
    {
      window.LightInputOn("left-button-id");
    }
    else if (event.key === 'ArrowDown'|| (event.code === 'KeyS'))
    {
      window.LightInputOn("down-button-id");
    }
    else if (event.key === 'ArrowUp'|| (event.code === 'KeyW'))
    {
      window.LightInputOn("top-button-id");
    }

  });

  document.addEventListener('keyup', (event)=> {
    if ((event.key === 'ArrowRight') || (event.code === 'KeyD')){

      window.LightInputOff("right-button-id");
    }
    else if (event.key === 'ArrowLeft'|| (event.code === 'KeyA'))
    {
      window.LightInputOff("left-button-id");
    }
    else if (event.key === 'ArrowDown'|| (event.code === 'KeyS'))
    {
      window.LightInputOff("down-button-id");
    }
    else if (event.key === 'ArrowUp'|| (event.code === 'KeyW'))
    {
      window.LightInputOff("top-button-id");
    }
  });
  return code;
}
