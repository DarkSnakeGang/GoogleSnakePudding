window.PuddingMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeBefore = function() {

  console.log("Thank you for loading Yarmiplay's Pudding Mod! Hope you enjoy :)");
  console.log("Please provide feedback and report bugs in #snake-modding in the Official Google Snake Discord");
  console.log("Google Snake SRC Discord link: https://discord.gg/dDuCTm62EZ");

    /// Code inspired by fishes, aka copy-pasted
  window.uiImage = function(src) {
    let img = new Image();
    img.src = src;
    img.width = 40;
    img.height = 40;
    img.class = 'DqMRee SsAred'; // Hardcoded, need to figure out what this is and how to make it dynamic or something.
    return img;
  };

  // Fruit, aka pudding

    for(let src of [
        'https://github.com/DarkSnakeGang/GoogleSnakeIcons/raw/main/Foods/Pudding.png',
    ]) document.querySelector('#apple').appendChild(uiImage(src));

      // Skull

    //for(let src of [
    //    'https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png',
    //]) document.querySelector('#skull').appendChild(uiImage(src));



};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.PuddingMod.alterSnakeCode = function(code) {

  pudding_src = 'https://github.com/DarkSnakeGang/GoogleSnakeIcons/raw/main/Foods/Pudding.png'

  // Full function that sets the current fruit icon
  load_image_func = new RegExp(/if\("apple"===[a-zA-Z0-9_$]{1,4}\|\|"graphics"===[a-zA-Z0-9_$]{1,4}\)[a-zA-Z0-9_$]{1,4}=[a-zA-Z0-9_$]{1,4}\([a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}\),[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}="https:\/\/www\.google\.com\/logos\/fnbx\/"\+\(1===[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}\?"snake_arcade\/pixel\/px_apple_"\+[a-zA-Z0-9_$]{1,4}\+"\.png":"snake_arcade\/v4\/apple_"\+[a-zA-Z0-9_$]{1,4}\+"\.png"\);/)

  // Get all required variables around src for endscreen
  settings_regex = new RegExp(/,[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}/)
  settings_var = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[0].split(',')[1]
  settings_src = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[2]
  select_fruit_numvar = code.match(load_image_func)[0].match(new RegExp(/\+.\+/))[0].split('+')[1]

  // Gets the element that changed, "apple" means fruit here, in endscreen - Unused code here, but may be useful in the future.
  get_changed_var = code.match(load_image_func)[0].split('=')[3].split('|')[0]

  last_fruit_num = 21
  // Code to add that check if pudding has been selected and sets it's SRC - works for endscreen
  load_pudding_code_condensed = `,\(${select_fruit_numvar}==${last_fruit_num+1} ? ${settings_var}.settings.${settings_src}="${pudding_src}" : {}\);`
  // Any additional fruit will need an extra line for it's own src

  // Too lazy to clean this code, it's "good enough" to leave untouched for now
  // Basically, adds an if statement anywhere fruit image is search to compensate for pudding existing
  // The if statements are janky and get be condensed
  // This fixes errors in console but doesn't "change" anything in-game
  shh_grabber = new RegExp(/[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.path/);
  firstvar_name = code.match(shh_grabber)[0].split('.')[0];
  Hr_name = code.match(shh_grabber)[0].split('.')[1];

  new_shh_line = "if("+firstvar_name+".path===\""+pudding_src+"\")"+firstvar_name+"."+Hr_name+".src=\""+pudding_src+"\";else $&";

  Pr_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\&\&\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  Pr_a = code.match(Pr_regex)[0].split('.')[0]
  Pr_ka = code.match(Pr_regex)[0].split('.')[1].split('&')[0]
  Pr_pa = code.match(Pr_regex)[0].split('.')[6]
  Pr_new = "if("+Pr_a+"."+Pr_pa+"==\"" +pudding_src+"\")"+Pr_a+"."+Pr_ka+".src=\""+pudding_src+"\";else $&"

  // Fixes an image call to pudding
  code = code.assertReplace(Pr_regex, Pr_new);
  // Also fixes an image call to pudding
  code = code.assertReplace(shh_grabber, new_shh_line);

  // Gets the settings value that hold the src for count and apple, also the var it's held in is the same for both.
  get_count_val1 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[0].split(':')[1]
  get_count_val2 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  get_apple_val2 = code.match(/case "apple":[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]

  // Arbitrary values for keeping the SRC image for these things
  Count_SRC = "COUNT"
  Replace_Speed = "SPEED"

  // Regex for a function that sets the src for count (I think)
  settings_src_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}=function\([a-zA-Z0-9_$]{1,4}\){""!==[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}&&\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\.src=[a-zA-Z0-9_$]{1,4}\.settings\.[a-zA-Z0-9_$]{1,4}\);/)
  settings_var = code.match(settings_src_regex)[0].split('.')[0].split('=')[3] // This is usually "a", the variable the function gets, which has settings in it
  settings_src = code.match(settings_src_regex)[0].split('.')[2].split('&')[0] // This is the [] part in a.settings.[] - which has an src link to an image in it

  // Create a new if statement that sets the count image whenever changes are made
  count_score = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "count").replaceAll(settings_src, Count_SRC).replaceAll(get_apple_val2, get_count_val2)
  speed_volume = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "speed").replaceAll(settings_src, Replace_Speed).replaceAll(get_apple_val2, Replace_Speed)

  // Adds loading for counts when starting the game
  code = code.assertReplace(load_image_func, count_score + "$&");
  // Add loading for speed when starting the game
  code = code.assertReplace(load_image_func, speed_volume + "$&");

  // Function that checks if count image is set, and sets it to a default of 1a if it's not set.
  check_count_undefined = `if(${settings_var}.settings.${Count_SRC} in window)${settings_var}.settings.${Count_SRC}="https://www.google.com/logos/fnbx/snake_arcade/v3/count_00.png";`

  // Regex for where the src in settings is taken from
  TopBar_srcFunc_p1 = new RegExp(`\_\.[a-zA-Z0-9_$]{1,4}\.add\\\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\,\"[a-zA-Z0-9_$]{1,8}\"\\\)\;\"\"\!\=\=[a-zA-Z0-9_$]{1,4}\.settings\.${settings_src}\&\&`)
  TopBar_srcFunc_p2 = new RegExp(`\\\(${settings_var}.[a-zA-Z0-9_$]{1,4}.src=${settings_var}.settings.${settings_src}\\\);""!==${settings_var}.settings.[a-zA-Z0-9_$]{1,4}&&\\\(a.[a-zA-Z0-9_$]{1,4}.src=${settings_var}.settings.[a-zA-Z0-9_$]{1,4}\\\);${settings_var}=this.[a-zA-Z0-9_$]{1,4}.[a-zA-Z0-9_$]{1,4};`);

  // Changes the SRC of where top bar fruit is taken from fruit to count
  TopBar_count_code=code.match(TopBar_srcFunc_p1)[0].replaceAll(settings_src,Count_SRC)
  TopBar_count_code=TopBar_count_code.split(';')[0]+';'+check_count_undefined+TopBar_count_code.split(';')[1]

  // Actually changes Top Bar fruit to multi count
  code = code.assertReplace(TopBar_srcFunc_p1, TopBar_count_code);
  code = code.assertReplace(TopBar_srcFunc_p2, code.match(TopBar_srcFunc_p2)[0].replaceAll(settings_src,Count_SRC));

  // Endscreen related image loading for new fruit - pudding. Keep this last
  // Since it effect load_image_func in a way that would break the other code that relays on it !!
  code = code.assertReplace(load_image_func, code.match(load_image_func)[0].replaceAll(';',load_pudding_code_condensed));

  console.log(code);


  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function() {

};
