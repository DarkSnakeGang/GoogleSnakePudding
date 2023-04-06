window.DiceMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.DiceMod.runCodeBefore = function() {
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

    loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js');
    console.log("Enabling Pudding Mod");
    window.PuddingMod.runCodeBefore();
    for(let src of [
        'https://i.postimg.cc/RFy3tJLS/dice-count.png',
        'https://i.postimg.cc/QNbwZG9D/dice-count2.png',
        'https://i.postimg.cc/MKynhfjv/dice-count3.png',
    ]) document.querySelector('#count').appendChild(uiImage(src));
}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.DiceMod.alterSnakeCode = function(code) {

  code = window.PuddingMod.alterSnakeCode(code);
    // Regex for a function that sets the src for count (I think)
    settings_src_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}=function\([a-zA-Z0-9_$]{1,4}\){""!==[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}&&\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\.src=[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,4}\);/)
    //settings_var = code.match(settings_src_regex)[0].split('.')[0].split('=')[3] // This is usually "a", the variable the function gets, which has settings in it
    settings_itself = code.match(settings_src_regex)[0].split('.')[1] // This is either the word "settings" or whatever google replaced it with that's obfuscated
    //settings_src = code.match(settings_src_regex)[0].split('.')[2].split('&')[0] // This is the [] part in a.settings.[] - which has an src link to an image in it
    // ${settings_itself}
    //console.log(code);

//console.log("Getting settings values...")
  // Full function that sets the current fruit icon
  //load_image_func = new RegExp(/count_"\+d\+"\.png"\)/gm)

    // Create a new if statement that sets the count image whenever changes are made
    //count_score = code.match(load_image_func)[0]
    //console.log(count_score)
    //detect_dice = `count_"+d+".png"),${settings_var}.${settings_itself}.${Count_SRC} = (d === "03") ? "https://i.postimg.cc/RFy3tJLS/dice-count.png" : ${settings_var}.${settings_itself}.${Count_SRC}
    //,${settings_var}.${settings_itself}.${Count_SRC} = (d === "04") ? "https://i.postimg.cc/QNbwZG9D/dice-count2.png" : ${settings_var}.${settings_itself}.${Count_SRC}
    //,${settings_var}.${settings_itself}.${Count_SRC} = (d === "05") ? "https://i.postimg.cc/MKynhfjv/dice-count3.png" : ${settings_var}.${settings_itself}.${Count_SRC};`
    //
    //detect_dice = `".png"),${settings_var}.${settings_itself}.${Count_SRC} = "https://i.postimg.cc/RFy3tJLS/dice-count.png"`

    //count_score = count_score.replaceAll(`count_"+d+".png")`, detect_dice)
    // Adds loading for counts when starting the game
    //console.log("Adding count detector for Dice...")
    //code = code.assertReplace(load_image_func, count_score);

  // Add global for isDice and reset expecte and current counts
  is_dice = `window.snake.isDice`
  double_dice = `window.snake.doubleDice`
  high_dice = `window.snake.highDice`
  expectedCount = `window.snake.expectedCount`
  currentCount = `window.snake.currentCount`
  secretAppleArr = `window.snake.secretAppleArr`
  typeStore = `window.snake.typeStore`

  spawn_func_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},2\)\)var [a-zA-Z0-9_$]{1,8}=!0;else if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},10\)&&[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=\n?!1;else{var [a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},6\)\|\|[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},7\);[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8},![a-zA-Z0-9_$]{1,8},null\)}/)
  spawn_func_code = code.match(spawn_func_regex)[0]
  is_poison_apple = spawn_func_code.split('(')[3] + '(' + spawn_func_code.split('(')[4].split(')')[0] + ')' + spawn_func_code.split(')')[3]
  spawn_portal = spawn_func_code.split(')')[2].split(';')[0] + ';'
  mark_avoid_spawn = spawn_portal.replace('!', '')
  move_apple_func = spawn_func_code.split('{')[1].replace('}', '') + ";"
  is_portal = spawn_func_code.split('(')[1] + "(" + spawn_func_code.split(')')[0].split('(')[2] + ")"
  should_spawn_res = spawn_portal.split(" ")[1].split("=")[0]

  apple_eaten_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\|\|[a-zA-Z0-9_$]{1,8}\){var/)

  current_count_regex = new RegExp(/[a-zA-Z0-9_$]{1,8}=function\(a\){var b=0;if\([a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8},10\)\){a=_.[a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8}\);for\(var c=a.next\(\);!c.done;c=a.next\(\)\)c.value.[a-zA-Z0-9_$]{1,8}\|\|b\+\+}else b=a.[a-zA-Z0-9_$]{1,8}.length;return b};/gm);
  current_count_func = code.match(current_count_regex)[0].split("=")[0] + "(this.wa);"

  real_new_apple_regex = new RegExp(/var [a-zA-Z0-9_$]{1,8}=function\(a,b,c\){return{pos/)
  real_new_apple_func = code.match(real_new_apple_regex)[0].split(' ')[1].split('=')[0] + "(this, 0, 0)"

  //console.log(spawn_func_code);
  //console.log(should_spawn_res);
  //console.log("Spawn Portal: " + spawn_portal);
  //console.log(move_apple_func);
  //console.log("IS portal: " + is_portal)

  apple_loop_regex = new RegExp(/for\(var [a-zA-Z0-9_$]{1,8}=!1/)

  array_index = move_apple_func.split(';')[1].split('(')[1].split(',')[0]
  move_latest_apple = move_apple_func.split(';')[0] + ';' + move_apple_func.split(';')[1].replace(array_index,"this.wa.ka.length-1") + ';'
  //console.log(move_latest_apple);
  move_func_name = move_latest_apple.split(';')[1].split('.')[1].split('(')[0]
  //console.log(move_func_name); // ${move_func_name}

  is_dimension = is_portal.replace('2', '11');
  is_soko = is_portal.replace('2', '9');
  is_key = is_portal.replace('2', '8');
  is_yinyang = is_portal.replace('2', '7');
  mode_check_func = is_yinyang.split('(')[0]; // ${mode_check_func}

  fruit_bowl_check = code.match(`21===[a-zA-Z0-9_$]{1,4}\.${settings_itself}\.[a-zA-Z0-9_$]{1,4}`)[0].split('.')[2]
  //console.log(fruit_bowl_check) // ${fruit_bowl_check}

  fruit_bowl_randomize = code.match(/21===[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}&&\([a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,4}\[[a-zA-Z0-9_$]{1,4}\]\.[a-zA-Z0-9_$]{1,4}=[a-zA-Z0-9_$]{1,4}/gm)[0].split('=')[4]
  //console.log(fruit_bowl_randomize) // ${fruit_bowl_randomize}

  fruit_bowl_visible = code.match(/if\([a-zA-Z0-9_$]{1,4}\(this\.[a-zA-Z0-9_$]{1,8},6\)&&!b\.[a-zA-Z0-9_$]{1,8}&&!this\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)/gm)[0].split('.')[2].split('&')[0];
  //console.log(fruit_bowl_visible) // ${fruit_bowl_visible}

  key_type = code.match(/[a-zA-Z0-9_$]{1,8}\(a\.[a-zA-Z0-9_$]{1,8},b.[a-zA-Z0-9_$]{1,8},b\.[a-zA-Z0-9_$]{1,8},b\.[a-zA-Z0-9_$]{1,8}\);/gm)[0].split('.')[3].split(',')[0]
  //console.log(key_type) //${key_type}
    dice_reset_code = `resetState=function\(a\){ ${expectedCount} = ${currentCount} = 3;
    ${typeStore} = [];
    if(${is_dimension}) {
      ${expectedCount} = ${currentCount} = 6;
    }`

    portal_match_index = "pmi"

    // this.wa.ka is "AppleArray" - very important
    add_apple_only = `new_apple = ${real_new_apple_func};
    new_apple.type = this.wa.ka[0].type;
    avoid_key_texture = this.wa.ka[0].${key_type};
    if(${is_key})
    {
      if(key_texture == avoid_key_texture)
      {
        key_texture = key_texture + 1;
      }
      new_apple.${key_type} = key_texture;
      key_texture = key_texture + 1;
    }
    //21 === this.${settings_itself}.${fruit_bowl_check} && (new_apple.type = ${fruit_bowl_randomize}(this.wa));
    this.wa.ka.push(new_apple);
    `

    add_portal_apples = `
    if(${typeStore}.length < 6)
    {
      temp_store = [];
      temp_length = ${typeStore}.length;
      for(i = 0; i<temp_length; i++){
        temp_store.push(${typeStore}[0]);
        ${typeStore}.splice(0,1);
      }
      used_types = []
      open_types = [0,1,2,3,5,7,8,10,11,12,17,18,23,24,26,29]
      for(i = 0; i<this.wa.ka.length; i++){
        used_types.push(this.wa.ka[i].type);
        index_in_open = open_types.indexOf(this.wa.ka[i].type);
        if (index_in_open > -1) {
          open_types.splice(index_in_open, 1);
        }
      }
      for(i = 0; i<open_types.length; i++){
        ${typeStore}.push(open_types[i]);
      }
      temp_length = temp_store.length;
      for(i = 0; i<temp_length; i++){
        ${typeStore}.push(temp_store[0]);
        temp_store.splice(0,1);
      }
      for(i = ${typeStore}.length - 1; i>=0; i--){
        temp_store.push(${typeStore}[i]);
        ${typeStore}.splice(i,1);
      }
      temp_store = Array.from(new Set(temp_store));
      for(i = temp_store.length-1; i>=0; i--){
        ${typeStore}.push(temp_store[i]);
        temp_store.splice(i,1);
      }
    }
    ${add_apple_only}
    new_apple.type = ${typeStore}[${typeStore}.length - 1];
    new_apple.__first = true;
    index1 = this.wa.ka.length-1;
    ${add_apple_only}
    new_apple.__first = false;
    new_apple.type = ${typeStore}[${typeStore}.length - 1];
    temp_type = ${typeStore}[${typeStore}.length - 1];
    ${typeStore}.splice(${typeStore}.length - 1,1);
    index2 = this.wa.ka.length-1;
    var index2 = 0 === index1 % 2 ? index1 + 1 : index1 - 1;
      if (21 === this.${settings_itself}.${fruit_bowl_check}){
          this.wa.ka[index1].type = ${typeStore}[${typeStore}.length - 1]; //${fruit_bowl_randomize}(this.wa);
          this.wa.ka[index2].type = this.wa.ka[index1].type;
      ${typeStore}.splice(${typeStore}.length - 1,1);
      }
      var Gx = 0 === this.wa.${settings_itself}.Aa && !${mode_check_func}(this.wa.${settings_itself}, 11);
      var et = this.${move_func_name}(index1, !1, null);
    second_index = first_index = 0;
    found_one = false;
    for(i = 0; i<this.wa.ka.length; i++){
      if(this.wa.ka[i].type === temp_type && !found_one){
        min_index = i;
        if(this.wa.ka[i].__first){
          first_index = i;
          found_one = true;
        } else{
          second_index = i;
          found_one = true;
        }
      } else if (this.wa.ka[i].type === temp_type && found_one){
        max_index = i;
        if(this.wa.ka[i].__first){
          first_index = i;
        }else{
          second_index = i;
        }
        break;
      }
    }

      if (${mode_check_func}(this.wa.${settings_itself}, 8) || ${mode_check_func}(this.wa.${settings_itself}, 9)){
      this.wa.ka.splice(max_index, 1);
      this.wa.ka.splice(min_index, 1);
    }
      else {
          var Hx = ${mode_check_func}(this.wa.${settings_itself}, 7) ? BL(this.wa.oa, this.wa.ka[first_index].pos) : null;
          var Nz = this.${move_func_name}(second_index, Gx, Hx);
      found_one = false;
      for(i = 0; i<this.wa.ka.length; i++){
        if(this.wa.ka[i].type === temp_type && !found_one){
          min_index = i;
          found_one = true;
        } else if (this.wa.ka[i].type === temp_type && !found_one){
          max_index = i;
          break;
        }
      }
          if(!(et && Nz)){
        this.wa.ka.splice(max_index, 1);
        this.wa.ka.splice(min_index, 1);
      }
      }
    `

    console.log("Adding dice count...");
    code = code.assertReplace(/case "count":/, `case "count": ${is_dice} = (d > 2) ? true : false; ${double_dice} = d === 4 ? 2 : 1; ${high_dice} = d === 5 ? 3 : 0;`)
    //code = code.assertReplace(/case "count":/, `case "count": d = 3; ${is_dice} = true;`)
    code = code.assertReplace(/resetState=function\(a\){/, dice_reset_code)

    console.log("Creating dice code...");
    dice_eaten_code = `if(${is_dice} && !(${is_poison_apple})) //  && !(${is_portal})
    {
      if(!${is_portal}) {
        ${mark_avoid_spawn}
        ${expectedCount} = ${expectedCount} - 1;
        ${currentCount} = ${currentCount} - 1;
        if(${expectedCount} === 0)
        {
          ${expectedCount} = Math.floor((Math.random() * 6 * ${double_dice}) + 1) + ${high_dice};
          if(${is_key}){
            ${expectedCount} = Math.floor((Math.random() * 5 * ${double_dice}) + 1) + ${high_dice};
            //console.log("Rolled Expected: " + ${expectedCount});
            key_texture = 0;
          }
          if(${is_soko}){
            ${expectedCount} = (${expectedCount} % 3 * ${double_dice}) + 1 + ${high_dice};
          }
          if(${is_dimension}) {
            ${expectedCount} = ${expectedCount} * 2;
          }
          ${move_apple_func}
          temp = ${should_spawn_res};
          ${currentCount} = 1;
          while (${currentCount} < ${expectedCount})
          {
            if(${is_dimension}) {
              this.flip();
            }
            new_apple = ${real_new_apple_func};
            new_apple.type = this.wa.ka[0].type;
            avoid_key_texture = this.wa.ka[0].${key_type};
            if(${is_key})
            {
              if(key_texture == avoid_key_texture)
              {
                key_texture = key_texture + 1;
              }
              if(key_texture == 5)
              {
                key_texture = 0;
              }
              new_apple.${key_type} = key_texture;
              key_texture = key_texture + 1;
            }
            21 === this.settings.${fruit_bowl_check} && (new_apple.type = ${fruit_bowl_randomize}(this.wa));
            this.wa.ka.push(new_apple);
            ${move_latest_apple}
            if(${should_spawn_res}){
              ${currentCount} = ${currentCount} + 1;
              ${move_latest_apple}
            }
            else {
              if(!(${is_key} || ${is_soko}))
              {
                ${expectedCount} = ${expectedCount} - 1;
              } else {
                ${currentCount} = ${currentCount} + 1;
              }
              this.wa.ka.splice(this.wa.ka.length-1, 1);
            }
          }
          if(${is_dimension}) {
            this.flip();
          }
          ${should_spawn_res} = temp;
        }
      }
      else //all the portal logic goes here
      {
        if(21 === this.settings.${fruit_bowl_check}){
          this.settings.${fruit_bowl_check}=20;
        }
        index_in_typeStore = ${typeStore}.indexOf(21);
        if (index_in_typeStore > -1) {
          ${typeStore}.splice(index_in_typeStore, 1);
        }
        ${expectedCount} = ${expectedCount} - 1;
        ${currentCount} = ${currentCount} - 1;
        //var ${portal_match_index} = 0 === ${array_index} % 2 ? ${array_index} + 1 : ${array_index} - 1; // Get matching apple for portal, I can't believe this works for CLT at all
        for(i = 0; i<this.wa.ka.length; i++){
          if(this.wa.ka[i].type === this.wa.ka[${array_index}].type && i !== ${array_index}){
            ${portal_match_index} = i;
            break;
          }
        }
        if(21 === this.settings.${fruit_bowl_check}) {
          //this.wa.ka[${array_index}].type = ${typeStore}[0]; //${fruit_bowl_randomize}(this.wa); // replace the fruit_bowl_randomize with your own function.
          //this.wa.ka[${portal_match_index}].type = this.wa.ka[${array_index}].type;
          //${typeStore}.splice(0, 1);
        }
        if (${is_key} || ${is_soko} || ${expectedCount} !== 0) {
            ${typeStore}.push(this.wa.ka[${array_index}].type);
            this.wa.ka.splice(Math.max(${array_index},${portal_match_index}), 1);
            this.wa.ka.splice(Math.min(${array_index},${portal_match_index}), 1);
        }
        else
        {
          ${spawn_portal}
          ${expectedCount} = Math.floor((Math.random() * 3 * ${double_dice}) + 1) + ${high_dice};
          ${currentCount} = 1;
          while(${currentCount} < ${expectedCount})
          {
            ${add_portal_apples}
            ${currentCount} = ${currentCount} + 1;
          }
        }
      }
    } else `

    fix_portal_extra_regex = new RegExp(/else this.wa.ka.splice\(/);
    fix_portal_extra_code = `else if(${is_dice} && ${is_portal})
    {
      //console.log("LMAO Avoided despawning an apple");
    } else this.wa.ka.splice(
    `

    console.log("Adding dice portal support...");

    code = code.assertReplace(fix_portal_extra_regex, fix_portal_extra_code);

    code = code.assertReplace(spawn_func_code, dice_eaten_code+spawn_func_code)

    //acutally_spawn_apple_regex = new RegExp(`if\\\(${should_spawn_res}\\\)[^]*?this.wa\\\)\\\);`,"gms")
    //acutally_spawn_apple_code = code.match(acutally_spawn_apple_regex)[0]
    //console.log("Actually spawn apple: " + acutally_spawn_apple_code)

    //console.log(dice_eaten_code);

    //console.log(code);
    code = code.assertReplace("ALL", "all")
    code = code.assertReplace(`\"--:--:---\"`, `\"==:==:===\"`)

    console.log("Done, enjoy Dice Mod!");

    return code;
}


window.DiceMod.runCodeAfter = function() {
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Dice Mod';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
