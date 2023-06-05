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
      'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
      'https://i.postimg.cc/t4bxfYzt/planeptune.png',
      'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
      'https://i.postimg.cc/C53WfD61/pacman.png',
      'https://i.postimg.cc/8PLc5bjq/sonic-theme.png',
      'https://i.postimg.cc/HLr5YJmb/modloader-icon.png',
      'https://i.postimg.cc/6Q2DyGbK/jungle.png',
  ]) document.querySelector('#theme').appendChild(uiImage(src));


    document.body.style.overflow = 'hidden';

    function i(src) {
      let img = new Image();
      img.src = src;
      img.crossOrigin = 'Anonymous';
      img.width = img.height = 47;
      return img;
    }

    function toggle_skull_func(){
      window.skull_toggle = !window.skull_toggle;
    }

    window.skull = i('https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png');
    window.px_skull = i('https://www.google.com/logos/fnbx/snake_arcade/pixel/px_trophy_10.png');
    window.ghost_skull = i('https://i.postimg.cc/DZqL146Z/poison-ghost.png');
    window.px_ghost_skull = i('https://i.postimg.cc/cLF34LtP/px-poison-ghost.png');

    window.skull_toggle = false;
    document.getElementsByClassName('TO4uAe wSwbef')[1].addEventListener('click', toggle_skull_func, false);

    window.distinct_soko_goal = new Image();
    window.distinct_soko_goal.src = 'https://i.postimg.cc/x11nt4Pb/box-distinct-soko-goals.png';
    window.distinct_soko_goal.currentSrc = 'https://i.postimg.cc/x11nt4Pb/box-distinct-soko-goals.png';
    window.distinct_soko_goal.crossOrigin = "Anonymous";

    window.distinct_soko_goal_px = new Image();
    window.distinct_soko_goal_px.src = 'https://i.postimg.cc/NFnWqP35/px-box-red.png';
    window.distinct_soko_goal_px.currentSrc = 'https://i.postimg.cc/NFnWqP35/px-box-red.png';
    window.distinct_soko_goal_px.crossOrigin = "Anonymous";

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

  //loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/Counter.js');
  //loadAndRunCodeSynchronous('http://127.0.0.1:5500/Counter.js');

  console.log("Enabling Pudding Mod");
  //window.Counter.runCodeBefore();

  // Counter stuff

  window.loadStatistics = function() {
    let stats = localStorage.getItem('inputCounterMod');
    if(stats === null) {
        stats = {
        visible: false,
        statShown: 'inputs',
        statDurationShown: 'game',
        inputs: {
            game: 0,
            session: 0,
            lifetime: 0
        },
        plays: {
            session: 0,
            lifetime: 0
        }
        };
    } else{
        stats = JSON.parse(stats);
    }
    //Make sure these get reset
    stats.inputs.game = 0;
    stats.inputs.session = 0;
    stats.plays.session = 0;
    if(stats.visible === null) {
        stats.visible =  true;
    }
    return stats;
}
window.stats = window.loadStatistics();
window.saveStatistics = function() {
    if(typeof stats !== 'undefined' &&
    typeof stats.statShown !== 'undefined' &&
    typeof stats.statDurationShown !== 'undefined' &&
    typeof stats.inputs !== 'undefined' &&
    typeof stats.plays !== 'undefined' &&
    typeof stats.inputs.game !== 'undefined' &&
    typeof stats.inputs.session !== 'undefined' &&
    typeof stats.inputs.lifetime !== 'undefined' &&
    typeof stats.plays.session !== 'undefined' &&
    typeof stats.plays.lifetime !== 'undefined' &&
    typeof stats.visible !== 'undefined'
    ) {
        localStorage.setItem('inputCounterMod', JSON.stringify(stats));
    }
}
window.updateCounterDisplay=function() {
    divList.innerHTML = stats[stats.statShown][stats.statDurationShown];
}
window.promptToResetStats=function() {
    let userResponse = prompt('Type DELETE to reset all stats. Cannot be undone');
    if(userResponse === 'DELETE') {
        localStorage.removeItem('inputCounterMod');
        loadStatistics();
        saveStatistics();
        updateCounterDisplay();
        alert('All stats have been reset');
    } else {
        alert('Did not reset all stats');
    }
}
window.promptToEditStatCount=function() {
    let userResponse = prompt(`Change the stat count for "${stats.statShown} - ${stats.statDurationShown}"? This won't change any of the other stats. Current value: ${stats[stats.statShown][stats.statDurationShown]}`, stats[stats.statShown][stats.statDurationShown]);
    userResponse = parseInt(userResponse,10);
    if(isNaN(userResponse)) {
      alert('Invalid - did not change stat count');
    } else {
      stats[stats.statShown][stats.statDurationShown] = userResponse;
      saveStatistics();
      updateCounterDisplay();
      alert(`Changed stat count to ${userResponse}`);
    }
}
window.showSettingsBox=function() {
    const settingsBox = document.getElementById('settings-popup');
    settingsBox.style.display = 'block';
}

window.hideSettingsBox=function() {
    const settingsBox = document.getElementById('settings-popup');
    settingsBox.style.display = 'none';
}

window.getStatIconImageSrc=function() {
    return stats.statShown === 'plays' ? 'https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png' : 'https://www.google.com/logos/fnbx/snake_arcade/keys.svg';
}
window.setuphtml=function() {
  const a = new Image();
  a.src = getStatIconImageSrc();
  a.id = 'stat-icon';
  a.width = a.height = 25;
  a.style = 'position:relative;left:475px;top:70px;';

  window.divList = document.createElement('div');
  divList.class = 'counter-num'
  divList.style = 'width:25px;position:relative;left:505px;top:45px;font-size:14px;font-family:Roboto,Arial,sans-serif;'
  divList.id = 'counter-num'

  document.getElementsByClassName('sEOCsb')[0].appendChild(a);
  document.getElementsByClassName('sEOCsb')[0].appendChild(divList);

  const c = new Image();
  c.src = 'https://i.postimg.cc/02xshYj1/index.png';
  c.width = c.height = 16;
  c.style = 'cursor:pointer;position:relative;left:-10px;top:30px;';
  c.id = 'input-counter-settings';

  const d = document.createElement('div');
  d.id = 'input-counter-settings-container';
  d.style = 'position:absolute;left:465px;top:45px;z-index:10000';
  document.getElementsByClassName('sEOCsb')[0].appendChild(d);
  const settingsElement = document.querySelector('#input-counter-settings-container');
  settingsElement.appendChild(c);

  const settingsBox = document.createElement('div');
  settingsBox.style = 'position:absolute;left:135px;z-index:10000;background-color:#111111;padding:8px;display:none;border-radius:3px;width:200px;';
  settingsBox.id = 'settings-popup';
  settingsBox.innerHTML = `
  <span style="color:white;font-family:Roboto,Arial,sans-serif;">Counter Settings</span><span class="settings-close" style="float:right;cursor:pointer">&times;</span>
  <select style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;" id="stat-chooser">
    <option value="inputGame">Game inputs</option>
    <option value="inputSession">Session inputs</option>
    <option value="inputLifetime">Lifetime inputs</option>
    <option value="playsSession">Session resets</option>
    <option value="playsLifetime">Lifetime resets</option>
  </select>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="edit-stat">Edit stat count</button>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="reset-stats">Reset all</button>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="toggle-counter">Toggle Visibility</button>
  <br>
  <span style="margin:3px;color:white;cursor:pointer;font-family:Roboto,Arial,sans-serif;" class="settings-close">Close</span>
  `;

  settingsElement.appendChild(settingsBox);

  let settingsToValues = {
    inputs: {
      game: 'inputGame',
      session: 'inputSession',
      lifetime: 'inputLifetime'
    },
    plays: {
      session: 'playsSession',
      lifetime: 'playsLifetime'
    }
  }

  let valuesToSettings = {
    inputGame:{stat: 'inputs',duration: 'game'},
    inputSession:{stat: 'inputs',duration: 'session'},
    inputLifetime:{stat: 'inputs',duration: 'lifetime'},
    playsSession:{stat: 'plays',duration: 'session'},
    playsLifetime:{stat: 'plays',duration: 'lifetime'},
  }

  //preselect based on saved settings
  document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

  //Listeners to hide/show settings box when clickng the cog, or the X
  document.querySelector('#input-counter-settings').addEventListener('click',showSettingsBox);
  const settingsCloseElements = document.getElementsByClassName('settings-close');
  settingsCloseElements[0].addEventListener('click',hideSettingsBox);
  settingsCloseElements[1].addEventListener('click',hideSettingsBox);

  document.getElementById('stat-chooser').onchange = function() {
    stats.statShown = valuesToSettings[this.value].stat;
    stats.statDurationShown = valuesToSettings[this.value].duration;
    document.getElementById('stat-icon').src = getStatIconImageSrc();
    updateCounterDisplay();
  }

  document.getElementById('edit-stat').addEventListener('click',promptToEditStatCount);
  document.getElementById('reset-stats').addEventListener('click',promptToResetStats);
  document.getElementById('toggle-counter').addEventListener('click',toggleCounter);
  }

  window.toggleCounter = function(){
      stats.visible = !stats.visible;
      if(stats.visible) {
          document.getElementById('stat-icon').style.display = 'inline';
          document.getElementById('counter-num').style.display = 'inherit';
      }
      else {
          document.getElementById('stat-icon').style.display = 'none';
          document.getElementById('counter-num').style.display = 'none';
      }
      saveStatistics();
  }

  window.setuphtml();

  if(stats.visible) {
      document.getElementById('stat-icon').style.display = 'inline';
      document.getElementById('counter-num').style.display = 'inherit';
  }
  else {
      document.getElementById('stat-icon').style.display = 'none';
      document.getElementById('counter-num').style.display = 'none';
  }

};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.PuddingMod.alterSnakeCode = function(code) {

  // Counter stuff

  console.log("Enabling Counter...")

  reset_regex = new RegExp(/;this\.reset\(\)/)
  counter_reset_code = `;stats.inputs.game = 0;
  stats.plays.session++;
  stats.plays.lifetime++;
  saveStatistics();
  updateCounterDisplay();this.reset();`

  code = code.assertReplace(reset_regex, counter_reset_code);

  input_counter_regex = new RegExp(/=function\(a,b\){if\(!/)
  input_counter_code =`=function\(a,b\){
      if(b !== a.direction) {
          stats.inputs.game++;
          stats.inputs.session++;
          stats.inputs.lifetime++;
          stats.statShown === 'inputs' && updateCounterDisplay();
        }
  if(!`
  code = code.assertReplace(input_counter_regex, input_counter_code);

  stop_regex = new RegExp(/stop=function\(a\){/)
  save_stats_code = `stop=function(a){saveStatistics();`

  code = code.assertReplace(stop_regex, save_stats_code);

  // Counter things done here

  function i(src) {
    let img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';
    img.width = img.height = 47;
    return img;
  }

  var new_fruit = [];

  new_fruit.push({ // Pudding 22
      "Normal":'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
      "Pixel":'https://i.postimg.cc/J72xMMYX/Pixel-Pudding170-Small.png',
      "Poison_values": 'b,\'#eaca23\',\'#909090\',10',
  });
  new_fruit.push({ // Blueberries 23
    "Normal":'https://i.postimg.cc/8cmVPfGd/blueberries.png',
    "Pixel":'https://i.postimg.cc/Hkh1xCqN/px-blueberries.png',
    "Poison_values": 'b,\'#2323ea\',\'#909090\',30',
  });
  new_fruit.push({ // Red Pepper 24
    "Normal":'https://i.postimg.cc/BQqHMbDc/redpepper.png',
    "Pixel":'https://i.postimg.cc/02BWLrzt/red-pepper-px.png',
    "Poison_values": 'b,\'#910a22\',\'#909090\',20',
  });
  new_fruit.push({ // Lime 25
    "Normal":'https://i.postimg.cc/k5kWcyFB/lime.png',
    "Pixel":'https://i.postimg.cc/8cqg53Jr/px-lime.png',
    "Poison_values": 'b,\'#93ef13\',\'#909090\',70',
  });
  new_fruit.push({ // Blacberries 26
    "Normal":'https://i.postimg.cc/hPTVGdNX/blackberries.png',
    "Pixel":'https://i.postimg.cc/RZTf7zS9/px-blackberries.png',
    "Poison_values": 'b,\'#000044\',\'#909090\',50',
  });
  new_fruit.push({ // Green Grapes 27
    "Normal":'https://i.postimg.cc/dQ78zXBm/green-grapes.png',
    "Pixel":'https://i.postimg.cc/J79bmqYw/px-green-grapes.png',
    "Poison_values": 'b,\'#93ef13\',\'#909090\',10',
  });
  new_fruit.push({ // Burger 28
    "Normal":'https://i.postimg.cc/13m2Cr16/burger.png',
    "Pixel":'https://i.postimg.cc/fW3Vjz67/px-burger.png',
    "Poison_values": 'b,\'#D99E82\',\'#D3D3D3\',40',
  });
  new_fruit.push({ // Cheese 29
    "Normal":'https://i.postimg.cc/zXD1z9d6/trophy-03.png',
    "Pixel":'https://i.postimg.cc/kMvmdnyW/px-trophy-03.png',
    "Poison_values": 'b,\'#eaca23\',\'#909090\',30',
});
new_fruit.push({ // Fries 30
  "Normal":'https://i.postimg.cc/YCMFFP1Q/french-fries.png',
  "Pixel":'https://i.postimg.cc/MKDTCpQj/px-fries.png',
  "Poison_values": 'b,\'#ffc107\',\'#909090\',30',
});
new_fruit.push({ // Hotdog 31
  "Normal":'https://i.postimg.cc/BbQf4Vgs/hotdog.png',
  "Pixel":'https://i.postimg.cc/xTcnz1kL/px-hotdog.png',
  "Poison_values": 'b,\'#9b441c\',\'#909090\',30',
});
new_fruit.push({ // Pizza 32
  "Normal":'https://i.postimg.cc/rwDXKnPj/pizza.png',
  "Pixel":'https://i.postimg.cc/1tY1RKYq/pixil-frame-0-5.png',
  "Poison_values": 'b,\'#FFCF86\',\'#909090\',30',
});
new_fruit.push({ // Pacman Ghost 33
  "Normal":'https://i.postimg.cc/TP7ZGZGf/pacman-ghost.png',
  "Pixel":'https://i.postimg.cc/BvtK8fxb/px-pacman-ghost.png',
  "Poison_values": 'b,\'#FFCF86\',\'#909090\',30',
});
new_fruit.push({ // Sonic Rings 34
  "Normal":'https://i.postimg.cc/pX1xYGp9/sonic-ring.png',
  "Pixel":'https://i.postimg.cc/BvzJqWhs/ring-1.png',
  "Poison_values": 'b,\'#FFCF86\',\'#909090\',30',
});
new_fruit.push({ // Steak 35
  "Normal":'https://i.postimg.cc/XYjC4zzf/steak.png',
  "Pixel":'https://i.postimg.cc/x16bC3wW/steak-px.png',
  "Poison_values": 'b,\'#D99E82\',\'#909090\',70',
});
new_fruit.push({ // Coconut 35
  "Normal":'https://i.postimg.cc/1XbSVygZ/coconut.png',
  "Pixel":'https://i.postimg.cc/qBF45x1Z/coconut-px.png',
  "Poison_values": 'b,\'#6d4c41\',\'#909090\',20',
});
new_fruit.push({ // These apples are shit 36
  "Normal":'https://i.postimg.cc/66719KfJ/poop.png',
  "Pixel":'https://i.postimg.cc/T2ZN1sty/poop-px.png',
  "Poison_values": 'b,\'#6d4c41\',\'#909090\',50',
});
new_fruit.push({ // Egg 37
  "Normal":'https://i.postimg.cc/ZRg1jkrg/egg.png',
  "Pixel":'https://i.postimg.cc/pd0Nh5yP/px-egg.png',
  "Poison_values": 'b,\'#e7dfa4\',\'#909090\',50',
});
new_fruit.push({ // Mango 38
  "Normal":'https://i.postimg.cc/R0NbYNSH/Mango.png',
  "Pixel":'https://i.postimg.cc/bNny7wv4/mango-px.png',
  "Poison_values": 'b,\'#fc8824\',\'#909090\',50',
});
new_fruit.push({ // Melon 39
  "Normal":'https://i.postimg.cc/8knkL3WN/melon.png',
  "Pixel":'https://i.postimg.cc/Qt8NqZ0x/pixel-melon.png',
  "Poison_values": 'b,\'#93ef13\',\'#909090\',50',
});
new_fruit.push({ // Musa Banana 40
  "Normal":'https://i.postimg.cc/3JsKcvnq/musa-banana.png',
  "Pixel":'https://i.postimg.cc/bwSh0wPR/pixel-musa-banana.png',
  "Poison_values": 'b,\'#910a22\',\'#909090\',50',
});
new_fruit.push({ // Pear 41
  "Normal":'https://i.postimg.cc/L6Y9DTBf/pear.png',
  "Pixel":'https://i.postimg.cc/RZp3PRWz/pixel-pear.png',
  "Poison_values": 'b,\'#93ef13\',\'#909090\',50',
});
new_fruit.push({ // Soccer Ball 42
  "Normal":'https://i.postimg.cc/C1yT8vjL/soccer-ball.png',
  "Pixel":'https://i.postimg.cc/kGDnkN00/pixel-soccer-ball.png',
  "Poison_values": 'b,\'#ffffff\',\'#909090\',100',
});
new_fruit.push({ // Jacko 43
  "Normal":'https://i.postimg.cc/rwMX5hbg/true-jacko.png',
  "Pixel":'https://i.postimg.cc/3wS84M1M/pixel-jacko.png',
  "Poison_values": 'b,\'#fc8824\',\'#909090\',25',
});


for (let index = 0; index < new_fruit.length; index++) {
  document.querySelector('#apple').appendChild(uiImage(new_fruit[index].Normal));
}

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

  if (code.match(/loaded_/) !== null) {
    console.log(code);
    console.log("Google experiment detected, please provide the above text to Yarmiplay by pressing copy ^^^");
    window.loaded_code = true;
  }
  else {
    window.loaded_code = false;
  }

  console.log("Starting to edit code...");

  // Regex for a function that sets the src for count (I think)
  settings_src_regex = new RegExp(/[a-zA-Z0-9_$]{1,8}=function\([a-zA-Z0-9_$]{1,8}\){""!==[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}&&\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}\);/)
  settings_var = code.match(settings_src_regex)[0].split('.')[0].split('=')[3] // This is usually "a", the variable the function gets, which has settings in it
  settings_itself = code.match(settings_src_regex)[0].split('.')[1] // This is either the word "settings" or whatever google replaced it with that's obfuscated
  settings_src = code.match(settings_src_regex)[0].split('.')[2].split('&')[0] // This is the [] part in a.settings.[] - which has an src link to an image in it
  // ${settings_itself}

  // Full function that sets the current fruit icon
  load_image_func = new RegExp(/if\("apple"===[a-zA-Z0-9_$]{1,8}\|\|"graphics"===[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}\),\n?[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}="https:\/\/www\.google\.com\/logos\/fnbx\/"\+\(1===[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}\?"snake_arcade\/pixel\/px_apple_"\+[a-zA-Z0-9_$]{1,8}\+"\.png":"snake_arcade\/v4\/apple_"\+[a-zA-Z0-9_$]{1,8}\+"\.png"\);/)

  // Get all required variables around src for endscreen
  settings_regex = new RegExp(`,\n?[a-zA-Z0-9_$]{1,8}\.${settings_itself}\.[a-zA-Z0-9_$]{1,8}`)
  settings_var = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[0].split(',')[1]
  settings_src = code.match(load_image_func)[0].match(settings_regex)[0].split('.')[2]
  select_fruit_numvar = code.match(load_image_func)[0].match(new RegExp(/\+.\+/))[0].split('+')[1]
  pixel_setting_regex = new RegExp(`case "graphics":[a-zA-Z0-9_$]{1,8}.${settings_itself}.[a-zA-Z0-9_$]{1,8}`);
  pixel_setting = code.match(pixel_setting_regex)[0].split('.')[2]
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

  ip_grabber = new RegExp(/=new [a-zA-Z0-9_$]{1,8}\(this.[a-zA-Z0-9_$]{0,8},\"snake_arcade\/v4\/apple_\"/)
  func_name = code.match(ip_grabber)[0].replace("=new ", "").replace(`\(this.${settings_itself},\"snake_arcade\/v4\/apple_\"`,"")
  ip_grabber2 = new RegExp(/[a-zA-Z0-9_$]{1,8}\(b,c.[a-zA-Z0-9_$]{1,8},c.target,c.threshold\)/)
  poison_convert = code.match(ip_grabber2)[0].split('(')[0] // replace('\(b,c.base,c.target,c.threshold\)',"") // This function is what makes the poison grey in poison mode
  array_grabber = new RegExp(/".png"\),c=[a-zA-Z0-9_$]{1,8}\[a\],/)
  array_name = code.match(array_grabber)[0].replace('".png"\),c=',"").replace('[a],',"")

  add_fruit_array_last_func_regex = new RegExp(/.threshold\),this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)/);

  fruit_array_name = code.match(add_fruit_array_last_func_regex)[0].split('.')[2] // ${fruit_array_name}
  volume_class = document.querySelector('img[src="//www.gstatic.com/images/icons/material/system/2x/volume_up_white_24dp.png"]').getAttribute("class")
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

// lots of hardcoded shit here, fix it later
// call to func2 is what makes pudding poison grey, double push is to make the pudding load later on, janky workaround but works so I'll take it
  console.log("Adding new fruit to stack...")
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

  load_pixelated_regex = new RegExp(/[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\&\&\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=\"https:\/\/www\.google\.com\/logos\/fnbx\/\"\+[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},"load",\n?function\(\){[a-zA-Z0-9_$]{1,8}\(a\)}\)\)}/gm)

  pixelated_switch = `switch(${Pr_a}.${Pr_pa}){ `;

  for (let index = 0; index < new_fruit.length; index++) {
    current_fruit = new_fruit[index].Normal;
    current_fruit_px = new_fruit[index].Pixel;
    pixelated_case_template = `
    case '${current_fruit_px}': ${Pr_a}.${Pr_ka}.src = '${current_fruit_px}'; break;`;
    pixelated_switch = pixelated_switch + pixelated_case_template;
  }


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

  console.log("Adding pixelated images...")
  code = code.assertReplace(load_pixelated_regex, new_pixelated_func);

  // Fixes a image calls
  console.log("Adding images...")
  code = code.assertReplace(shh_grabber, new_shh_line);

  // Gets the settings value that hold the src for count and apple, also the var it's held in is the same for both.
  get_count_val1 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[0].split(':')[1]
  get_count_val2 = code.match(/case "count":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  get_apple_val2 = code.match(/case "apple":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]
  get_speed_val2 = code.match(/case "speed":[a-zA-Z0-9_$]{1,4}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,4}/)[0].split('.')[2]

  /*light tiles
  dark tiles
  shadow
  border
  key block sign color
  top bar
  endscreen background*/
  console.log("Adding new themes...")

    // Settings topbar: zFl3vb
    // Settings background: wXSCdb
    // Settings buttons: FL0z2d

    window.ui_topbar = document.getElementsByClassName('zFl3vb');
    window.ui_background = document.getElementsByClassName('sXu3u');
    window.ui_buttons = document.getElementsByClassName('FL0z2d');
    window.ui_topbar.style = '';
    window.ui_background.style = '';
    window.ui_buttons.style = '';
    window.ui_sep = document.getElementsByClassName('e1XC2b');
    window.ui_sep.style = '';
    window.ui_bottom = document.getElementsByClassName('T7SB3d');
    window.ui_bottom.style = '';

    color_code = `
    for(let p of window.ui_sep) {
      let separators = sep_color;
      p.style.borderBottomColor = separators;
    }
    for(let h of window.ui_topbar){
      h.style.background = topbar_color;
    }
    for(let h of window.ui_buttons){
      h.style.background = buttons_color;
    }
    for(let h of window.ui_background){
      h.style.background = bg_color;
    }
    for(let h of window.ui_bottom){
      h.style.background = bottom_color;
    }
    `

  code = code.assertReplace(/case "theme":/, `case "theme":
  switch(d){
    case 0:
    window.snake.setCustomTheme('#aad751','#a2d149','#94bd46','#578a34','#38640e','#4a752c','#4dc1f9'); // Default Sun
    sep_color='#7eccfa';
    topbar_color='#3a91bb';
    buttons_color='#1155CC';
    bg_color=bottom_color='#4dc1f9';
    break;
    case 1:
    window.snake.setCustomTheme('#494351','#443e4c','#3d3644','#2c2730','#453d4d','#262428','#2a2640'); // Official Dark
    sep_color='#363438';
    topbar_color=buttons_color='#2c2730';
    bg_color=bottom_color='#262428';
    break;
    case 2:
    window.snake.setCustomTheme('#deeced','#d1e4e6','#b9d4d5','#879fa1','#506486','#75898a','#8cbfd9'); // Snow
    sep_color='#85999a';
    topbar_color=buttons_color='#879fa1';
    bg_color=bottom_color='#75898a';
    break;
    case 3:
    window.snake.setCustomTheme('#6e3535','#673232','#633131','#a33e3e','#642b2b','#762d2d','#292e4c'); // Volcano
    sep_color='#863d3d';
    topbar_color=buttons_color='#a33e3e';
    bg_color=bottom_color='#762d2d';
    break;
    case 4:
    window.snake.setCustomTheme('#f2d78c','#eccd79','#e6c770','#977b26','#594d26','#725e1d','#5fb7e3'); // Desert
    sep_color='#826e2d';
    topbar_color=buttons_color='#977b26';
    bg_color=bottom_color='#725e1d';
    break;
    case 5:
    window.snake.setCustomTheme('#3f5543','#3b4f3f','#334737','#253227','#354b38','#202822','#2b375a'); // Official Jungle
    sep_color='#303832';
    topbar_color=buttons_color='#253227';
    bg_color=bottom_color='#202822';
    break;
    case 6:
    window.snake.setCustomTheme('#b4d0f9','#a3c5f5','#94baf0','#275ba5','#11325f','#1d457c','#42a5f0'); // Pool
    sep_color='#2d558c';
    topbar_color='#275ba5';buttons_color='#1155CC';
    bg_color=bottom_color='#1d457c';
    break;
    case 7:
    window.snake.setCustomTheme('#432c68','#3d285d','#3a2956','#604096','#3f305a','#432a6f','#32224f'); // Space
    sep_color='#533a7f';
    topbar_color=buttons_color='#604096';
    bg_color=bottom_color='#432a6f';
    break;
    case 8:
    window.snake.clearCustomTheme(); // Random Globe
    sep_color='#7eccfa';
    topbar_color='#3a91bb';
    buttons_color='#1155CC';
    bg_color=bottom_color='#4dc1f9';
    break; // Randomize Globe Theme
    case 9: window.snake.setCustomTheme('#1D1D1D', '#161616', '#111111', '#000000', '#1D1D1D', '#111111', '#000000'); // True Dark
    sep_color='#212121';
    topbar_color=buttons_color='#000000';
    bg_color=bottom_color='#111111';
    break;
    case 10: window.snake.setCustomTheme('#5B50B0', '#6759B9', '#3F3478', '#110C30', '#5B50B0', '#090220', '#110C30'); // Planeptune
    sep_color='#191230';
    topbar_color=buttons_color='#090220';
    bg_color=bottom_color='#110C30';
    break;
    case 11: window.snake.setCustomTheme('#0050b0', '#0059b9', '#003478', '#000c30', '#0050b0', '#000220', '#000C30'); // Lastation
    sep_color='#101230';
    topbar_color=buttons_color='#000220';
    bg_color=bottom_color='#000c30';
    break;
    case 12: window.snake.setCustomTheme('#010101', '#000000', '#000000', '#0805c6', '#000000', '#000000', '#000C30'); // Pacman
    sep_color='#10104d';
    topbar_color=buttons_color='#111111';
    bg_color=bottom_color='#00003d';
    break;
    case 13: window.snake.setCustomTheme('#B25900', '#A05000', '#333333', '#124f00', '#0f81d8', '#2bb800', '#0f81d8'); // Sonic
    sep_color='#1f91e8';
    topbar_color=buttons_color='#124f00';
    bg_color=bottom_color='#0f81d8';
    break;
    case 14: let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {}; // ModLoader
    window.snake.setCustomTheme(
      advancedSettings.themeCol1 ?? '#1D1D1D',
      advancedSettings.themeCol2 ?? '#161616',
      advancedSettings.themeCol3 ?? '#111111',
      advancedSettings.themeCol4 ?? '#000000',
      advancedSettings.themeCol5 ?? '#1D1D1D',
      advancedSettings.themeCol6 ?? '#111111',
      advancedSettings.themeCol7 ?? '#000000');
    sep_color='#7eccfa';
    topbar_color='#3a91bb';
    buttons_color='#1155CC';
    bg_color=bottom_color='#4dc1f9';
    break;
    case 15: window.snake.setCustomTheme('#499D43', '#36982F', '#336E2B', '#335B36', '#37623C', '#476C42', '#13867E'); // Jungle
    sep_color='#47724C';
    topbar_color=buttons_color='#335B36';
    bg_color=bottom_color='#37623C';
    break;
  }
  ${color_code}
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

  // Create a new if statement that sets the count image whenever changes are made
  count_score = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "count").replaceAll(settings_src, Count_SRC).replaceAll(get_apple_val2, get_count_val2).replaceAll("pixel/px_", "v3/")

  // Adds loading for counts when starting the game
  console.log("Adding count detector at top bar...")
  count_score = count_score.split(')')[0].replace('||"graphics"===b','') + `){
    ${count_code}
    ${settings_var}.${settings_itself}.${Count_SRC} = count_img_arr[d];
  }

  `

  code = code.assertReplace(load_image_func, count_score + "$&");

  // Function that checks if count image is set, and sets it to a default of 1a if it's not set.
  check_count_undefined = `if(${settings_var}.${settings_itself}.${Count_SRC} in window){${settings_var}.${settings_itself}.${Count_SRC}="https://www.google.com/logos/fnbx/snake_arcade/v3/count_00.png";}`

  // Actually changes Top Bar fruit to multi count
  console.log("Updating top bar with count...")

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
  console.log("Replacing volume with speed...")
  volume_regex = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}\?\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_off_white_24dp.png\"\:\"\/\/www\.gstatic\.com\/images\/icons\/material\/system\/2x\/volume_up_white_24dp\.png\"\;/)
  code = code.assertReplace(volume_regex, `this.${settings_itself}.${Replace_Speed} ? this.${settings_itself}.${Replace_Speed} : "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" ;`)
  volume_src_regex = new RegExp(/[a-zA-Z0-9_$.]{1,7}=function\(\){this\.[a-zA-Z0-9_$]{1,8}=!this\.[a-zA-Z0-9_$]{1,8};this\.header\.[a-zA-Z0-9_$.]{1,7}\.src=/)

  speed_volume = code.match(load_image_func)[0].replaceAll("v4", "v3").replaceAll("apple", "speed").replaceAll(settings_src, Replace_Speed).replaceAll(get_apple_val2, get_speed_val2)
  speed_volume = speed_volume.replace(';', `,${volume_src}=${settings_var}.${settings_itself}.${Replace_Speed} == "https://www.google.com/logos/fnbx/snake_arcade/pixel/px_speed_00.png" ? "https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" : ${settings_var}.${settings_itself}.${Replace_Speed} ;`)

  speed_volume = speed_volume.split(')')[0].replace('||"graphics"===b','') + `){
    ${speed_code}
    ${settings_var}.${settings_itself}.${Replace_Speed} = speed_img_arr[d];
    ${volume_src}=speed_img_arr[d];
  }
  `

  // Add loading for speed when starting the game
  console.log("Adding speed detector...")
  code = code.assertReplace(load_image_func, speed_volume + "$&");

  // Endscreen related image loading for new fruit - pudding. Keep this last
  // Since it effect load_image_func in a way that would break the other code that relays on it !!
  console.log("Adding new fruit to endscreen...")
  code = code.assertReplace(load_image_func, code.match(load_image_func)[0].replaceAll(';',load_code_condensed));

  // Attempt to get info on which mode it is
  spawn_func_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},2\)\)var [a-zA-Z0-9_$]{1,8}=!0;else if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},\n?10\)&&[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=\n?!1;else{var [a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},6\)\|\|[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},7\);[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8},![a-zA-Z0-9_$]{1,8},null\)}/)

  spawn_func_code = code.match(spawn_func_regex)[0]

  is_portal = spawn_func_code.split('(')[1] + "(" + spawn_func_code.split(')')[0].split('(')[2] + ")"
  is_soko = is_portal.replace('2', '9').replace("this", "a");

  // The elegent piece of code that replace the grey pudding with the skull icon
  console.log("Making soko goals more distinct...")
  console.log("Adding poison trophy as poison apple (click on the trophy at the top bar to toggle)...")
//console.log(code)
  draw_skull_func = new RegExp(/return [a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8}\)\&\&a\.[a-zA-Z0-9_$]{1,8}\?a\.[a-zA-Z0-9_$]{1,8}\.canvas\:a\.[a-zA-Z0-9_$]{1,8}\.canvas},[a-zA-Z0-9_$]{1,8}=function\(\)/gm)
  new_draw_skull = code.match(draw_skull_func)[0].split("}")[0]
  get_pixel = new_draw_skull.split(' ')[1].split('&')[0]
  pudding_skull_xd = `
  if(!a.path.includes("key")){
  if(a.path.includes("box")){if(${get_pixel}){return window.distinct_soko_goal_px;}return window.distinct_soko_goal;}
  if(window.skull_toggle && !a.path.includes("box")){if(${get_pixel}){return window.px_skull;}return window.skull;}
  if(a.path.includes("ghost")){if(${get_pixel}){return window.px_ghost_skull;}return window.ghost_skull;}
  }
  ${code.match(draw_skull_func)[0].split("}")[0]};}
  ${code.match(draw_skull_func)[0].split("}")[1]}`

  code = code.assertReplace(draw_skull_func, pudding_skull_xd)

  gold_chance = `* 1000000) + 1) == 426017)` // ${gold_chance}
  super_chance = `* 10000000) + 1) == 4263017)` // ${super_chance}
  free_test = `* 10) + 1) == 6)` // ${free_test}

  apple_info_regex_improved = new RegExp(/[a-zA-Z0-9_$]{1,8}=function\(a,b,c\){a\.[a-zA-Z0-9_$]{1,8}\[b\]\.[a-zA-Z0-9_$]{1,8}=c;/)
  get_ka = code.match(apple_info_regex_improved)[0].split('.')[1].split('[')[0]
  get_pos = code.match(apple_info_regex_improved)[0].split('.')[2].split('=')[0]
  apple_info_regex = new RegExp(`a\.${get_ka}\\\[b\\\]\.${get_pos}`)
  //console.log(apple_info_regex)

  set_gold = `if(a.${get_ka}[b].type >= ${golden_index} - 1){a.${get_ka}[b].type = a.${get_ka}[b].old_type;}
  if(Math.floor((Math.random() ${gold_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index} - 1;}
  if(Math.floor((Math.random() ${super_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index};}
  $&`
  console.log("Adding 1 in a Million Golden Apple...")
  console.log("Adding 1 in a 10 Million Special Secret...")
  code = code.assertReplace(apple_info_regex, set_gold)

  snake_colors_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}[^]?=[^]?\[\["#4E7CF6","#17439F"\][^]*?\]\]/);
  yinyang_colors_regex = new RegExp(/\[5,4,7,7,1,2,0,3,9,8,0,14,15,15,11,12,17,16\]/)

  snake_colors = [];

snake_colors.push({ // Black 18
  "Icon":'https://i.postimg.cc/3x9SPxYJ/dark.png',
  "Colors":'["#222222","#000000"]',
  "YinYang": '9',
});
snake_colors.push({ // Neon Red 19
  "Icon":'https://i.postimg.cc/0yy5gnLg/red.png',
  "Colors":'["#FF0000","#FF0000"]',
  "YinYang": '21',
});
snake_colors.push({ // Neon Blue 20
  "Icon":'https://i.postimg.cc/dtvt6w6V/blue.png',
  "Colors":'["#0000FF","#0000FF"]',
  "YinYang": '6',
});
snake_colors.push({ // Neon Green 21
  "Icon":'https://i.postimg.cc/KvNcsw-pr/green.png',
  "Colors":'["#00FF00","#00FF00"]',
  "YinYang": '19',
});
snake_colors.push({ // White Black 22
  "Icon":'https://i.postimg.cc/RFRbz7k8/white-black.png',
  "Colors":'["#FFFFFF","#000000"]',
  "YinYang": '23',
});
snake_colors.push({ // Black White 23
  "Icon":'https://i.postimg.cc/vTZ281Mm/black-white.png',
  "Colors":'["#222222","#FFFFFF"]',
  "YinYang": '22',
});
snake_colors.push({ // Nep Purple 24
  "Icon":'https://i.postimg.cc/t4bxfYzt/planeptune.png',
  "Colors":'["#6759B9", "#5B50B0"]',
  "YinYang": '25',
});
snake_colors.push({ // Noire Blue 25
  "Icon":'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
  "Colors":'["#0059b9", "#0050b0"]',
  "YinYang": '24',
});
snake_colors.push({ // Pitch Black 26
  "Icon":'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
  "Colors":'["#000000","#000000"]',
  "YinYang": '9',
});
snake_colors.push({ // Purple Heart 27
  "Icon":'https://i.postimg.cc/8zCJj2JH/nep-color.png',
  "Colors":'["#ffaaff","#ff77ff"]',
  "YinYang": '24',
});
snake_colors.push({ // Brown 28
  "Icon":'https://i.postimg.cc/fLWFTZGj/brown-snake.png',
  "Colors":'["#964B00","#7B3F00"]',
  "YinYang": '6',
});
snake_colors.push({ // Extra Brown 29
  "Icon":'https://i.postimg.cc/nh5XvPCt/browner-snake.png',
  "Colors":'["#4B2D08","#1B1D08"]',
  "YinYang": '6',
});
snake_colors.push({ // Gold 30
  "Icon":'https://i.postimg.cc/qvWmwKmt/gold-snake.png',
  "Colors":'["#b59b1d","#947f19"]',
  "YinYang": '31',
});
snake_colors.push({ // Silver 31
  "Icon":'https://i.postimg.cc/jjNMFj9M/silver-snake.png',
  "Colors":'["#87868c","#555652"]',
  "YinYang": '30',
});
snake_colors.push({ // Dark Teal 32
  "Icon":'https://i.postimg.cc/mD2Cqq88/dark-teal.png',
  "Colors":'["#667da4","#4c5a73"]',
  "YinYang": '30',
});

  colors_build = code.match(snake_colors_regex)[0].replace(']]', ']');
  yinyang_colors_build = code.match(yinyang_colors_regex)[0].replace(']', '');

  document.querySelector('#color').removeChild(document.querySelector('#color').lastChild);

for (let index = 0; index < snake_colors.length; index++) {
  document.querySelector('#color').appendChild(uiImage(snake_colors[index].Icon));
  colors_build = colors_build + ',' + snake_colors[index].Colors;
  yinyang_colors_build = yinyang_colors_build + ',' + snake_colors[index].YinYang;

}
document.querySelector('#color').appendChild(uiImage('https://www.google.com/logos/fnbx/snake_arcade/v5/color_18.png'));

  colors_build = colors_build + ']';
  yinyang_colors_build = yinyang_colors_build + ']';

  console.log("Adding new snake colors...")

  code = code.assertReplace(snake_colors_regex, colors_build)
  code = code.assertReplace(yinyang_colors_regex, yinyang_colors_build)

  console.log("Fixing Twin All Timer...");

  all_regex = new RegExp(/\"ALL\"\);/);
  add_direction = `"ALL");
  ${twin_all_global}=true;
  `

  timer_update_regex = new RegExp(/&"NONE"!==this\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.direction/);
  ka_oa_fill = code.match(timer_update_regex)[0].split('.')[1] + '.' + code.match(timer_update_regex)[0].split('.')[2]
  twin_timer_update = `&("NONE"!==this.${ka_oa_fill}.direction||${twin_all_global})`

  code = code.assertReplace(all_regex, add_direction)
  code = code.assertReplace(timer_update_regex, twin_timer_update)

  console.log("Done, enjoy Pudding Mod!");

  //console.log(code)

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function() {
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Pudding Mod';
  if(window.loaded_code){
    modIndicator.textContent = 'Pudding Mod - Google Test Version';
  }
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
