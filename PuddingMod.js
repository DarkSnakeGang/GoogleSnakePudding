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

    for(let src of [
        'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
        'https://i.postimg.cc/8cmVPfGd/blueberries.png',
        'https://i.postimg.cc/BQqHMbDc/redpepper.png',
        'https://i.postimg.cc/k5kWcyFB/lime.png',
        'https://i.postimg.cc/hPTVGdNX/blackberries.png',
        'https://i.postimg.cc/dQ78zXBm/green-grapes.png',
        'https://i.postimg.cc/B6ycxmBb/porga.png',
    ]) document.querySelector('#apple').appendChild(uiImage(src));


    for(let src of [
      'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
      'https://i.postimg.cc/t4bxfYzt/planeptune.png',
      'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
  ]) document.querySelector('#theme').appendChild(uiImage(src));


    document.body.style.overflow = 'hidden';

    function i(src) {
      let img = new Image();
      img.src = src;
      img.crossOrigin = 'Anonymous';
      img.width = img.height = 47;
      return img;
    }

    window.skull = i('https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png');

};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.PuddingMod.alterSnakeCode = function(code) {

  function i(src) {
    let img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';
    img.width = img.height = 47;
    return img;
  }

  var new_fruit = [];

  new_fruit.push({ // Pudding
      "Normal":'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
      "Pixel":'https://i.postimg.cc/J72xMMYX/Pixel-Pudding170-Small.png',
      "Poison_values": 'b,\'#eaca23\',\'#909090\',10',
  });
  new_fruit.push({ // Blueberries
    "Normal":'https://i.postimg.cc/8cmVPfGd/blueberries.png',
    "Pixel":'https://i.postimg.cc/Hkh1xCqN/px-blueberries.png',
    "Poison_values": 'b,\'#2323ea\',\'#909090\',30',
  });
  new_fruit.push({ // Red Pepper
    "Normal":'https://i.postimg.cc/BQqHMbDc/redpepper.png',
    "Pixel":'https://i.postimg.cc/02BWLrzt/red-pepper-px.png',
    "Poison_values": 'b,\'#910a22\',\'#909090\',20',
  });
  new_fruit.push({ // Lime
    "Normal":'https://i.postimg.cc/k5kWcyFB/lime.png',
    "Pixel":'https://i.postimg.cc/8cqg53Jr/px-lime.png',
    "Poison_values": 'b,\'#93ef13\',\'#909090\',70',
  });
  new_fruit.push({ // Blacberries
    "Normal":'https://i.postimg.cc/hPTVGdNX/blackberries.png',
    "Pixel":'https://i.postimg.cc/RZTf7zS9/px-blackberries.png',
    "Poison_values": 'b,\'#cccccc\',\'#909090\',70',
  });
  new_fruit.push({ // Green Grapes
    "Normal":'https://i.postimg.cc/dQ78zXBm/green-grapes.png',
    "Pixel":'https://i.postimg.cc/J79bmqYw/px-green-grapes.png',
    "Poison_values": 'b,\'#93ef13\',\'#909090\',30',
  });
  new_fruit.push({ // Burger
    "Normal":'https://i.postimg.cc/B6ycxmBb/porga.png',
    "Pixel":'https://i.postimg.cc/52SDdj3z/pixel-burger.png',
    "Poison_values": 'b,\'#910a22\',\'#909090\',90',
  });
  // Add new fruits here above this line!
  new_fruit.push({ // Golden Apple
    "Normal":'https://i.postimg.cc/tJqR4tT6/gold-apple.png',
    "Pixel":'https://i.postimg.cc/MGDg1gBQ/px-gold-apple.png',
    "Poison_values": 'b,\'#eaca23\',\'#909090\',20',
  });
  new_fruit.push({ // Red Pudding
    "Normal":'https://i.postimg.cc/15kNH2Y5/pudding-red.png',
    "Pixel":'https://i.postimg.cc/sXW6w8Qm/Red-Pixel-Pudding170-Small.png',
    "Poison_values": 'b,\'#ff3f3f\',\'#909090\',20',
  });
  //console.log(code);
  console.log("Starting to edit code...");

  //blueberries_src = 'https://i.postimg.cc/8cmVPfGd/blueberries.png'
  //blueberries_px_src = 'https://i.postimg.cc/Hkh1xCqN/px-blueberries.png'

  //pudding_src = 'https://i.postimg.cc/5y7gwwGY/pudding-cr.png'
  //pudding_px_src = 'https://i.postimg.cc/J72xMMYX/Pixel-Pudding170-Small.png' //'https://i.postimg.cc/44Bzcd69/Pixel-Pudding.png' // need to get a better pixelated pudding, 170x170
  //skull_src = 'https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png'
  //skull_path = 'snake_arcade/v12/trophy_10.png'
  //gold_src = 'https://i.postimg.cc/tJqR4tT6/gold-apple.png'
  //red_pudding = 'https://i.postimg.cc/15kNH2Y5/pudding-red.png'
  // Regex for a function that sets the src for count (I think)
  settings_src_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}=function\([a-zA-Z0-9_$]{1,4}\){""!==[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}&&\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\.src=[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}\);/)
  settings_var = code.match(settings_src_regex)[0].split('.')[0].split('=')[3] // This is usually "a", the variable the function gets, which has settings in it
  settings_itself = code.match(settings_src_regex)[0].split('.')[1] // This is either the word "settings" or whatever google replaced it with that's obfuscated
  settings_src = code.match(settings_src_regex)[0].split('.')[2].split('&')[0] // This is the [] part in a.settings.[] - which has an src link to an image in it
  // ${settings_itself}


  // Full function that sets the current fruit icon
  load_image_func = new RegExp(/if\("apple"===[a-zA-Z0-9_$]{1,4}\|\|"graphics"===[a-zA-Z0-9_$]{1,4}\)[a-zA-Z0-9_$]{1,4}=[a-zA-Z0-9_$]{1,4}\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}\),[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}="https:\/\/www\.google\.com\/logos\/fnbx\/"\+\(1===[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}\?"snake_arcade\/pixel\/px_apple_"\+[a-zA-Z0-9_$]{1,4}\+"\.png":"snake_arcade\/v4\/apple_"\+[a-zA-Z0-9_$]{1,4}\+"\.png"\);/)

  // Get all required variables around src for endscreen
  settings_regex = new RegExp(`,[a-zA-Z0-9_$]{1,4}\.${settings_itself}\.[a-zA-Z0-9_$]{1,4}`)
  settings_var = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[0].split(',')[1]
  settings_src = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[2]
  select_fruit_numvar = code.match(load_image_func)[0].match(new RegExp(/\+.\+/))[0].split('+')[1]
  //console.log(code.match(load_image_func)[0])
  pixel_setting_regex = new RegExp(`case "graphics":[a-zA-Z0-9_$]{1,4}.${settings_itself}.[a-zA-Z0-9_$]{1,4}`);
  pixel_setting = code.match(pixel_setting_regex)[0].split('.')[2]
  //console.log(code)
  // Gets the element that changed, "apple" means fruit here, in endscreen - Unused code here, but may be useful in the future.
  get_changed_var = code.match(load_image_func)[0].split('=')[3].split('|')[0]

  last_fruit_num = 21

  load_code_condensed = ``;

  for (let index = 0; index < new_fruit.length; index++) {
    current_fruit = new_fruit[index].Normal;
    current_fruit_px = new_fruit[index].Pixel;
    load_fruit_template = `
    ,\(${select_fruit_numvar}==${last_fruit_num+1+index} && ${settings_var}.${settings_itself}.${pixel_setting} === 0 ? ${settings_var}.${settings_itself}.${settings_src}="${current_fruit}" : {}\)
    ,\(${select_fruit_numvar}==${last_fruit_num+1+index} && ${settings_var}.${settings_itself}.${pixel_setting} === 1 ? ${settings_var}.${settings_itself}.${settings_src}="${current_fruit_px}" : {}\)`
    load_code_condensed = load_code_condensed + load_fruit_template;
  }
  load_code_condensed = load_code_condensed + ';';



  //load_pudding_code = `if\(${select_fruit_numvar}==="22"\)${settings_var}.settings.${settings_src}="${pudding_src}";`
  // Any additional fruit will need an extra line for it's own src
  //  //load pixelated pudding

  ip_grabber = new RegExp(/=new [a-zA-Z0-9_$]{1,8}\(this.[a-zA-Z0-9_$]{0,8},\"snake_arcade\/v4\/apple_\"/)
  func_name = code.match(ip_grabber)[0].replace("=new ", "").replace(`\(this.${settings_itself},\"snake_arcade\/v4\/apple_\"`,"")
  ip_grabber2 = new RegExp(/[a-zA-Z0-9_$]{1,8}\(b,c.[a-zA-Z0-9_$]{1,8},c.target,c.threshold\)/)
  poison_convert = code.match(ip_grabber2)[0].split('(')[0] // replace('\(b,c.base,c.target,c.threshold\)',"") // This function is what makes the poison grey in poison mode
  array_grabber = new RegExp(/".png"\),c=[a-zA-Z0-9_$]{1,8}\[a\],/)
  array_name = code.match(array_grabber)[0].replace('".png"\),c=',"").replace('[a],',"")

  add_fruit_array_last_func_regex = new RegExp(/.threshold\),this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)/);
  //add_fruit_before_loop_regex = new RegExp(/for\(a=0;21>a;a\+\+\)/);

  fruit_array_name = code.match(add_fruit_array_last_func_regex)[0].split('.')[2] // ${fruit_array_name}
  volume_class = document.querySelector('img[src="//www.gstatic.com/images/icons/material/system/2x/volume_up_white_24dp.png"]').getAttribute("class")
  //console.log("Volume class: " + volume_class)
  volume_src = `document.querySelector('img[class="${volume_class}"]').src `

  golden_index = `window.goldenIndex`

  add_fruit = `$&;this.${fruit_array_name}.push(b); // Add dummy for randomizer
  `
  for (let index = 0; index < new_fruit.length; index++) {
    current_fruit = new_fruit[index].Normal;
    current_fruit_px = new_fruit[index].Pixel;
    current_fruit_poison_values = new_fruit[index].Poison_values; // ${current_fruit_poison_values}
    add_fruit_template = `
    b=new ${func_name}(this.${settings_itself},"${current_fruit}",1,this.oa,"${current_fruit_px}");
    ${poison_convert}(${current_fruit_poison_values});
    this.${fruit_array_name}.push(b);`
    add_fruit = add_fruit + add_fruit_template;
  }


  add_gold = `
  ${golden_index} = this.${fruit_array_name}.length - 1;
  ${volume_src}="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png";
  `

  add_fruit = add_fruit + add_gold;

  // Distinct Soko Goals
  console.log("Making soko goals more distinct...")
  code = code.assertReplace(/resetState=function\(a\){/, "$&" + `
  this.oa.Da.oa.ka = new Image();
  this.oa.Da.oa.ka.src = 'https://i.postimg.cc/BbP3frD9/px-box-red.png';
  this.oa.Da.oa.ka.currentSrc = 'https://i.postimg.cc/BbP3frD9/px-box-red.png';
  this.oa.Da.oa.ka.crossOrigin = "Anonymous";

  this.oa.Da.oa.ys = new Image();
  this.oa.Da.oa.ys.src = 'https://i.postimg.cc/76W4cH5n/box-red.png';
  this.oa.Da.oa.ys.currentSrc = 'https://i.postimg.cc/76W4cH5n/box-red.png';
  this.oa.Da.oa.ys.crossOrigin = "Anonymous";

  this.oa.Da.oa.xs = new Image();
  this.oa.Da.oa.xs.src = 'https://i.postimg.cc/76W4cH5n/box-red.png';
  this.oa.Da.oa.xs.currentSrc = 'https://i.postimg.cc/76W4cH5n/box-red.png';
  this.oa.Da.oa.xs.crossOrigin = "Anonymous";
  `
  );

// lots of hardcoded shit here, fix it later
// call to func2 is what makes pudding poison grey, double push is to make the pudding load later on, janky workaround but works so I'll take it
  console.log("Adding pudding to stack...")
  code = code.assertReplace(add_fruit_array_last_func_regex, add_fruit);

  // Too lazy to clean this code, it's "good enough" to leave untouched for now
  // Basically, adds an if statement anywhere fruit image is search to compensate for pudding existing
  // The if statements are janky and get be condensed
  // This fixes errors in console but doesn't "change" anything in-game
  shh_grabber = new RegExp(/[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.path/);
  firstvar_name = code.match(shh_grabber)[0].split('.')[0];
  Hr_name = code.match(shh_grabber)[0].split('.')[1];

  new_shh_line = "if("+firstvar_name+".path.includes(\"postimg\"))"+firstvar_name+"."+Hr_name+".src="+firstvar_name+".path;else $&";

  Pr_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\&\&\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  Pr_a = code.match(Pr_regex)[0].split('.')[0]
  Pr_ka = code.match(Pr_regex)[0].split('.')[1].split('&')[0]
  Pr_pa = code.match(Pr_regex)[0].split('.')[6] // Where relative path is stored
  //console.log("Pr_pa: " + Pr_pa)

//console.log(code.match(Pr_regex)[0]);

  load_pixelated_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\&\&\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},"load",?\nfunction\(\){[a-zA-Z0-9_$]{1,8}\(a\)}\)\)}/gm)

  //console.log(code.match(load_pixelated_regex)[0]);
  //console.log(code.match(load_pixelated_regex)[0].split(',')[1].split('(')[0]);

  pixelated_switch = `switch(${Pr_a}.${Pr_pa}){ `;

  for (let index = 0; index < new_fruit.length; index++) {
    current_fruit = new_fruit[index].Normal;
    current_fruit_px = new_fruit[index].Pixel;
    pixelated_case_template = `
    case '${current_fruit_px}': ${Pr_a}.${Pr_ka}.src = '${current_fruit_px}'; break;`;
    pixelated_switch = pixelated_switch + pixelated_case_template;
  }

  // This fixes special rare fruits, but they aren't pixelated sprite here, need to make those.
  //pixelated_switch = pixelated_switch + `
  //case '${gold_src}': ${Pr_a}.${Pr_ka}.src = '${gold_src}'; break;`;
  //pixelated_switch = pixelated_switch + `
  //case '${red_pudding}': ${Pr_a}.${Pr_ka}.src = '${red_pudding}'; break;`;

  pixelated_switch = pixelated_switch + `
  default: ${Pr_a}.${Pr_ka}.src = "https://www.google.com/logos/fnbx/" + ${Pr_a}.${Pr_pa}; break;
}`;

  new_pixelated_func = `
  if (${Pr_a}.${Pr_ka})
  {
    ${pixelated_switch}
    ${code.match(load_pixelated_regex)[0].split(',')[1].split('(')[0]}(${Pr_a}.${Pr_ka}, "load",
    function() {
        ${code.match(load_pixelated_regex)[0].split('{')[1].split('(')[0]}(${Pr_a})
    });
  }
}
  `


  only_link_regex = new RegExp(/\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  //new_aggressive_condition = `(${Pr_a}.${Pr_pa} == "${pudding_src}" ? "${pudding_px_src}" : "https://www.google.com/logos/fnbx/"+${Pr_a}.${Pr_pa})` // This has to do with pixel graphics
  //new_aggressive_condition_v2 = `(${Pr_a}.${Pr_pa}.includes("postimg") ? (${Pr_a}.${Pr_pa}.includes("blueberries") ? "${blueberries_px_src}" : "${pudding_px_src}") : "https://www.google.com/logos/fnbx/"+${Pr_a}.${Pr_pa})` // This has to do with pixel graphics

  //aggressive_change = code.match(Pr_regex)[0].replace(only_link_regex, new_aggressive_condition_v2)


  console.log("Adding pixelated pudding...")
  //code = code.assertReplace(Pr_regex, aggressive_change);
  code = code.assertReplace(load_pixelated_regex, new_pixelated_func);
  //console.log(code);

  //Pr_new = "if("+Pr_a+"."+Pr_pa+"==\"" +pudding_src+"\")"+Pr_a+"."+Pr_ka+".src=\""+pudding_src+"\";else $&"

  // Fixes an image call to pudding
  //code = code.assertReplace(Pr_regex, Pr_new);
  // Also fixes an image call to pudding
  console.log("Adding pudding image...")
  code = code.assertReplace(shh_grabber, new_shh_line);

  // Gets the settings value that hold the src for count and apple, also the var it's held in is the same for both.
  get_count_val1 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[0].split(':')[1]
  get_count_val2 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  get_apple_val2 = code.match(/case "apple":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  get_speed_val2 = code.match(/case "speed":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  //theme_case

  console.log("Adding dark night and planeptune themes...")
  code = code.assertReplace(/case "theme":/, `case "theme":
  if(d>8)
  {
    switch(d){
      case 9: window.snake.setCustomTheme('#1D1D1D', '#161616', '#111111', '#000000', '#1D1D1D', '#111111', '#000000'); break;
      case 10: window.snake.setCustomTheme('#5B50B0', '#6759B9', '#3F3478', '#110C30', '#5B50B0', '#090220', '#110C30'); break;
      case 11: window.snake.setCustomTheme('#0050b0', '#0059b9', '#003478', '#000c30', '#0050b0', '#000220', '#000C30'); break;
    }
  }
  else
  {
    window.snake.clearCustomTheme();
  }
  `)

  // Arbitrary values for keeping the SRC image for these things
  Count_SRC = "COUNT"
  Replace_Speed = "SPEED"

  imgElement_func =`
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
  speed_code =`
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

  //console.log("Settings? : " + settings_itself)

  // Create a new if statement that sets the count image whenever changes are made
  count_score = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "count").replaceAll(settings_src, Count_SRC).replaceAll(get_apple_val2, get_count_val2).replaceAll("pixel/px_", "v3/")
  //detect_dice = `".png"),${settings_var}.${settings_itself}.${Count_SRC} = (d === "03") ? "https://github.com/DarkSnakeGang/GoogleSnakeIcons/raw/main/Counts/dice_count.png" : ${settings_var}.${settings_itself}.${Count_SRC}`
  //count_score = count_score.replaceAll("\".png\")", detect_dice)
  // Adds loading for counts when starting the game
  console.log("Adding count detector...")
  //console.log(count_score);

  count_score = count_score.split(')')[0].replace('||"graphics"===b','') + `){
    ${count_code}
    ${settings_var}.${settings_itself}.${Count_SRC} = count_img_arr[d];
  }

  `
  //console.log(count_score);

  code = code.assertReplace(load_image_func, count_score + "$&");

  // Function that checks if count image is set, and sets it to a default of 1a if it's not set.
  check_count_undefined = `if(${settings_var}.${settings_itself}.${Count_SRC} in window)${settings_var}.${settings_itself}.${Count_SRC}="https://www.google.com/logos/fnbx/snake_arcade/v3/count_00.png";`

  // Regex for where the src in settings is taken from
  TopBar_srcFunc_p1 = new RegExp(`\_\.[a-zA-Z0-9_$]{1,4}\.add\\\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\,\"[a-zA-Z0-9_$]{1,8}\"\\\)\;\"\"\!\=\=[a-zA-Z0-9_$]{1,4}\.settings\.${settings_src}\&\&`)
  TopBar_srcFunc_p2 = new RegExp(`\\\(${settings_var}.[a-zA-Z0-9_$]{1,4}.src=${settings_var}.${settings_itself}.${settings_src}\\\);""!==${settings_var}.${settings_itself}.[a-zA-Z0-9_$]{1,4}&&\\\(a.[a-zA-Z0-9_$]{1,4}.src=${settings_var}.${settings_itself}.[a-zA-Z0-9_$]{1,4}\\\);${settings_var}=this.[a-zA-Z0-9_$]{1,4}.[a-zA-Z0-9_$]{1,4};`);

  // Changes the SRC of where top bar fruit is taken from fruit to count
  TopBar_count_code=code.match(TopBar_srcFunc_p1)[0].replaceAll(settings_src,Count_SRC)
  TopBar_count_code=TopBar_count_code.split(';')[0]+';'+check_count_undefined+TopBar_count_code.split(';')[1]
  TopBar_count_code2 = code.match(TopBar_srcFunc_p2)[0].replaceAll(settings_src,Count_SRC)


  // Actually changes Top Bar fruit to multi count
  console.log("Updating top bar with count...")

  code = code.assertReplace(TopBar_srcFunc_p1, TopBar_count_code);
  code = code.assertReplace(TopBar_srcFunc_p2, TopBar_count_code2);

  // Volume Regex
  console.log("Replacing volume with speed...")
  volume_regex = new RegExp(/this\.muted\?\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_off_white_24dp.png\"\:\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_up_white_24dp\.png\"\;/)
  code = code.assertReplace(volume_regex, `this.${settings_itself}.${Replace_Speed} ? this.${settings_itself}.${Replace_Speed} : "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" ;`)
// _.k.R7b=function(){this.muted=!this.muted;
  volume_src_regex = new RegExp(/[a-zA-Z0-9_$.]{1,7}=function\(\){this\.muted=!this\.muted;this\.header\.[a-zA-Z0-9_$.]{1,7}\.src=/)

  speed_volume = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "speed").replaceAll(settings_src, Replace_Speed).replaceAll(get_apple_val2, get_speed_val2)
  speed_volume = speed_volume.replace(';', `,${volume_src}=${settings_var}.${settings_itself}.${Replace_Speed} == "https://www.google.com/logos/fnbx/snake_arcade/pixel/px_speed_00.png" ? "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" : ${settings_var}.${settings_itself}.${Replace_Speed} ;`)

  speed_volume = speed_volume.split(')')[0].replace('||"graphics"===b','') + `){
    ${speed_code}
    ${settings_var}.${settings_itself}.${Replace_Speed} = speed_img_arr[d];
    ${volume_src}=speed_img_arr[d];
  }
  `
  //console.log(speed_volume);

  // Add loading for speed when starting the game
  console.log("Adding speed detector...")
  code = code.assertReplace(load_image_func, speed_volume + "$&");

  // Endscreen related image loading for new fruit - pudding. Keep this last
  // Since it effect load_image_func in a way that would break the other code that relays on it !!
  console.log("Adding pudding to endscreen...")
  code = code.assertReplace(load_image_func, code.match(load_image_func)[0].replaceAll(';',load_code_condensed));
  //code = code.assertReplace(load_image_func, "$&" + load_pudding_code);

  // The elegent piece of code that replace the grey pudding with the skull icon
  draw_skull_func = new RegExp(/return [a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8}\)\&\&a\.oa\?a\.oa\.canvas\:a\.Aa\.canvas/)
  get_pixel = code.match(draw_skull_func)[0].split(' ')[1].split('&')[0]
  pudding_skull_xd = `if(a.path.includes("pudding") && !${get_pixel}){return window.skull;}$&;`

  console.log("Replacing grey poison pudding with skull trophy icon...")
  code = code.assertReplace(draw_skull_func, pudding_skull_xd)
  //console.log(Math.floor((Math.random() * 1000000) + 1) == 426017) // 426017
  //console.log(code);

  gold_chance = `* 1000000) + 1) == 426017)` // ${gold_chance}
  super_chance = `* 10000000) + 1) == 4263017)` // ${super_chance}
  free_test = `* 10) + 1) == 6)` // ${free_test}

  apple_info_regex = new RegExp(/a\.ka\[b\]\.pos/)
  set_gold = `if(a.ka[b].type >= ${golden_index} - 1){a.ka[b].type = a.ka[b].old_type;}
  if(Math.floor((Math.random() ${gold_chance}{a.ka[b].old_type = a.ka[b].type; a.ka[b].type = ${golden_index} - 1;}
  if(Math.floor((Math.random() ${super_chance}{a.ka[b].old_type = a.ka[b].type; a.ka[b].type = ${golden_index};}
  $&`
  console.log("Adding 1 in a Million Golden Apple...")
  console.log("Adding 1 in a 10 Million Special Secret...")
  code = code.assertReplace(apple_info_regex, set_gold)

  //draw_apple_func = new RegExp(/return [a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8}\)\&\&a\.oa\?a\.oa\.canvas\:a\.Aa\.canvas/)
  //golden_logic = `if(a.path.includes("postimg") && !${get_pixel}){return window.darks[22];}$&;`

  console.log("Done, enjoy Pudding Mod!");

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function() {
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Pudding Mod';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
