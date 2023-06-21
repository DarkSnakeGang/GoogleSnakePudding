window.TopBar = {};

window.TopBar.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things

}

window.TopBar.alterCode = function (code) {

    // Code to alter snake code here
    // Arbitrary values for keeping the SRC image for these things
    Count_SRC = "COUNT"
    Replace_Speed = "SPEED"

    imgElement_func = `
function getImgFromElement(element){
  return element.replace('class=', '').replace('width=', '').replace('height=', '').split('=')[1].split('"')[1];
}
`

    count_code = `
${imgElement_func}
count_img = document.querySelector('#count').innerHTML.split('<');
count_img_arr = [];
for (let index = 0; index < count_img.length; index++) {
  const element = count_img[index];
  if(element != "")
  {
    count_img_arr.push(getImgFromElement(element));
  }
}
`
    speed_code = `
${imgElement_func}
speed_img = document.querySelector('#speed').innerHTML.split('<');
speed_img_arr = [];
for (let index = 0; index < speed_img.length; index++) {
  const element = speed_img[index];
  if(element != "")
  {
    speed_img_arr.push(getImgFromElement(element));
  }
}
`
    load_image_func = new RegExp(/if\("apple"===[a-zA-Z0-9_$]{1,8}\|\|"graphics"===[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}\),\n?[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}="https:\/\/www\.google\.com\/logos\/fnbx\/"\+\(1===[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}\?"snake_arcade\/pixel\/[a-zA-Z0-9_$]{1,8}\/px_apple_"\+[a-zA-Z0-9_$]{1,8}\+"\.png":"snake_arcade\/[a-zA-Z0-9_$]{1,8}\/apple_"\+[a-zA-Z0-9_$]{1,8}\+"\.png"\)/)
    // Create a new if statement that sets the count image whenever changes are made
    count_score = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "count").replaceAll(settings_src, Count_SRC).replaceAll(get_apple_val2, get_count_val2).replaceAll("pixel/px_", "v3/")

    // Adds loading for counts when starting the game
    //console.log("Adding count detector at top bar")
    count_score = count_score.split(')')[0].replace('||"graphics"===b', '') + `){
  ${count_code}
  ${settings_var}.${settings_itself}.${Count_SRC} = count_img_arr[d];
}

`

    code = code.assertReplace(load_image_func, count_score + "$&");

    // Function that checks if count image is set, and sets it to a default of 1a if it's not set.
    check_count_undefined = `if(${settings_var}.${settings_itself}.${Count_SRC} in window){${settings_var}.${settings_itself}.${Count_SRC}="https://www.google.com/logos/fnbx/snake_arcade/v3/count_00.png";}`

    // Actually changes Top Bar fruit to multi count
    //console.log("Updating top bar with count")

    twin_all_global = `window.snake.twinAll`
    fruit_class = document.querySelector('img[src="//www.google.com/logos/fnbx/snake_arcade/v3/apple_00.png"]').getAttribute("class")
    fruit_src = `document.querySelector('img[class="${fruit_class}"]').src `
    reset_regex = new RegExp(/;this\.reset\(\)/)
    set_fruit_count = `${check_count_undefined}
${fruit_src}=${settings_var}.${settings_itself}.${Count_SRC};
${twin_all_global}=false;
`
    code = code.assertReplace(reset_regex, ";" + set_fruit_count + "this.reset()");

    // Volume Regex
    //console.log("Replacing volume with speed")
    volume_regex = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}\?\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_off_white_24dp.png\"\:\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_up_white_24dp\.png\"\;/)
    code = code.assertReplace(volume_regex, `this.${settings_itself}.${Replace_Speed} ? this.${settings_itself}.${Replace_Speed} : "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" ;`)
    volume_src_regex = new RegExp(/[a-zA-Z0-9_$.]{1,7}=function\(\){this\.[a-zA-Z0-9_$]{1,8}=!this\.[a-zA-Z0-9_$]{1,8};this\.header\.[a-zA-Z0-9_$.]{1,7}\.src=/)

    speed_volume = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "speed").replaceAll(settings_src, Replace_Speed).replaceAll(get_apple_val2, get_speed_val2)
    speed_volume = speed_volume.replace(';', `,${volume_src}=${settings_var}.${settings_itself}.${Replace_Speed} == "https://www.google.com/logos/fnbx/snake_arcade/pixel/px_speed_00.png" ? "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" : ${settings_var}.${settings_itself}.${Replace_Speed} ;`)

    speed_volume = speed_volume.split(')')[0].replace('||"graphics"===b', '') + `){
  ${speed_code}
  ${settings_var}.${settings_itself}.${Replace_Speed} = speed_img_arr[d];
  ${volume_src}=speed_img_arr[d];
}
`

    // Add loading for speed when starting the game
    //console.log("Adding speed detector")
    code = code.assertReplace(load_image_func, speed_volume + "$&");
    return code;
}
