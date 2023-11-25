window.TopBar = {};

window.TopBar.make = function () {

  // Code that runs before anything else here, loading variables, etc.
  // Recommended to use "window." for things
  window.getImgFromElement = function getImgFromElement(element) {
    return element.replace('class=', '').replace('width=', '').replace('height=', '').split('=')[1].split('"')[1];
  }

 // window.topbar_icons = true;
  window.is_muted = false;
  window.count_setting = 0;
  window.speed_setting = 0;

  window.toggle_topbar_icons = function () {
    window.pudding_settings.TopBar = !window.pudding_settings.TopBar;
  }

}

window.TopBar.alterCode = function (code) {

  // Code to alter snake code here
  count_var = "window.count_setting"
  speed_var = "window.speed_setting"

  muted_img = "//www.gstatic.com/images/icons/material/system/2x/volume_off_white_24dp.png"
  unmuted_img = "//www.gstatic.com/images/icons/material/system/2x/volume_up_white_24dp.png"

  window.count_img_arr = Array.from(document.querySelector('#count').children).map(el=>el.src);
  window.speed_img_arr = Array.from(document.querySelector('#speed').children).map(el=>el.src);

  count_regex = new RegExp(/case "count"\:/)
  speed_regex = new RegExp(/case "speed"\:/)

  set_count_code = `$&${count_var}=`
  set_speed_code = `$&${speed_var}=`

  fruit_jsname = document.querySelector('img[src$="apple_00.png"]').getAttribute("jsname")
  fruit_src = `document.querySelector('img[jsname="${fruit_jsname}"]').src `
  try {
    mute_jsname = document.querySelector(`img[src="${unmuted_img}"`).getAttribute("jsname")
    window.is_muted = false;
  } catch (error) {
    if (window.NepDebug) {
      console.log("Noticed it's muted, adjusting.")
    }
    mute_jsname = document.querySelector(`img[src="${muted_img}"`).getAttribute("jsname")
    window.is_muted = true;
  }
  mute_src = `document.querySelector('img[jsname="${mute_jsname}"]').src `

  code = code.assertReplace(count_regex, set_count_code);
  code = code.assertReplace(speed_regex, set_speed_code);

  reset_regex = new RegExp(/;this\.reset\(\)/)

  set_on_reset = `;
  if (window.pudding_settings.TopBar) {
    ${mute_src} = window.speed_img_arr[${speed_var}]
    ${fruit_src} = window.count_img_arr[${count_var}]
  }
  else {
    ${mute_src} = window.is_muted ? "${muted_img}" : "${unmuted_img}";
  }
  $&`
  code = code.assertReplace(reset_regex, set_on_reset)

  volume_regex = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}\?\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_off_white_24dp.png\"\:\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_up_white_24dp\.png\"\;/)
  disable_mute = `$&
  if (window.pudding_settings.TopBar) {
    ${mute_src} = window.speed_img_arr[${speed_var}]
  }
  `
  code = code.assertReplace(volume_regex, disable_mute)

  return code;
}
