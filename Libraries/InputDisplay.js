window.InputDisplay = {};

window.InputDisplay.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things
    const e = document.createElement('div');
  e.id = 'input-display-container';
  e.style = 'position:absolute;left:156px;top:516px;z-index:10000;display:block';
  document.getElementsByClassName('sEOCsb')[0].appendChild(e);

  const f = document.createElement('div');
  f.id = 'input-display-container';
  f.style = 'position:absolute;left:156px;top:444px;z-index:10000;display:block';
  document.getElementsByClassName('sEOCsb')[0].appendChild(f);

  const InpBox = document.querySelector('#input-display-container');

  const LeftButton = document.createElement('div');
  LeftButton.style ='position:absolute;left:460px;top"450px;z-index:10000;width:200px;';
  LeftButton.innerHTML = '<div id="left-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">←</div>'
  InpBox.appendChild(LeftButton);

  const DownButton = document.createElement('div');
  DownButton.style ='position:absolute;left:530px;top"452px;z-index:10000;width:200px;';
  DownButton.innerHTML = '<div id="down-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">  ↓  </div>'
  InpBox.appendChild(DownButton);

  const RightButton = document.createElement('div');
  RightButton.style ='position:absolute;left:601px;top"550px;z-index:10000;width:200px;';
  RightButton.innerHTML = '<div id="right-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">→</div>'
  InpBox.appendChild(RightButton);

  const TopButton = document.createElement('div');
  TopButton.style ='position:relative;left:530px;top"152px;z-index:10000;width:200px;';
  TopButton.innerHTML = '<div id="top-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">↑</div>'
  f.appendChild(TopButton);

  window.input_toggle =false;
  window.toggle_input_display = function toggle_input_display() {
        window.input_toggle = !window.input_toggle;
        console.log("hmmm");
        if(window.input_toggle)
    {
    
    document.getElementById('left-button-id').style.display='inline-block';
    document.getElementById('down-button-id').style.display='inline-block';
    document.getElementById('right-button-id').style.display='inline-block';
    document.getElementById('top-button-id').style.display='inline-block';
    }
    else
    {
      
      document.getElementById('left-button-id').style.display='none';
      document.getElementById('down-button-id').style.display='none';
      document.getElementById('right-button-id').style.display='none';
      document.getElementById('top-button-id').style.display='none';
    }
}
window.LightUpInput = function(direction)
  {
    document.getElementById(direction).style.backgroundColor='#999999';
    setTimeout(()=>{
      document.getElementById(direction).style.backgroundColor='#4f4f4f';
    },200);
    
  }
}
window.InputDisplay.alterCode = function (code) {

    // Code to alter snake code here

    return code;
}
