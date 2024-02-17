window.TopBar = {};

window.TopBar.make = function () {

  // Code that runs before anything else here, loading variables, etc.
  // Recommended to use "window." for things
  window.getImgFromElement = function getImgFromElement(element) {
    return element.replace('class=', '').replace('width=', '').replace('height=', '').split('=')[1].split('"')[1];
  }

 // window.topbar_icons = true;
  window.count_setting = 0;
  window.speed_setting = 0;

  window.toggle_topbar_icons = function () {
    window.pudding_settings.TopBar = !window.pudding_settings.TopBar;
  }

}

window.TopBar.alterCode = function (code) {

  window.count_img_arr = Array.from(document.querySelector('#count').children).map(el=>el.src);
  window.speed_img_arr = Array.from(document.querySelector('#speed').children).map(el=>el.src);

  count_regex = new RegExp(/case "count"\:[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  speed_regex = new RegExp(/case "speed"\:[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  size_regex = new RegExp(/case "size"\:[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)

  count_ref = code.match(count_regex)[0].split('.')[2]
  speed_ref = code.match(speed_regex)[0].split('.')[2]
  size_ref = code.match(speed_regex)[0].split('.')[2]

  settings_reference = code.match(count_regex)[0].split(':')[1].split('.')[0] + '.' + code.match(count_regex)[0].split('.')[1]

  //set_count_code = `$&${count_var}=`
  //set_speed_code = `$&${speed_var}=`

  code = code.assertReplace(/switch\(b\){case "apple"\:/, `window.set_ref = ${settings_reference}; $&`);

  count_var = `window.set_ref.${count_ref}`
  speed_var = `window.set_ref.${speed_ref}`
  size_var = `window.set_ref.${size_ref}`


  //code = code.assertReplace(count_regex, set_count_code);
  //code = code.assertReplace(speed_regex, set_speed_code);

  fruit_jsname = document.querySelector('[src$="apple_00.png"]').getAttribute("jsname")
  fruit_src = `document.querySelector('[jsname="${fruit_jsname}"]').src `

  window.mute_divs = document.querySelectorAll('[aria-label="Mute"]');
  window.mute_default_innerHTML = [window.mute_divs[0].innerHTML, window.mute_divs[1].innerHTML]
  window.mute_speed_element = document.createElement('img');
  window.mute_speed_element.classList.add('EFcTud')
  window.mute_speed_element.src = "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png"
  window.mute_speed_element.style.padding = '0px';
  window.mute_speed_copy = window.mute_speed_element.cloneNode(true);

  window.control_mute_img = function control_mute_img(TopBar, SpeedSrc) {
    if (TopBar) {
      for (let index = 0; index < window.mute_divs.length; index++) {
        const element = window.mute_divs[index];
        element.innerHTML = ''
      }
      window.mute_speed_element.src = SpeedSrc
      window.mute_speed_copy.src = SpeedSrc
      window.mute_divs[0].appendChild(window.mute_speed_element)
      window.mute_divs[1].appendChild(window.mute_speed_copy)
      return;
    }
    for (let index = 0; index < window.mute_divs.length; index++) {
      const element = window.mute_divs[index];
      element.innerHTML = window.mute_default_innerHTML[index]
    }
  }

  reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

  set_on_reset = `;
  if (window.pudding_settings.TopBar && !window.daily_challenge) {
    ${fruit_src} = window.count_img_arr[${count_var}]
  }
  window.control_mute_img(window.pudding_settings.TopBar, window.speed_img_arr[${speed_var}])
  if(window.daily_challenge){
    window.control_mute_img(false, window.speed_img_arr[${speed_var}])
  }
  $&`
  code = code.assertReplace(reset_regex, set_on_reset)

  window.set_ref = {};
  eval(speed_var + `=0`)
  eval(count_var + `=0`)
  eval(size_var + `=0`)

  return code;
}
