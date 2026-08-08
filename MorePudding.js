window.Core = {};

window.Core.make = function () {

    /// Code inspired by fishes, aka copy-pasted
    window.uiImage = function (src) {
        let img = new Image();
        img.src = src;
        img.classList.add('DqMRee');
        img.classList.add('SsAred'); // Hardcoded, need to figure out what this is and how to make it dynamic or something.
        return img;
    };

    //document.body.style.overflow = 'hidden'; // Hide scroll bar

    window.escapeRegex = function (string) {
        return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    window.graphics_selected = 0;

    daily_button = document.querySelector('[jsname="Prvkrf"]');
    window.daily_challenge = false

    // Options for the Intersection Observer
    var options = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    // Callback function to handle intersection changes
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The element is now visible
                window.daily_challenge = false;
            }
        });
    }

    // Create an Intersection Observer
    var observer = new IntersectionObserver(handleIntersection, options);

    // Start observing the button
    observer.observe(daily_button);

    daily_button.addEventListener("click", function() {
        window.daily_challenge = true;
        window.first_time_call = true;
      });

}

window.Core.alterCode = function (code) {

    if (code.match(/loaded_/) !== null) {
        console.log(code);
        console.log("Google experiment detected, please provide the above text to Yarmiplay by pressing copy ^^^");
        window.loaded_code = true;
      }
      else {
        window.loaded_code = false;
      }

    return code;
}
window.Theme = {};

window.Theme.make = function () {

  // style for all pudding sidebar overlays
  window.puddingSidebarStyle = 'position:absolute;left:100%;z-index:10000;background-color:#4a752c;padding:8px;display:block;border-radius:3px;width:220px;height:584px;top:0px;';

  let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {};

  window.themes = [
    {
      name: 'Default Sun',
      light_tiles: '#aad751',
      dark_tiles: '#a2d149',
      shadow: '#94bd46',
      border: '#578a34',
      key_block_sign_color: '#38640e',
      real_top_bar: '#4a752c',
      endscreen_background: '#4dc1f9',
      sep_color: '#7eccfa',
      topbar_color: '#3a91bb',
      buttons_color: '#1155CC',
      bg_color: '#4dc1f9',
      bottom_color: '#4dc1f9'
    },
    {
      name: 'Official Dark',
      light_tiles: '#494351',
      dark_tiles: '#443e4c',
      shadow: '#3d3644',
      border: '#2c2730',
      key_block_sign_color: '#453d4d',
      real_top_bar: '#262428',
      endscreen_background: '#2a2640',
      sep_color: '#363438',
      topbar_color: '#111111',
      buttons_color: '#111111',
      bg_color: '#262428',
      bottom_color: '#262428'
    },
    {
      name: 'Snow',
      light_tiles: '#deeced',
      dark_tiles: '#d1e4e6',
      shadow: '#b9d4d5',
      border: '#879fa1',
      key_block_sign_color: '#506486',
      real_top_bar: '#75898a',
      endscreen_background: '#8cbfd9',
      sep_color: '#85999a',
      topbar_color: '#677f91',
      buttons_color: '#677f91',
      bg_color: '#75898a',
      bottom_color: '#75898a'
    },
    {
      name: 'Volcano',
      light_tiles: '#6e3535',
      dark_tiles: '#673232',
      shadow: '#633131',
      border: '#a33e3e',
      key_block_sign_color: '#642b2b',
      real_top_bar: '#762d2d',
      endscreen_background: '#292e4c',
      sep_color: '#863d3d',
      topbar_color: '#a33e3e',
      buttons_color: '#a33e3e',
      bg_color: '#762d2d',
      bottom_color: '#762d2d'
    },
    {
      name: 'Desert',
      light_tiles: '#f2d78c',
      dark_tiles: '#eccd79',
      shadow: '#e6c770',
      border: '#977b26',
      key_block_sign_color: '#594d26',
      real_top_bar: '#725e1d',
      endscreen_background: '#5fb7e3',
      sep_color: '#826e2d',
      topbar_color: '#977b26',
      buttons_color: '#977b26',
      bg_color: '#725e1d',
      bottom_color: '#725e1d'
    },
    {
      name: 'Official Jungle',
      light_tiles: '#3f5543',
      dark_tiles: '#3b4f3f',
      shadow: '#334737',
      border: '#253227',
      key_block_sign_color: '#354b38',
      real_top_bar: '#202822',
      endscreen_background: '#2b375a',
      sep_color: '#303832',
      topbar_color: '#253227',
      buttons_color: '#253227',
      bg_color: '#202822',
      bottom_color: '#202822'
    },
    {
      name: 'Pool',
      light_tiles: '#b4d0f9',
      dark_tiles: '#a3c5f5',
      shadow: '#94baf0',
      border: '#275ba5',
      key_block_sign_color: '#11325f',
      real_top_bar: '#1d457c',
      endscreen_background: '#42a5f0',
      sep_color: '#2d558c',
      topbar_color: '#275ba5',
      buttons_color: '#1155CC',
      bg_color: '#1d457c',
      bottom_color: '#1d457c'
    },
    {
      name: 'Space',
      light_tiles: '#432c68',
      dark_tiles: '#3d285d',
      shadow: '#3a2956',
      border: '#604096',
      key_block_sign_color: '#3f305a',
      real_top_bar: '#432a6f',
      endscreen_background: '#32224f',
      sep_color: '#533a7f',
      topbar_color: '#604096',
      buttons_color: '#604096',
      bg_color: '#432a6f',
      bottom_color: '#432a6f'
    },
    {
      name: "Globe",
      sep_color: '#7eccfa',
      topbar_color: '#3a91bb',
      real_top_bar: '#4a752c',
      buttons_color: '#1155CC',
      bg_color: '#4dc1f9',
      bottom_color: '#4dc1f9'
    },
    {
      name: 'True Dark',
      light_tiles: '#1D1D1D',
      dark_tiles: '#161616',
      shadow: '#111111',
      border: '#000000',
      key_block_sign_color: '#1D1D1D',
      real_top_bar: '#111111',
      endscreen_background: '#000000',
      sep_color: '#212121',
      topbar_color: '#000000',
      buttons_color: '#000000',
      bg_color: '#111111',
      bottom_color: '#111111'
    },
    {
      name: 'Planeptune',
      light_tiles: '#d0b4f9',
      dark_tiles: '#c5a3f5',
      shadow: '#ba94f0',
      border: '#5b27a5',
      key_block_sign_color: '#32115f',
      real_top_bar: '#451d7c',
      endscreen_background: '#a542f0',
      sep_color: '#6b37b5',
      topbar_color: '#5b27a5',
      buttons_color: '#5b27a5',
      bg_color: '#a542f0',
      bottom_color: '#a542f0'
    },
    {
      name: 'Lastation',
      light_tiles: '#0050b0',
      dark_tiles: '#0059b9',
      shadow: '#003478',
      border: '#000c30',
      key_block_sign_color: '#0050b0',
      real_top_bar: '#000220',
      endscreen_background: '#000C30',
      sep_color: '#101230',
      topbar_color: '#01055C',
      buttons_color: '#01055C',
      bg_color: '#000c30',
      bottom_color: '#000c30'
    },
    {
      name: 'Pacman',
      light_tiles: '#1D1D1D',
      dark_tiles: '#161616',
      shadow: '#000000',
      border: '#0805c6',
      key_block_sign_color: '#000000',
      real_top_bar: '#080576',
      endscreen_background: '#000000',
      sep_color: '#000000',
      topbar_color: '#0805c6',
      buttons_color: '#0605a6',
      bg_color: '#000000',
      bottom_color: '#000000'
    },
    {
      name: 'Sonic',
      light_tiles: '#B25900',
      dark_tiles: '#A05000',
      shadow: '#333333',
      border: '#124f00',
      key_block_sign_color: '#0f81d8',
      real_top_bar: '#2bb800',
      endscreen_background: '#0f81d8',
      sep_color: '#1f91e8',
      topbar_color: '#124f00',
      buttons_color: '#124f00',
      bg_color: '#0f81d8',
      bottom_color: '#0f81d8'
    },
    {
      name: 'Jungle',
      light_tiles: '#499D43',
      dark_tiles: '#36982F',
      shadow: '#336E2B',
      border: '#335B36',
      key_block_sign_color: '#36982F',
      real_top_bar: '#476C42',
      endscreen_background: '#13867E',
      sep_color: '#47724C',
      topbar_color: '#133B26',
      buttons_color: '#133B26',
      bg_color: '#37623C',
      bottom_color: '#37623C'
    },
    {
      name: 'Pudding',
      light_tiles: '#ffef4f',
      dark_tiles: '#ffdf3f',
      shadow: '#dfbf1f',
      border: '#a55229',
      key_block_sign_color: '#ffdf3f',
      real_top_bar: '#853209',
      endscreen_background: '#853209',
      sep_color: '#efcf2f',
      topbar_color: '#752209',
      buttons_color: '#752209',
      bg_color: '#dfbf1f',
      bottom_color: '#dfbf1f'
    },
    {
      name: 'Ice',
      light_tiles: '#57DDFF',
      dark_tiles: '#57D5F4',
      shadow: '#57B0C7',
      border: '#006080',
      key_block_sign_color: '#57D5F4',
      real_top_bar: '#00495C',
      endscreen_background: '#00E1E6',
      sep_color: '#10C1C6',
      topbar_color: '#00293C',
      buttons_color: '#00293C',
      bg_color: '#00B1B6',
      bottom_color: '#00B1B6'
    },
    {
      name: "ModLoader",
      light_tiles: advancedSettings.themeCol1 ?? '#1D1D1D',
      dark_tiles: advancedSettings.themeCol2 ?? '#161616',
      shadow: advancedSettings.themeCol3 ?? '#111111',
      border: advancedSettings.themeCol4 ?? '#000000',
      key_block_sign_color: advancedSettings.themeCol5 ?? '#1D1D1D',
      real_top_bar: advancedSettings.themeCol6 ?? '#111111',
      endscreen_background: advancedSettings.themeCol7 ?? '#000000',
      sep_color: '#7eccfa',
      topbar_color: '#3a91bb',
      buttons_color: '#1155CC',
      bg_color: '#4dc1f9',
      bottom_color: '#4dc1f9'
    }

  ];

  for (let src of [
    'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
    'https://i.postimg.cc/t4bxfYzt/planeptune.png',
    'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
    'https://i.postimg.cc/C53WfD61/pacman.png',
    'https://i.postimg.cc/8PLc5bjq/sonic-theme.png',
    'https://i.postimg.cc/6Q2DyGbK/jungle.png',
    'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
    'https://i.postimg.cc/1XqLvbhJ/Ice2.png',
    'https://i.postimg.cc/HLr5YJmb/modloader-icon.png',
    'https://i.postimg.cc/cCr9LrNZ/neptune-planet.png',
  ]) document.querySelector('#theme').appendChild(uiImage(src));

}

window.Theme.alterCode = function (code) {
  /*light tiles
    dark tiles
    shadow
    border
    key block sign color
    top bar
    endscreen background*/
  //console.log("Adding new themes")

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

  window.boot_button = document.getElementsByClassName('btn');
  window.boot_check = document.getElementsByClassName('form-check-input');
  window.boot_dropdown = document.getElementsByClassName('form-control');
  window.input_button = document.getElementsByClassName('input-button');

  window.real_topbar_color = "#4a752c";
  window.button_color = "#1155CC";

  // ChatGPT wrote this crap
  function getAttributesByName(themeName) {
    const theme = window.themes.find((theme) => theme.name === themeName);
    if (theme) {
      const { name, set_theme, ...attributes } = theme;
      return attributes;
    }
    return null; // Return null if theme doesn't exist
  }

  window.setTheme = function (theme_name) {

    loop_array = [
      { loop_on: window.ui_sep, attribute: "borderBottomColor", color: "sep_color" },
      { loop_on: window.ui_topbar, attribute: "background", color: "topbar_color" },
      { loop_on: window.ui_buttons, attribute: "background", color: "buttons_color" },
      { loop_on: window.input_button, attribute: "background", color: "buttons_color" },
      { loop_on: window.ui_background, attribute: "background", color: "bg_color" },
      { loop_on: window.ui_bottom, attribute: "background", color: "bottom_color" },
      { loop_on: window.boot_button, attribute: "backgroundColor", color: "buttons_color" },
      { loop_on: window.boot_check, attribute: "backgroundColor", color: "buttons_color" },
      { loop_on: window.boot_dropdown, attribute: "backgroundColor", color: "buttons_color" },
    ]

    const themeAttributes = getAttributesByName(theme_name);
    if (themeAttributes) {
      // Extract individual attribute values using destructuring
      // ChatGPT wrote this crap
      var {
        light_tiles,
        dark_tiles,
        shadow,
        border,
        key_block_sign_color,
        real_top_bar,
        endscreen_background,
        sep_color,
        topbar_color,
        buttons_color,
        bg_color,
        bottom_color,
      } = themeAttributes;
    }

    for (let element of loop_array) {
      for (let h of element["loop_on"]) {
        eval("h.style." + element["attribute"] + " = " + element["color"] + ";")
      }
    }

    document.getElementById('settings-popup-pudding').style.background = real_top_bar;
    document.getElementById('speedinfo-popup-pudding').style.background = real_top_bar;
    const portalPanel = document.getElementById('fruit-bowl-popup-pudding') || document.getElementById('portal-pairs-popup-pudding');
    if (portalPanel) {
      portalPanel.style.background = real_top_bar;
      portalPanel.style.backgroundColor = real_top_bar;
    }

    window.real_topbar_color = real_top_bar;
    window.button_color = buttons_color;

    if (theme_name != "Globe") {
      window.snake.setCustomTheme(light_tiles, dark_tiles, shadow, border, key_block_sign_color, real_top_bar, endscreen_background)
    }
    else {
      window.snake.clearCustomTheme();
    }

    if (localStorage.getItem('snakeChosenMod') === "VisibilityMod" || window.isVisi) {
      document.getElementById('delete-stuff-draggable').style.backgroundColor = border;
      document.getElementById('delete-stuff-draggable').style.borderColor = border;

      document.getElementById('drag-handle').style.borderColor = border;

      document.getElementById('visi-title').style.backgroundColor = real_top_bar;
      document.getElementById('visi-boxes').style.backgroundColor = real_top_bar;
      document.getElementById('flash-snake-timing').style.backgroundColor = buttons_color;

    }


  }

  window.getRandomThemeName = function getRandomThemeName() {
    const filteredThemes = window.themes.filter((theme) => theme.name !== 'Globe' && theme.name !== 'ModLoader');
    const randomIndex = Math.floor(Math.random() * filteredThemes.length);
    return filteredThemes[randomIndex].name;
  }

  window.randomTheme = false;

  code = code.assertReplace(/case "theme":/, `case "theme":
  if(d<window.themes.length){window.randomTheme = false;window.setTheme(window.themes[d].name);}
  else{window.randomTheme = true;window.setTheme(window.getRandomThemeName());};
  `)

  reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

  set_on_reset = `;
  if(window.randomTheme){window.setTheme(window.getRandomThemeName());}
  $&`
  code = code.assertReplace(reset_regex, set_on_reset)
  return code;
}
window.DistinctVisual = {};

window.DistinctVisual.make = function () {

    window.toggle_skull_func = function toggle_skull_func() {
        window.pudding_settings.Skull = !window.pudding_settings.Skull;
    }

    window.toggle_soko_goal = function toggle_soko_goal() {
        window.pudding_settings.SokoGoals = !window.pudding_settings.SokoGoals;
    }

    function i(src) {
        let img = new Image();
        img.src = src;
        img.crossOrigin = 'Anonymous';
        img.width = img.height = 128;
        return img;
    }

    window.skull = i('https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png');
    window.px_skull = i('https://www.google.com/logos/fnbx/snake_arcade/pixel/px_trophy_10.png');
    window.real_skull = i('https://i.postimg.cc/prstgqbL/poison-skull.png');
    window.ghost_skull = i('https://i.postimg.cc/DZqL146Z/poison-ghost.png');
    window.px_ghost_skull = i('https://i.postimg.cc/cLF34LtP/px-poison-ghost.png');

    // window.skull_toggle = false;
    // window.soko_toggle = true;

    window.distinct_soko_goal = new Image();
    window.distinct_soko_goal.src = 'https://i.postimg.cc/x11nt4Pb/box-distinct-soko-goals.png';
    window.distinct_soko_goal.currentSrc = 'https://i.postimg.cc/x11nt4Pb/box-distinct-soko-goals.png';
    window.distinct_soko_goal.crossOrigin = "Anonymous";

    window.distinct_soko_goal_px = new Image();
    window.distinct_soko_goal_px.src = 'https://i.postimg.cc/NFnWqP35/px-box-red.png';
    window.distinct_soko_goal_px.currentSrc = 'https://i.postimg.cc/NFnWqP35/px-box-red.png';
    window.distinct_soko_goal_px.crossOrigin = "Anonymous";

}

window.DistinctVisual.alterCode = function (code) {

    realism_draw = new RegExp(/function\(a,b\){switch.*{d/);
    catchError(realism_draw, code);
    realism_switch = code.match(realism_draw)[0];

    realism_path = new RegExp(/function\(a,b\){switch.*}}/);
    catchError(realism_path, code);
    last_path = code.match(realism_path)[0].split('.')[9].split('}')[0]

    get_graphics = realism_switch.split(':')[1].split(')')[0];

    window.drawing_apple = true;

    get_apple_stuff = new RegExp(/(?:let|const|var).*[a-zA-Z0-9_$]{1,8}\.canvas\:.*\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\);/)
    catchError(get_apple_stuff, code);
    poison_default = code.match(get_apple_stuff)[0]
    b_graphics = poison_default.split('(')[2].split(')')[0]

    get_apple_code = `
    if(window.pudding_settings.Skull){
        b.type = ${poison_default.split('?')[1].split('=')[1]} ? ${poison_default.split('<')[1].split('?')[0]} - 1 : b.type;
    }
    ${poison_default}
    `

    code = code.assertReplace(get_apple_stuff, get_apple_code)

    disable_real_grey = new RegExp(/\(f=[a-zA-Z0-9_$]{1,8}.[a-zA-Z0-9_$]{1,8}\)==null\|\|[a-zA-Z0-9_$]{1,8}\(f,b,c,-1\)/)
    catchError(disable_real_grey, code);
    real_grey = code.match(disable_real_grey)[0]
    real_grey_path = real_grey.split(')')[0].split('=')[1]

    new_grey_code = `
    if (${real_grey_path} && ${real_grey_path}.path.includes("poison-skull")) {
        ${real_grey.slice(0, -1).slice(0, -1).slice(0, -1)}0)
    }
    else {
        ${real_grey}
    }
    `

    code = code.assertReplace(disable_real_grey, new_grey_code)

    // Match only the box goal creation. v12 puts the sequence.png creation on the
    // same line just before it, which a greedy match swallows — that truncated the
    // rebuilt call and grabbed the sequence property instead of the box one.
    sokondeez = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}=new [a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},"[^"]*box[^"]*",\d+,this\.[a-zA-Z0-9_$]{1,8},"[^"]*"\)/)
    catchError(sokondeez, code);
    sokondeez_code = code.match(sokondeez)[0]

    sokondeez_nuts = `
    window.SokoRef=this;
    window.DefaultSokoGoal=${sokondeez_code};
    window.DistinctSokoFinal=${sokondeez_code.split('=')[1].split('"')[0]} "${window.distinct_soko_goal.src}" ${sokondeez_code.split('"')[2]} "${window.distinct_soko_goal_px.src}" ${sokondeez_code.split('"')[4]}
    `

    code = code.assertReplace(sokondeez, sokondeez_nuts)

    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

    set_on_reset = `;
    if (window.pudding_settings.SokoGoals) {
        window.SokoRef.${sokondeez_code.split('=')[0].split('.')[1]} = window.DistinctSokoFinal;
    }
    else {
        window.SokoRef.${sokondeez_code.split('=')[0].split('.')[1]} = window.DefaultSokoGoal;
    }
    $&`
    code = code.assertReplace(reset_regex, set_on_reset)

    return code;
}
window.Counter = {};

window.Counter.make = function () {
    window.loadStatistics = function () {
        let stats = localStorage.getItem('inputCounterMod');
        if (stats === null) {
            stats = {
                visible: true,
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
                },
                apples: {
                    session: 0,
                    lifetime: 0
                }
            };
        } else {
            stats = JSON.parse(stats);
        }

        if (typeof stats.apples === 'undefined') {
            stats.apples = {
                session: 0,
                lifetime: 0
            }
        }

        //Make sure these get reset
        stats.inputs.game = 0;
        stats.inputs.session = 0;
        stats.plays.session = 0;
        stats.apples.session = 0;
        stats.visible = true;

        stats.walls = {
            game: 0
        };

        stats.hide = {
            count: ""
        };

        return stats;
    }
    window.stats = window.loadStatistics();
    window.saveStatistics = function () {
        if (typeof stats !== 'undefined' &&
            typeof stats.statShown !== 'undefined' &&
            typeof stats.statDurationShown !== 'undefined' &&
            typeof stats.inputs !== 'undefined' &&
            typeof stats.plays !== 'undefined' &&
            typeof stats.inputs.game !== 'undefined' &&
            typeof stats.inputs.session !== 'undefined' &&
            typeof stats.inputs.lifetime !== 'undefined' &&
            typeof stats.plays.session !== 'undefined' &&
            typeof stats.plays.lifetime !== 'undefined' &&
            typeof stats.apples.session !== 'undefined' &&
            typeof stats.apples.lifetime !== 'undefined' &&
            typeof stats.visible !== 'undefined'
        ) {
            localStorage.setItem('inputCounterMod', JSON.stringify(stats));
        }
    }
    window.updateCounterDisplay = function () {
        divList.innerHTML = stats[stats.statShown][stats.statDurationShown];
    }
    window.promptToResetStats = function () {
        let userResponse = prompt('Type DELETE to reset all stats. Cannot be undone');
        if (userResponse === 'DELETE') {
            localStorage.removeItem('inputCounterMod');
            stats = {
                visible: true,
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
                },
                apples: {
                    session: 0,
                    lifetime: 0
                }
            };
            saveStatistics();
            updateCounterDisplay();
            alert('All stats have been reset');
        } else {
            alert('Did not reset all stats');
        }
    }

    window.promptToEditStatCount = function () {
        if (stats.statShown === 'hide' || stats.statShown === 'walls') {
            alert(`Not changing stat for "hide" or "walls"`)
            return;
        }
        let userResponse = prompt(`Change the stat count for "${stats.statShown} - ${stats.statDurationShown}"? This won't change any of the other stats. Current value: ${stats[stats.statShown][stats.statDurationShown]}`, stats[stats.statShown][stats.statDurationShown]);
        userResponse = parseInt(userResponse, 10);
        if (isNaN(userResponse)) {
            alert('Invalid - did not change stat count');
        } else {
            stats[stats.statShown][stats.statDurationShown] = userResponse;
            saveStatistics();
            updateCounterDisplay();
            alert(`Changed stat count to ${userResponse}`);
        }
    }

    window.getStatIconImageSrc = function () {
        switch (stats.statShown) {
            case 'hide':
                return "https://i.postimg.cc/bNFfLPCn/Empty.png"
            case 'walls':
                return "https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_01.png"
            case 'apples':
                return "https://www.google.com/logos/fnbx/snake_arcade/v3/apple_00.png"
            case 'plays':
                return "https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png"
            default:
                return "https://www.google.com/logos/fnbx/snake_arcade/keys.svg"
        }
    }

    window.setCounter = function () {
        //stats.visible = !stats.visible;
        if (stats.visible) {
            document.getElementById('stat-icon').style.display = 'inline';
            document.getElementById('counter-num').style.display = 'inherit';
            //document.getElementById('toggle-counter').innerHTML = 'Hide counter';
        }
        else {
            document.getElementById('stat-icon').style.display = 'none';
            document.getElementById('counter-num').style.display = 'none';
            //document.getElementById('toggle-counter').innerHTML = 'Show counter';
        }
        saveStatistics();
    }

}

window.Counter.alterCode = function (code) {

    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)
    window.wallCoords = [];

    counter_reset_code = `;stats.inputs.game = 0;
    stats.walls.game = 0;
    window.wallCoords = [];
    window.timeKeeper.playing = false;
    window.BootstrapHide();
    stats.plays.session++;
    stats.plays.lifetime++;
    window.timeKeeper.addAttempt(window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
    saveStatistics();
    stats.visible = true;
    if((window.CurrentModeNum != 1 && window.CurrentModeNum != 19) && stats.statShown == "walls"){
        stats.visible = false;
    }
    window.setCounter();
    updateCounterDisplay();
    $&`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, counter_reset_code);

    window.IncrementCounter = function(){

        if(!window.timeKeeper.playing)
        {
            window.timeKeeper.start();
            window.timeKeeper.playing = true;
        }

        stats.inputs.game++;
        stats.inputs.session++;
        stats.inputs.lifetime++;
        stats.statShown === 'inputs' && updateCounterDisplay();

    }


    document.addEventListener('keydown', (event)=> {
        if(!event.repeat)
        {
            if ((event.key === 'ArrowRight') || (event.code === 'KeyD')){
                window.IncrementCounter();
            }
            else if (event.key === 'ArrowLeft'|| (event.code === 'KeyA'))
            {
                window.IncrementCounter();
            }
            else if (event.key === 'ArrowDown'|| (event.code === 'KeyS'))
            {
                window.IncrementCounter();
            }
            else if (event.key === 'ArrowUp'|| (event.code === 'KeyW'))
            {
                window.IncrementCounter();
            }
        }
    }
      );




    stop_regex = new RegExp(/stop\(a\){/)
    catchError(stop_regex, code)
    save_stats_code = `stop\(a\){saveStatistics();`
    

    code = code.assertReplace(stop_regex, save_stats_code);

    wall_spawn_regex = new RegExp(/(?:let|const|var) [a-zA-Z0-9_$]{1,8}=\n?[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},this\.[a-zA-Z0-9_$]{1,8}\(null,5\)\);/gm)
    catchError(wall_spawn_regex, code)
    wall_pos = code.match(wall_spawn_regex)[0].split('=')[0].split(' ')[1]

    wall_counter_code = `${code.match(wall_spawn_regex)[0]}
    if(${wall_pos}){stats.walls.game++;
    window.wallCoords.push([${wall_pos}.x, ${wall_pos}.y]);
    updateCounterDisplay();}
    `
    if (window.NepDebug) {
        console.log("Wall thing: " + wall_pos)
        console.log("Wall thing 2: " + wall_counter_code)
    }
    code = code.assertReplace(wall_spawn_regex, wall_counter_code);
    

    window.coordinatesToBoardString = function coordinatesToBoardString(coordinates) {
        if(window.timeKeeper.getCurrentSetting("size") != 1)
            return false;

        // Initialize an array of 90 tiles, all initialized to '1' (empty)
        let board = Array(90).fill('1');

        // Set '2' (wall) for each coordinate in the list
        coordinates.forEach(coord => {
            let [x, y] = coord;
            let index = y * 10 + x; // Calculate the index in the 1D array
            board[index] = '2'; // Set '2' at the calculated index
        });

        // Join the array into a single string of 90 characters
        return board.join('');
    }

    let death_wall_icon = document.querySelector('[jsname="LpoWPe"]');

    death_wall_icon.addEventListener("click", function () {
        pattern_string = window.coordinatesToBoardString(window.wallCoords)
        if(pattern_string){
            navigator.clipboard.writeText("pattern " + pattern_string);
        }
    });
    

    return code;
}
window.TimeKeeper = {};

window.TimeKeeper.make = function () {

    /*
    storage:
    att-modeStr-count-speed-size : number of attempts of this mode
    25-modeStr-count-speed-size: {time: time of 25 score, date: date of 25 score, att: number of attempts that reached 25 score, sum: total time of all attempts that reached 25 score}
    50, 100 and ALL idem.
    H-modeStr-count-speed-size: {high: highscore of this mode, time: time of the highscore run, date: date of the highscore run, sum: total score of all attempts}
*/
    window.timeKeeper = {};
    window.timeKeeper.debug = false;
    //called on every apple
    window.timeKeeper.gotApple = function (time, score) {
        stats.apples.session++;
        stats.apples.lifetime++;
        updateCounterDisplay();
        if (window.pudding_settings.randomizeThemeApple) {
            window.setTheme(window.getRandomThemeName());
        }
        if(window.daily_challenge) {
            return;
        }
        if (window.timeKeeper.debug) {
            //console.log("got Apple %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        window.timeKeeper.lastAppleDate = new Date();
        window.timeKeeper.lastAppleTime = time;
        //save time
        if (score == 25 || score == 50 || score == 100) {
            if (window.timeKeeper.debug) {
                //console.log("Saving PB for %s Ticks, %s Apples", time, score);
            }
            window.timeKeeper.savePB(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
        }
    }

    //called when you get all apples
    window.timeKeeper.gotAll = function (time, score) {
        if(window.daily_challenge) {
            return;
        }
        if (window.timeKeeper.debug) {
            //console.log("got All %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        window.timeKeeper.savePB(time, "ALL", window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
    }

    //called when you're dead, every time.
    window.timeKeeper.death = function (time, score) {
        if (window.timeKeeper.debug) {
            //console.log("death %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        if (window.timeKeeper.playing) {
            window.timeKeeper.playing = false;
            window.timeKeeper.saveScore(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
        }
    }

    //called when you start gamed d
    window.timeKeeper.start = function () {
        if (window.timeKeeper.debug) {
            //console.log("start");
        }
        window.timeKeeper.playing = true;
        //save current settings
        window.timeKeeper.mode = window.timeKeeper.getCurrentMode();
        window.timeKeeper.count = window.timeKeeper.getCurrentSetting("count");
        window.timeKeeper.speed = window.timeKeeper.getCurrentSetting("speed");
        window.timeKeeper.size = window.timeKeeper.getCurrentSetting("size");
    }

    window.timeKeeper.getCurrentMode = function () {
        element = "";
        for (i of document.querySelectorAll('img')) {
            if (i.src.includes('random.png')) {
                element = i;
            }
        }
        counter = -1;
        modeStr = "";
        for (child of element.parentElement.parentElement.parentElement.children) {
            counter++;
            if (counter == 0) { continue; };
            if (child.firstElementChild.classList.length > 1 && child.firstElementChild.children.length > 0) {
                modeStr += "1";
            }
            else {
                modeStr += "0";
            }
        }

        let mode = window.timeKeeper.getCurrentSetting("trophy");
        let trophyCount = document.getElementById("trophy").children.length;
        if (mode != trophyCount - 1) {	//not on blender mode
            modeStr = "";
            // Bits cover every trophy except Classic (0) and Blender (last)
            for (t = 1; t < trophyCount - 1; t++) {
                if (t == mode) {
                    modeStr += "1";
                }
                else {
                    modeStr += "0";
                }
            }
        }
        return modeStr
    }

    //get the current setting, name = 'count', 'speed', 'size' or 'trophy'
    window.timeKeeper.getCurrentSetting = function (name) {
        let getSelectedIndex = function (name) {
            let elementList = document.getElementById(name);
            let number = 0;
            let classNames = [];
            let notUnique = "";
            for (element of elementList.children) {
                if (classNames.indexOf(element.className) == -1) {
                    classNames.push(element.className);
                }
                else {
                    notUnique = element.className;
                    break;
                }
            }
            for (element of elementList.children) {
                if (element.className != notUnique) {
                    return number;
                }
                number++;
            }
            return 0;
        }

        if(name != 'trophy'){
            return eval(window[name + '_var'])
        }

        return getSelectedIndex(name);
    }

    //save highscore
    window.timeKeeper.saveScore = function (time, score, mode, count, speed, size) {
        // count > 6 = beyond Tally (MoreMenu / custom); also skip MouseMode / Level Editor
        if (count > 6 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined') {
            return;
        }
        if (typeof (window.timeKeeper.lastAppleDate) == "undefined") {
            window.timeKeeper.lastAppleDate = new Date();
        }
        if (typeof (window.timeKeeper.lastAppleTime) == "undefined") {
            window.timeKeeper.lastAppleTime = time;
        }

        time = Math.floor(time);
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = "H" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        //if undefined, save new high
        if (typeof (storage[name]) == "undefined") {
            storage[name] = { "high": score, "time": window.timeKeeper.lastAppleTime, "date": window.timeKeeper.lastAppleDate, "sum": score };
        }
        else {
            //increase sum
            storage[name].sum += score;
            if (score > storage[name].high || (score == storage[name].high && time < storage[name].time)) {
                //save new pb
                storage[name].high = score;
                storage[name].time = window.timeKeeper.lastAppleTime;
                storage[name].date = window.timeKeeper.lastAppleDate;
            }
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //save 25, 50, 100 or 'ALL' score
    window.timeKeeper.savePB = function (time, score, mode, count, speed, size) {
        // count > 6 = beyond Tally (MoreMenu / custom); also skip MouseMode / Level Editor
        if (count > 6 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined') {
            return;
        }

        time = Math.floor(time);
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = score.toString() + "-" + mode + "-" + count + "-" + speed + "-" + size;

        //if undefined, save new pb
        if (typeof (storage[name]) == "undefined") {
            storage[name] = { "time": time, "date": new Date(), "att": 1, "sum": time };
        }
        else {
            //increase attempt
            if (typeof (storage[name].att) == "undefined") { storage[name].att = 0 };
            storage[name].att += 1;
            //increase sum
            if (typeof (storage[name].sum) == "undefined") { storage[name].sum = 0 };
            storage[name].sum += time;
            if (time < storage[name].time) {		//only pb when lower time then stored
                storage[name] = { "time": time, "date": new Date(), "att": storage[name].att, "sum": storage[name].sum };
            }
        }

        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //function to add attempt to localStorage
    window.timeKeeper.addAttempt = function (mode, count, speed, size) {
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = "att" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        if (typeof (storage[name]) == "undefined") {
            storage[name] = 1;
        }
        else {
            storage[name] += 1;
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setAttempts = function (attempts) {
        if (isNaN(attempts)) {
            //console.log(attempts.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = "att" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name] = attempts;
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setPB = function (time, score, attempts, average) {
        if (isNaN(time)) {
            //console.log(time.toString() + " is not a number!");
            return;
        }
        if (score != 25 && score != 50 && score != 100 && score != "ALL") {
            //console.log(score + " has to be 25, 50, 100 or \"ALL\"!");
            return;
        }
        if (isNaN(attempts)) {
            //console.log(attempts.toString() + " is not a number!");
            return;
        }
        if (isNaN(average)) {
            //console.log(average.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = score.toString() + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name].time = time;
        storage[name].date = new Date();
        storage[name].att = attempts;
        storage[name].sum = Math.round(average * attempts);
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setScore = function (highscore, time, average) {
        if (isNaN(highscore)) {
            //console.log(highscore.toString() + " is not a number!");
            return;
        }
        if (isNaN(time)) {
            //console.log(time.toString() + " is not a number!");
            return;
        }
        if (isNaN(average)) {
            //console.log(average.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = "H" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name].high = highscore;
        storage[name].time = time;
        storage[name].date = new Date();
        storage[name].sum = average * storage["att" + "-" + mode + "-" + count + "-" + speed + "-" + size];
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //generate storage if it doesn't exist, or import from old file format.
    window.timeKeeper.makeStorage = function () {
        let storage = localStorage.getItem("snake_timeKeeper");
        if (storage == null) {
            storage = {};
            storage["version"] = 2;

            //try to read version 1 to new storage type
            old_pbs = localStorage.getItem("snake_pbs");
            if (old_pbs != null) {
                old_pbs = JSON.parse(old_pbs);
                //console.log("Converting local storage to new storage type");
                for (mode = 0; mode < 20; mode++) {
                    modeStr = "00000000000000000000".split("");
                    if (mode != 0) {
                        modeStr[mode - 1] = '1';
                    }
                    modeStr = modeStr.join('');

                    for (count = 0; count < 5; count++) {
                        for (speed = 0; speed < 3; speed++) {
                            for (size = 0; size < 3; size++) {
                                for (let score of ["25", "50", "100", "ALL", "att"]) {
                                    let name = score + "-" + mode + "-" + count + "-" + speed + "-" + size;
                                    if (typeof (old_pbs[name]) != "undefined") {
                                        //console.log(name, old_pbs[name]);
                                        newName = score + "-" + modeStr + "-" + count + "-" + speed + "-" + size;
                                        storage[newName] = old_pbs[name];
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            storage = JSON.parse(storage);
        }

        // v2 (20-bit modeStr) -> v3 (21-bit): insert Bridge bit before Peaceful
        if (storage["version"] == 2) {
            const migrated = { version: 3 };
            for (const key of Object.keys(storage)) {
                if (key === "version") continue;
                const parts = key.split("-");
                if (parts.length >= 5 && /^[01]{20}$/.test(parts[1])) {
                    const modeStr = parts[1];
                    const newModeStr = modeStr.slice(0, 19) + "0" + modeStr.slice(19);
                    migrated[parts[0] + "-" + newModeStr + "-" + parts.slice(2).join("-")] = storage[key];
                } else {
                    migrated[key] = storage[key];
                }
            }
            storage = migrated;
        }

        if (storage["version"] != 3) {
            alert("Something went wrong with you localStorage!");
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.dialogActive = false;

    //generate and show the dialog
    window.timeKeeper.showDialog = function () {

        //make dialog
        window.timeKeeper.dialogActive = true;
        document.getElementById('time-keeper').innerHTML = 'Hide Details';

        //dialog = document.createElement("dialog");
        dialog = document.createElement("div");

        dialog.setAttribute("open", "");
        dialog.setAttribute("id", "timeKeeperDialog");

        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let modeStr = window.timeKeeper.getCurrentMode("size");
        //change modeStr to gamemode
        counter = 0
        var gamemode = "";
        for (t of modeStr) {
            if (t == 1) {
                if(window.isBridge){
                    switch (counter) {
                        case 0: gamemode += "Wall, "; break;
                        case 1: gamemode += "Portal, "; break;
                        case 2: gamemode += "Cheese, "; break;
                        case 3: gamemode += "Borderless, "; break;
                        case 4: gamemode += "Twin, "; break;
                        case 5: gamemode += "Winged, "; break;
                        case 6: gamemode += "YinYang, "; break;
                        case 7: gamemode += "Key, "; break;
                        case 8: gamemode += "Sokoban, "; break;
                        case 9: gamemode += "Poison, "; break;
                        case 10: gamemode += "Dimension, "; break;
                        case 11: gamemode += "Minesweeper, "; break;
                        case 12: gamemode += "Statue, "; break;
                        case 13: gamemode += "Light, "; break;
                        case 14: gamemode += "Shield, "; break;
                        case 15: gamemode += "Arrow, "; break;
                        case 16: gamemode += "Hotdog, "; break;
                        case 17: gamemode += "Magnet, "; break;
                        case 18: gamemode += "Gate, "; break;
                        case 19: gamemode += "Bridge, "; break;
                        case 20: gamemode += "Peaceful, "; break;
                        default: gamemode += "Unknown, "; break;
                    }
                }else{
                    switch (counter) {
                        case 0: gamemode += "Wall, "; break;
                        case 1: gamemode += "Portal, "; break;
                        case 2: gamemode += "Cheese, "; break;
                        case 3: gamemode += "Borderless, "; break;
                        case 4: gamemode += "Twin, "; break;
                        case 5: gamemode += "Winged, "; break;
                        case 6: gamemode += "YinYang, "; break;
                        case 7: gamemode += "Key, "; break;
                        case 8: gamemode += "Sokoban, "; break;
                        case 9: gamemode += "Poison, "; break;
                        case 10: gamemode += "Dimension, "; break;
                        case 11: gamemode += "Minesweeper, "; break;
                        case 12: gamemode += "Statue, "; break;
                        case 13: gamemode += "Light, "; break;
                        case 14: gamemode += "Shield, "; break;
                        case 15: gamemode += "Arrow, "; break;
                        case 16: gamemode += "Hotdog, "; break;
                        case 17: gamemode += "Magnet, "; break;
                        case 18: gamemode += "Gate, "; break;
                        case 19: gamemode += "Skip, "; break;
                        case 20: gamemode += "Peaceful, "; break;
                        default: gamemode += "Unknown, "; break;
                    }
                }
            }
            counter++;
        }
        if (gamemode == "") {
            gamemode = "Classic, ";
        }
        gamemode = gamemode.substring(0, gamemode.lastIndexOf(","));

        //add level information
        bold = document.createElement('u');
        textnode = document.createTextNode("Speed Info Details");
        bold.style = 'color:white;font-family:Roboto,Arial;'
        //textnode.style = 'color:white;font-family:Arial;'
        bold.appendChild(textnode);
        //buttonClose.style = 'color:white;background:black'; font-family:roboto;
        dialog.appendChild(bold);
        dialog.appendChild(document.createElement("br"));
        dialog.appendChild(document.createTextNode("Mode: " + gamemode));
        dialog.appendChild(document.createElement("br"));
        switch (count) {
            case 0: dialog.appendChild(document.createTextNode("1 Apple, ")); break;
            case 1: dialog.appendChild(document.createTextNode("3 Apples, ")); break;
            case 2: dialog.appendChild(document.createTextNode("5 Apples, ")); break;
            case 3: dialog.appendChild(document.createTextNode("10 Apples, ")); break;
            case 4: dialog.appendChild(document.createTextNode("Dice count, ")); break;
            case 5: dialog.appendChild(document.createTextNode("Bomb count, ")); break;
            case 6: dialog.appendChild(document.createTextNode("Tally count, ")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu Apples, ")); break;
        }
        switch (speed) {
            case 0: dialog.appendChild(document.createTextNode("Normal speed, ")); break;
            case 1: dialog.appendChild(document.createTextNode("Fast speed, ")); break;
            case 2: dialog.appendChild(document.createTextNode("Slow speed, ")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu speed, ")); break;

        }
        switch (size) {
            case 0: dialog.appendChild(document.createTextNode("Normal size")); break;
            case 1: dialog.appendChild(document.createTextNode("Small size")); break;
            case 2: dialog.appendChild(document.createTextNode("Large size")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu size")); break;
        }
        //dialog.style = 'border-radius: 10px;'

        //add stats
        dialog.appendChild(document.createElement("br"));
        dialog.appendChild(document.createElement("br"));
        storage = JSON.parse(localStorage["snake_timeKeeper"]);
        let totalAttempts = 0;

        for (let score of ["att", "25", "50", "100", "ALL", "H"]) {
            let name = score + "-" + modeStr + "-" + count + "-" + speed + "-" + size;
            if (typeof (storage[name]) != "undefined") {

                bold = document.createElement('span');
                switch (score) {
                    case "25": bold.appendChild(document.createTextNode("25 Apples:")); break;
                    case "50": bold.appendChild(document.createTextNode("50 Apples:")); break;
                    case "100": bold.appendChild(document.createTextNode("100 Apples:")); break;
                    case "ALL": bold.appendChild(document.createTextNode("All Apples:")); break;
                    case "att": bold.appendChild(document.createTextNode("Total Attempts: ")); break;
                    case "H": bold.appendChild(document.createTextNode("Highscore: ")); break;
                    default: break;
                }
                dialog.appendChild(bold);

                if (score == "att") {
                    totalAttempts = storage[name];
                    dialog.appendChild(document.createTextNode(totalAttempts));
                    dialog.appendChild(document.createElement("br"));
                }
                else if (score == "H") {
                    dialog.appendChild(document.createTextNode(storage[name].high));
                }

                dialog.appendChild(document.createElement("br"));

                if (score == "att")
                    continue;

                hours = Math.floor(storage[name].time / 3600000);
                minutes = String(Math.floor((storage[name].time-hours*3600000) / 60000)).padStart(2, "0");
                seconds = String(Math.floor((storage[name].time - minutes * 60000-hours*3600000) / 1000)).padStart(2, "0");
                mseconds = String(storage[name].time - minutes * 60000 - seconds * 1000-hours*3600000).padStart(3, "0");
                if(hours==0){
                    if (score != "H") {
                        dialog.appendChild(document.createTextNode("Best Time: " + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                        dialog.appendChild(document.createElement("br"));
                    }
                    else {
                        dialog.appendChild(document.createTextNode("Duration: " + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Average score: " + (Math.round(100 * (storage[name].sum / totalAttempts)) / 100).toString()));
                        dialog.appendChild(document.createElement("br"));
                    }
                    if (storage[name].att != undefined && storage[name].sum != undefined) {
                        let time = Math.floor(storage[name].sum / storage[name].att);
                        hours = Math.floor(storage[name].time / 3600000)
                        minutes = String(Math.floor((time - hours * 3600000) / 60000)).padStart(2, "0");
                        seconds = String(Math.floor((time - minutes * 60000-hours*3600000) / 1000)).padStart(2, "0");
                        mseconds = String(time - minutes * 60000 - seconds * 1000-hours*3600000).padStart(3, "0");
                        dialog.appendChild(document.createTextNode("Attempts to this point: " + storage[name].att));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Average: " + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                    }
                    dialog.appendChild(document.createElement("br"));
                }else{
                    if (score != "H") {
                        dialog.appendChild(document.createTextNode("Best Time: " + hours + ":" + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                        dialog.appendChild(document.createElement("br"));
                    }
                    else {
                        dialog.appendChild(document.createTextNode("Duration: " + hours + ":" + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Average score: " + (Math.round(100 * (storage[name].sum / totalAttempts)) / 100).toString()));
                        dialog.appendChild(document.createElement("br"));
                    }
                    if (storage[name].att != undefined && storage[name].sum != undefined) {
                        let time = Math.floor(storage[name].sum / storage[name].att);
                        hours = Math.floor(storage[name].time / 3600000)
                        minutes = String(Math.floor((time - hours * 3600000) / 60000)).padStart(2, "0");
                        seconds = String(Math.floor((time - minutes * 60000-hours*3600000) / 1000)).padStart(2, "0");
                        mseconds = String(time - minutes * 60000 - seconds * 1000-hours*3600000).padStart(3, "0");
                        dialog.appendChild(document.createTextNode("Attempts to this point: " + storage[name].att));
                        dialog.appendChild(document.createElement("br"));
                        dialog.appendChild(document.createTextNode("Average: " + hours + ":" + minutes + ":" + seconds + ":" + mseconds));
                        dialog.appendChild(document.createElement("br"));
                    }
                    dialog.appendChild(document.createElement("br"));
                }
            }
        }

        //buttonClose
        //dialog.appendChild(document.createElement("br"));
        buttonClose = document.createElement("button");
        buttonClose.appendChild(document.createTextNode("Close"));
        buttonClose.addEventListener("click", (e) => {
            window.timeKeeper.toggleDialog();
        });

        buttonClose.style = 'color:white;background-color:' + window.button_color+';';
        buttonClose.className = 'btn';
        dialog.appendChild(buttonClose);

        //buttonExport
        buttonExport = document.createElement("button");
        buttonExport.appendChild(document.createTextNode("Export"));
        buttonExport.addEventListener("click", function () {
            download("timeKeeper - " + new Date().toString() + ".txt", "To import: open snake -> open console -> paste the following:\nlocalStorage[\"snake_timeKeeper\"]='" + localStorage["snake_timeKeeper"] + "'");
        });
        //dialog.appendChild(buttonExport); // Disabled export button, I don't want this.

        //add dialog
        div = document.querySelector("body");
        dialog.setAttribute("style", "outline: none;border-radius: 10px;z-index:10100;background:"+window.real_topbar_color+";color:white;font-family:Roboto,Arial;");
        dialog.style.outline = "none";
        dialog.classList.add("custom-dialog");

        div.insertBefore(dialog, div.firstChild)


    };

    //Function to find the snake code, and apply changes.
    window.timeKeeper.setup = function () {
        //just make storage, this used to also alter snake code
        window.timeKeeper.makeStorage();
        return;
    }

    //console.log("Enabling TimeKeeper")
    window.timeKeeper.setup();

    window.timeKeeper.hideDialog = function () {
        //remove dialog when click on ok
        child = document.getElementById("timeKeeperDialog");
        child.parentElement.removeChild(child);
        window.timeKeeper.dialogActive = false;
        document.getElementById('time-keeper').innerHTML = 'Show Details';

    }

    window.timeKeeper.toggleDialog = function () {
        if (window.timeKeeper.dialogActive) {
            window.timeKeeper.hideDialog();
        }
        else {
            window.timeKeeper.showDialog();
        }
    }

    /*
    tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
    document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
        window.timeKeeper.toggleDialog();
    });
    TimerID = "yddQF"; // Inspect element on Timer and take jsname from it
    document.querySelector("div[jsname^=\"" + TimerID + "\"]").addEventListener("click", (e) => {
        window.timeKeeper.toggleDialog();
    });
    */
}

window.TimeKeeper.alterCode = function (code) {
    // TimeKeeper stuff start
    //change stepfunction to run gotApple(), gotAll() and death()

    // This is the full tick function
    func_regex = new RegExp(/tick\(\){[^\\]{1,4000}light=Math.max[\s\S]*?=function/)
    window.catchError(func_regex, code)
    let func = code.match(/tick\(\){[^\\]{1,4000}light=Math.max[\s\S]*?=function/)[0];
    StartOfNext = func.substring(func.lastIndexOf(";"), func.length);
    func = func.substring(0, func.lastIndexOf(";"));
    if (window.NepDebug) {
        console.log(func);
    }
    //let modeFunc = func.match(/1}\);[^%]{0,10}/)[0];
    //let modeFunc = func.match(/[a-zA-Z0-9$]{1,4}\([a-zA-Z0-9$]{1,4}.[a-zA-Z0-9$]{1,8},11\)&&/)[0];

    //modeFunc = modeFunc.substring(modeFunc.indexOf("(") + 1, modeFunc.lastIndexOf("("));
    //modeFunc = modeFunc.split('(')[0];
    //scoreFunc = func.match(/25\!\=\=this.[a-zA-Z0-9$]{1,4}/)[0]; // Need to figure this out
    scoreFuncVar = func.match(/[a-zA-Z0-9$]{1,4}\=\=\=\n?25/)[0].split('=')[0]; // Assuming he wanted just the "this.score"
    scoreFunc = func.match(`${window.escapeRegex(scoreFuncVar.replace('\n', ''))}=\n?this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1]
    ////console.log(scoreFunc)
    //scoreFunc = scoreFunc.substring(scoreFunc.indexOf("this."),scoreFunc.size);
    //timeFunc = func.match(/this.[a-zA-Z0-9$]{1,6}\*this.[a-zA-Z0-9$]{1,6}/)[0];
    // Now has weird vars that obfuscate, it's "this.ticks" * "this.{1,4}"
    timeFunc = func.match(/\([a-zA-Z0-9$]{1,6}\*[a-zA-Z0-9$]{1,6}\)/)[0];
    ticksVar = timeFunc.split('(')[1].split("*")[0];
    tickLengthVar = timeFunc.split("*")[1].split(')')[0];
    realTicks = func.match(`${escapeRegex(ticksVar)}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
    realTickLength = func.match(`${escapeRegex(tickLengthVar)}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
    realTimeFunc = `${realTicks}*${realTickLength}`;
    timeFunc = realTimeFunc;
    ////console.log(timeFunc)
    //ownFuncIndex = func.indexOf(func.match(/!1}\);\([^%]{0,10}/)[0])+5; // No idea how this ever worked
    ownFunc = "window.timeKeeper.gotApple(Math.floor(" + timeFunc + ")," + scoreFunc + ");"
    //func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex); // Cool but no, just going to insert before the if 25 50 100 instead
    if25_regex = new RegExp(/if\([a-zA-Z0-9$]{1,4}\=\=\=\n?25/)
    ownFuncIndex = func.indexOf(func.match(if25_regex)[0]);
    func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex);
    ////console.log(func);



    //change all apples to run gotAll()
    func = func.slice(0, func.indexOf("WIN.play()") + 11) + "window.timeKeeper.gotAll(Math.floor(" + timeFunc + ")," + scoreFunc + ")," + func.slice(func.indexOf("WIN.play()") + 11);

    death = func.match(/if\(this.[a-zA-Z0-9$]{1,4}\|\|this.[a-zA-Z0-9$]{1,4}\)/)[0];
    death = death.slice(death.indexOf("(") + 1, death.indexOf("|"));
    func = func.slice(0, func.indexOf("{") + 1) + "if(" + death + "){window.timeKeeper.death(Math.floor(" + timeFunc + ")," + scoreFunc + ");}" + func.slice(func.indexOf("{") + 1)
    //eval(func)

    code = code.assertReplace(func_regex, func + StartOfNext);

    ////console.log(code)

    //change start function to run gameStart() - The "start" here fails, but this section is required for the code to work -- not anymore, fixed it earlier.

    //func_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)
    //func = code.match(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)[0];
    //StartOfNext = func.substring(func.lastIndexOf(";"), func.length);
    //func = func.substring(0, func.lastIndexOf(";"));
    //step = timeFunc.substring(0, timeFunc.indexOf("*"));
    //step = "a" + step.slice(step.indexOf("."));

    //func = func.slice(0, func.indexOf("{") + 1) + "if(" + step + "==0){window.timeKeeper.start();}" + func.slice(func.indexOf("{") + 1);
    //eval(func)
    //code = code.assertReplace(func_regex, func + StartOfNext);

    //add eventhandler to click on time
    //let id = code.match(/function\(a\){if\(\!a.[a-zA-Z0-9]{1,4}&&[^"]*?"[^"]*?"/)[0];
    //id = id.substring(id.indexOf("\"")+1, id.lastIndexOf("\""));
    //let id = code.match(/"[^"]{1,9}"[^"]{1,200}"00:00:000/)[0]; // Whatever this crap gives is the wrong thing sadly
    //window.TimerID = id.substring(1, id.indexOf("\"",2));
    //document.querySelector("div[jsname^=\""+id+"\"]").addEventListener("click",(e)=>{
    //	window.timeKeeper.showDialog();
    //});

    // TimeKeeper stuff end
    ////console.log(code)
    // Counter stuff
    return code;
}
window.Fruit = {};

window.Fruit.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things
    window.new_fruit = [];

    new_fruit.push({ // Pudding
        "Normal": 'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
        "Pixel": 'https://i.postimg.cc/25nt4bX4/pudding-px.png',
        "Real": "https://i.postimg.cc/G2dDKJFp/pudding-real.png",
        "Poison_values": 'b,\'#eaca23\',\'#909090\',10',
    });
    new_fruit.push({ // Blueberries
        "Normal": 'https://i.postimg.cc/8cmVPfGd/blueberries.png',
        "Pixel": 'https://i.postimg.cc/Hkh1xCqN/px-blueberries.png',
        "Real": "https://i.postimg.cc/C19fhMVW/blueberries-real.png",
        "Poison_values": 'b,\'#2323ea\',\'#909090\',30',
    });
    new_fruit.push({ // Red Pepper
        "Normal": 'https://i.postimg.cc/BQqHMbDc/redpepper.png',
        "Pixel": 'https://i.postimg.cc/02BWLrzt/red-pepper-px.png',
        "Real": "https://i.postimg.cc/FHYFmYvp/real-red-pepper.png",
        "Poison_values": 'b,\'#910a22\',\'#909090\',20',
    });
    new_fruit.push({ // Lime
        "Normal": 'https://i.postimg.cc/k5kWcyFB/lime.png',
        "Pixel": 'https://i.postimg.cc/8cqg53Jr/px-lime.png',
        "Real": "https://i.postimg.cc/LXFmtS7M/lime-real.png",
        "Poison_values": 'b,\'#93ef13\',\'#909090\',70',
    });
    new_fruit.push({ // Green Grapes
        "Normal": 'https://i.postimg.cc/dQ78zXBm/green-grapes.png',
        "Pixel": 'https://i.postimg.cc/J79bmqYw/px-green-grapes.png',
        "Real": "https://i.postimg.cc/Ssknfc2d/green-grapes-real.png",
        "Poison_values": 'b,\'#93ef13\',\'#909090\',10',
    });
    new_fruit.push({ // Burger
        "Normal": 'https://i.postimg.cc/13m2Cr16/burger.png',
        "Pixel": 'https://i.postimg.cc/fW3Vjz67/px-burger.png',
        "Real": "https://i.postimg.cc/NjLY46Xk/burger-real.png",
        "Poison_values": 'b,\'#D99E82\',\'#D3D3D3\',40',
    });
    new_fruit.push({ // Cheese
        "Normal": 'https://i.postimg.cc/zXD1z9d6/trophy-03.png',
        "Pixel": 'https://i.postimg.cc/kMvmdnyW/px-trophy-03.png',
        "Real": "https://i.postimg.cc/BvK3WJM8/cheese-real.png",
        "Poison_values": 'b,\'#eaca23\',\'#909090\',30',
    });
    new_fruit.push({ // Fries
        "Normal": 'https://i.postimg.cc/YCMFFP1Q/french-fries.png',
        "Pixel": 'https://i.postimg.cc/MKDTCpQj/px-fries.png',
        "Real": "https://i.postimg.cc/cHBVZCYJ/fries-real.png",
        "Poison_values": 'b,\'#ffc107\',\'#909090\',30',
    });
    new_fruit.push({ // Hotdog
        "Normal": 'https://i.postimg.cc/bwYq44f1/hotdog.png',
        "Pixel": 'https://i.postimg.cc/zXFJt86J/px-trophy-17.png',
        "Real": "https://i.postimg.cc/Y0RcM953/hotdog-real.png",
        "Poison_values": 'b,\'#9b441c\',\'#909090\',30',
    });
    new_fruit.push({ // Pizza
        "Normal": 'https://i.postimg.cc/rwDXKnPj/pizza.png',
        "Pixel": 'https://i.postimg.cc/1tY1RKYq/pixil-frame-0-5.png',
        "Real": "https://i.postimg.cc/D0vyKmjv/pizza-real.png",
        "Poison_values": 'b,\'#FFCF86\',\'#909090\',30',
    });
    new_fruit.push({ // Steak
        "Normal": 'https://i.postimg.cc/J4n1dBsP/steak2.png',
        "Pixel": 'https://i.postimg.cc/cHmsNT56/steak-px.png',
        "Real": "https://i.postimg.cc/QxHZCjyX/steak-real.png",
        "Poison_values": 'b,\'#D99E82\',\'#909090\',70',
    });
    new_fruit.push({ // Coconut
        "Normal": 'https://i.postimg.cc/1XbSVygZ/coconut.png',
        "Pixel": 'https://i.postimg.cc/qBF45x1Z/coconut-px.png',
        "Real": "https://i.postimg.cc/25SY0gKJ/coconut-real.png",
        "Poison_values": 'b,\'#6d4c41\',\'#909090\',20',
    });
    new_fruit.push({ // These apples are shit
        "Normal": 'https://i.postimg.cc/66719KfJ/poop.png',
        "Pixel": 'https://i.postimg.cc/T2ZN1sty/poop-px.png',
        "Real": "https://i.postimg.cc/8c19z6kZ/poop-real.png",
        "Poison_values": 'b,\'#6d4c41\',\'#909090\',50',
    });
    new_fruit.push({ // Egg
        "Normal": 'https://i.postimg.cc/R0fR8mtv/egg.png',
        "Pixel": 'https://i.postimg.cc/pd0Nh5yP/px-egg.png',
        "Real": "https://i.postimg.cc/ncX0G22k/egg-real.png",
        "Poison_values": 'b,\'#e7dfa4\',\'#909090\',50',
    });
    new_fruit.push({ // Musa Banana
        "Normal": 'https://i.postimg.cc/3JsKcvnq/musa-banana.png',
        "Pixel": 'https://i.postimg.cc/bwSh0wPR/pixel-musa-banana.png',
        "Real": "https://i.postimg.cc/9QyN36bL/banana-musa.png",
        "Poison_values": 'b,\'#910a22\',\'#909090\',50',
    });
    new_fruit.push({ // Pear
        "Normal": 'https://i.postimg.cc/L6Y9DTBf/pear.png',
        "Pixel": 'https://i.postimg.cc/RZp3PRWz/pixel-pear.png',
        "Real": "https://i.postimg.cc/63dDtXTY/pear-real.png",
        "Poison_values": 'b,\'#93ef13\',\'#909090\',50',
    });
    new_fruit.push({ // Jacko
        "Normal": 'https://i.postimg.cc/rwMX5hbg/true-jacko.png',
        "Pixel": 'https://i.postimg.cc/Pfy42QXc/jacko-px.png',
        "Real": "https://i.postimg.cc/6qMfqtbw/jacko-real.png",
        "Poison_values": 'b,\'#fc8824\',\'#909090\',25',
    });
    new_fruit.push({ // Ice
        "Normal": 'https://i.postimg.cc/mrL8PJmK/ice.png',
        "Pixel": 'https://i.postimg.cc/hG2MTsw-v/ice-px.png',
        "Real": "https://i.postimg.cc/VLWDDqkh/ice-real.png",
        "Poison_values": 'b,\'#19ddf4\',\'#909090\',50',
    });
    new_fruit.push({ // Red Pudding
        "Normal": 'https://i.postimg.cc/15kNH2Y5/pudding-red.png',
        "Pixel": 'https://i.postimg.cc/C5rrFjzV/red-pudding-px.png',
        "Real": "https://i.postimg.cc/pTCF6hCJ/redpudding-real.png",
        "Poison_values": 'b,\'#ff3f3f\',\'#909090\',20',
    });
    new_fruit.push({ // Cabbage
        "Normal": 'https://i.postimg.cc/j59z8v1m/cabbage.png',
        "Pixel": 'https://i.postimg.cc/FR1ygwT0/cabbage-px.png',
        "Real": "https://i.postimg.cc/yd1GyLFv/cabbage-real.png",
        "Poison_values": 'b,\'#ff3f3f\',\'#909090\',20',
    });
    new_fruit.push({ // Heart
        "Normal": 'https://i.postimg.cc/8PGLRXCb/heart.png',
        "Pixel": 'https://i.postimg.cc/v8fW6wGB/pixel-heart.png',
        "Real": "https://i.postimg.cc/3NXmMmtp/real-heart.png",
        "Poison_values": 'b,\'#ff3f3f\',\'#909090\',20',
    });

    last_fruit_num = document.querySelector('#apple').children.length - 1;
    // Add fruit to menu
    for (let index = 0; index < new_fruit.length; index++) {
        document.querySelector('#apple').appendChild(uiImage(new_fruit[index].Normal));
    }

    // Secret fruit, can't be selected by menu
    // Order matters: Apple, Cherry, Strawberry, Carrot, Watermelon (then Skull)
    new_fruit.push({ // Golden Apple — 1 in 1m
        "Normal": 'https://i.postimg.cc/tJqR4tT6/gold-apple.png',
        "Pixel": 'https://i.postimg.cc/MGDg1gBQ/px-gold-apple.png',
        "Real": "https://i.postimg.cc/764WBzhL/golden-real.png",
        "Poison_values": 'b,\'#eaca23\',\'#909090\',20',
    });
    new_fruit.push({ // Golden Cherry — 1 in 5m
        "Normal": 'https://i.postimg.cc/sXDXkRP7/gold-cherry.png',
        "Pixel": 'https://i.postimg.cc/3RJRsHjG/px-gold-cherry.png',
        "Real": "https://i.postimg.cc/MTKTC80R/real-gold-cherry.png",
        "Poison_values": 'b,\'#eaca23\',\'#909090\',20',
    });
    new_fruit.push({ // Golden Strawberry — 1 in 10m
        "Normal": 'https://i.postimg.cc/CxLDtZkB/golden-strawberry.png',
        "Pixel": 'https://i.postimg.cc/9Q8TjWYx/px-golden-strawberry.png',
        "Real": "https://i.postimg.cc/tCzW2dZG/real-golden-strawberry.png",
        "Poison_values": 'b,\'#ff3f3f\',\'#909090\',20',
    });
    new_fruit.push({ // Golden Carrot — 1 in 50m
        "Normal": 'https://i.postimg.cc/g0Kjt0hv/gold-carrot.png',
        "Pixel": 'https://i.postimg.cc/yNTxpNRP/gold-px-carrot.png',
        "Real": "https://i.postimg.cc/s2JxH2Wm/gold-real-carrot.png",
        "Poison_values": 'b,\'#fc8824\',\'#909090\',20',
    });
    new_fruit.push({ // Golden Watermelon — 1 in 100m
        "Normal": 'https://i.postimg.cc/0NCjXNSc/gold-watermelon-1.png',
        "Pixel": 'https://i.postimg.cc/25xy95Wx/gold-px-watermelon-1.png',
        "Real": "https://i.postimg.cc/k5yGY5Sw/gold-real-watermelon-1.png",
        "Poison_values": 'b,\'#93ef13\',\'#909090\',20',
    });

    // Only used for Distinct Poison Skulls

    new_fruit.push({ // Skull
        "Normal": 'snake_arcade/v12/trophy_10.png',
        "Pixel": 'snake_arcade/pixel/px_trophy_10.png',
        "Real": "https://i.postimg.cc/prstgqbL/poison-skull.png",
        "Poison_values": 'b,\'#000000\',\'#000000\',0',
    });


}

window.Fruit.alterCode = function (code) {

    // Code to alter snake code here

    // Regex for a function that sets the src for count (I think)
    settings_src_regex = new RegExp(/[a-zA-Z0-9_$]{1,8}=function\([a-zA-Z0-9_$]{1,8}\){[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{0,8}\.[a-zA-Z0-9_$]{1,8}!==""&&/)
    settings_var = code.match(settings_src_regex)[0].split('.')[0].split('{')[1] // This is usually "a", the variable the function gets, which has settings in it
    settings_itself = code.match(settings_src_regex)[0].split('.')[1] // This is either the word "settings" or whatever google replaced it with that's obfuscated
    settings_src = code.match(settings_src_regex)[0].split('.')[2].split('!')[0] // This is the [] part in a.settings.[] - which has an src link to an image in it
    // ${settings_itself}

    get_graphics = new RegExp(/case "graphics":/);
    code = code.assertReplace(get_graphics, "$& window.graphics_selected=")
    get_fruit = new RegExp(/case "apple":/);
    code = code.assertReplace(get_fruit, "$& window.fruit_selected=")
    fruit_image = code.match(/\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}=`/gm)[0].split('(')[1].split('=')[0]

    new_realism_code = `
    if(window.fruit_selected >= ${last_fruit_num + 1}){
        fruit_index = window.fruit_selected - ${last_fruit_num + 1};
        switch (window.graphics_selected) {
            default:
            case 0:
                window.current_fruit_img = window.new_fruit[fruit_index].Normal;
                break;
            case 1:
                window.current_fruit_img = window.new_fruit[fruit_index].Pixel;
                break;
            case 2:
                window.current_fruit_img = window.new_fruit[fruit_index].Real;
        }
                
        ${fruit_image} = window.current_fruit_img;
        document.querySelector('[jsname="Jesp7b"]').src = window.current_fruit_img;
    }
    `
    
    rude_insert = new RegExp(/trophy_\${b}\.png`}`\)}/gm);
    code = code.assertReplace(rude_insert, "trophy_\${b}\.png`}`\); " + `${new_realism_code}` + " }");

    deathscreen_fruit = new RegExp(`\\(a.[a-zA-Z0-9_$]{1,8},${fruit_image}\\);`, 'g')
    code.match(deathscreen_fruit).forEach(element => {
        code.assertReplace(element, element + new_realism_code);
    });
    
    image_check = new RegExp(/b!==a\.src&&\(a\.src=b\)/gm)
    code = code.assertReplace(image_check, code.match(image_check)[0] + new_realism_code.replace(`${fruit_image} = window.current_fruit_img;`, ''))

    // Derive fruit ctor + image-cache prop (v11: S6/oa, v12: c7/ka — this.oa is the fruit array on v12)
    get_apple_make_func = new RegExp(/for\(a=0;a<24;a\+\+\)b=new ([a-zA-Z0-9_$]{1,8})\(this\.[a-zA-Z0-9_$]{1,8},[\s\S]*?,1,this\.([a-zA-Z0-9_$]{1,8}),/)
    apple_make_match = code.match(get_apple_make_func)
    func_name = apple_make_match[1]
    image_cache_name = apple_make_match[2]
    ip_grabber2 = new RegExp(/[a-zA-Z0-9_$]{1,8}\(b,c.[a-zA-Z0-9_$]{1,8},c.target,c.threshold\)/)
    poison_convert = code.match(ip_grabber2)[0].split('(')[0] // This function is what makes the poison grey in poison mode
    array_grabber = new RegExp(/c=[a-zA-Z0-9_$]{1,8}\[a\]/)
    array_name = code.match(array_grabber)[0].replace('c=', "").replace('[a]', "")

    add_fruit_array_last_func_regex = new RegExp(/.threshold\),this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)/);

    fruit_array_name = code.match(add_fruit_array_last_func_regex)[0].split('.')[2] // ${fruit_array_name}
    golden_index = `window.goldenIndex`

    add_fruit = `$&;this.${fruit_array_name}.push(b); // Add dummy for randomizer
  `
    for (let index = 0; index < window.new_fruit.length; index++) {
        current_fruit = window.new_fruit[index].Normal;
        current_fruit_px = window.new_fruit[index].Pixel;
        current_fruit_real = window.new_fruit[index].Real;
        current_fruit_poison_values = window.new_fruit[index].Poison_values; // ${current_fruit_poison_values}
        add_fruit_template = `
    b=new ${func_name}(this.${settings_itself},"${current_fruit}",1,this.${image_cache_name},"${current_fruit_px}","${current_fruit_real}");
    ${poison_convert}(${current_fruit_poison_values});
    this.${fruit_array_name}.push(b);`
        add_fruit = add_fruit + add_fruit_template;
    }


    add_gold = `
  ${golden_index} = this.${fruit_array_name}.length - 6; // Golden Apple (first of 5 secrets; Skull is last)
  `

    add_fruit = add_fruit + add_gold;

    // lots of hardcoded shit here, fix it later
    // call to func2 is what makes pudding poison grey, double push is to make the pudding load later on, janky workaround but works so I'll take it
    //console.log("Adding new fruit to stack")
    code = code.assertReplace(add_fruit_array_last_func_regex, add_fruit);

    // Too lazy to clean this code, it's "good enough" to leave untouched for now
    // Basically, adds an if statement anywhere fruit image is search to compensate for pudding existing
    // The if statements are janky and get be condensed
    // This fixes errors in console but doesn't "change" anything in-game
    shh_grabber = new RegExp(/[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.src=`https:\/\/www.google.com\/logos\/fnbx\/\${a\.path}`/);
    firstvar_name = code.match(shh_grabber)[0].split('.')[0];
    Hr_name = code.match(shh_grabber)[0].split('.')[1];

    new_shh_line = "if(" + firstvar_name + ".path.includes(\"postimg\"))" + firstvar_name + "." + Hr_name + ".src=" + firstvar_name + ".path;else $&";

    code = code.assertReplace(shh_grabber, new_shh_line);

    // Secret fruit rarities (checked later → rarer overwrites if both hit)
    gold_chance = `* 1000000) + 1) == 426017)` // Apple 1m
    cherry_chance = `* 5000000) + 1) == 421017)` // Cherry 5m
    super_chance = `* 10000000) + 1) == 4263018)` // Strawberry 10m
    carrot_chance = `* 50000000) + 1) == 4263019)` // Carrot 50m
    melon_chance = `* 100000000) + 1) == 4263217)` // Watermelon 100m

    apple_info_regex_improved = new RegExp(/[a-zA-Z0-9_$]{1,8}=function\(a,b,c\){a\.[a-zA-Z0-9_$]{1,8}\[b\]\.[a-zA-Z0-9_$]{1,8}=c;/)
    get_ka = code.match(apple_info_regex_improved)[0].split('.')[1].split('[')[0]
    get_pos = code.match(apple_info_regex_improved)[0].split('.')[2].split('=')[0]
    apple_info_regex = new RegExp(`a\.${get_ka}\\\[b\\\]\.${get_pos}`)

    // goldenIndex = Apple; +1 Cherry; +2 Strawberry; +3 Carrot; +4 Watermelon
    set_gold = `if(a.${get_ka}[b].type >= ${golden_index} && a.${get_ka}[b].type <= ${golden_index} + 4){a.${get_ka}[b].type = a.${get_ka}[b].old_type;}
    if(Math.floor((Math.random() ${gold_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index};}
    if(Math.floor((Math.random() ${cherry_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index} + 1;}
    if(Math.floor((Math.random() ${super_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index} + 2;}
    if(Math.floor((Math.random() ${carrot_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index} + 3;}
    if(Math.floor((Math.random() ${melon_chance}{a.${get_ka}[b].old_type = a.${get_ka}[b].type; a.${get_ka}[b].type = ${golden_index} + 4;}
    $&`
    code = code.assertReplace(apple_info_regex, set_gold)

    return code;
}
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
  size_ref = code.match(size_regex)[0].split('.')[2]

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
window.SnakeColor = {};

window.SnakeColor.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things

}

window.SnakeColor.alterCode = function (code) {
try{
    // Code to alter snake code here
    snake_colors_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}[^]?=[^]?\[\["#4E7CF6","#17439F"\][^]*?\]\]/);
    yinyang_colors_regex = new RegExp(/\[5,4,7,7,1,2,0,3,9,8,0,14,15,15,11,\n?12,17,16\]/)

    snake_colors = [];

    snake_colors.push({ // Black 18
        "Icon": 'https://i.postimg.cc/3x9SPxYJ/dark.png',
        "Colors": '["#222222","#000000"]',
        "YinYang": '9',
    });
    snake_colors.push({ // Neon Red 19
        "Icon": 'https://i.postimg.cc/0yy5gnLg/red.png',
        "Colors": '["#FF0000","#FF0000"]',
        "YinYang": '21',
    });
    snake_colors.push({ // Neon Blue 20
        "Icon": 'https://i.postimg.cc/dtvt6w6V/blue.png',
        "Colors": '["#0000FF","#0000FF"]',
        "YinYang": '6',
    });
    snake_colors.push({ // Neon Green 21
        "Icon": 'https://i.postimg.cc/KvNcsw-pr/green.png',
        "Colors": '["#00FF00","#00FF00"]',
        "YinYang": '19',
    });
    snake_colors.push({ // White Black 22
        "Icon": 'https://i.postimg.cc/RFRbz7k8/white-black.png',
        "Colors": '["#FFFFFF","#000000"]',
        "YinYang": '23',
    });
    snake_colors.push({ // Black White 23
        "Icon": 'https://i.postimg.cc/vTZ281Mm/black-white.png',
        "Colors": '["#222222","#FFFFFF"]',
        "YinYang": '22',
    });
    snake_colors.push({ // Nep Purple 24
        "Icon": 'https://i.postimg.cc/t4bxfYzt/planeptune.png',
        "Colors": '["#6759B9", "#5B50B0"]',
        "YinYang": '25',
    });
    snake_colors.push({ // Noire Blue 25
        "Icon": 'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
        "Colors": '["#0059b9", "#0050b0"]',
        "YinYang": '24',
    });
    snake_colors.push({ // Pitch Black 26
        "Icon": 'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
        "Colors": '["#000000","#000000"]',
        "YinYang": '9',
    });
    snake_colors.push({ // Purple Heart 27
        "Icon": 'https://i.postimg.cc/8zCJj2JH/nep-color.png',
        "Colors": '["#ffaaff","#ff77ff"]',
        "YinYang": '24',
    });
    snake_colors.push({ // Brown 28
        "Icon": 'https://i.postimg.cc/fLWFTZGj/brown-snake.png',
        "Colors": '["#964B00","#7B3F00"]',
        "YinYang": '6',
    });
    snake_colors.push({ // Extra Brown 29
        "Icon": 'https://i.postimg.cc/nh5XvPCt/browner-snake.png',
        "Colors": '["#4B2D08","#1B1D08"]',
        "YinYang": '6',
    });
    snake_colors.push({ // Gold 30
        "Icon": 'https://i.postimg.cc/qvWmwKmt/gold-snake.png',
        "Colors": '["#b59b1d","#947f19"]',
        "YinYang": '31',
    });
    snake_colors.push({ // Silver 31
        "Icon": 'https://i.postimg.cc/jjNMFj9M/silver-snake.png',
        "Colors": '["#87868c","#555652"]',
        "YinYang": '30',
    });
    snake_colors.push({ // Dark Teal 32
        "Icon": 'https://i.postimg.cc/mD2Cqq88/dark-teal.png',
        "Colors": '["#667da4","#4c5a73"]',
        "YinYang": '30',
    });
    snake_colors.push({ // Hotpink 33
        "Icon": 'https://i.postimg.cc/HLgZb9pz/hotpink.png',
        "Colors": '["#bd2862","#a72356"]',
        "YinYang": '34',
    });
    snake_colors.push({ // Navy Blue 34
        "Icon": 'https://i.postimg.cc/wMZFMhfh/navy-blue.png',
        "Colors": '["#000080","#000080"]',
        "YinYang": '33',
    });

    colors_build = code.match(snake_colors_regex)[0].replace(']]', ']');
    yinyang_colors_build = code.match(yinyang_colors_regex)[0].replace(']', '');

    document.querySelector('#color').removeChild(document.querySelector('#color').lastChild);

    for (let index = 0; index < snake_colors.length; index++) {
        document.querySelector('#color').appendChild(uiImage(snake_colors[index].Icon));
        colors_build = colors_build + ',' + snake_colors[index].Colors;
        yinyang_colors_build = yinyang_colors_build + ',' + snake_colors[index].YinYang;

    }

    window.regularColors = document.querySelector('#color').children.length;

    window.rainbowAlts = {
        0: { name: "Default Rainbow", set: ['#4E7CF6', '#5499C7', '#AF7AC5', '#E74C3C', '#F39C12', '#CCC31C', '#27AE60',], icon: "https://www.google.com/logos/fnbx/snake_arcade/v5/color_10.png", yinyang: 10 },
        1: { name: "Pride", set: ['#e40303', '#ff8c00', '#ffed00', '#008026', '#004dff', '#750787',], icon: "https://i.postimg.cc/htQpV5jn/pride.png", yinyang: 8 },
        2: { name: "Bisexual", set: ['#D60270','#D60270', '#9B4F96', '#0038A8','#0038A8',], icon: "https://i.postimg.cc/L6xjhB3p/bi.png", yinyang: 5 },
        3: { name: "Transgender", set: ['#55CDFC','#55CDFC', '#ffffff','#ffffff', '#F7A8B8','#F7A8B8',], icon: "https://i.postimg.cc/qqWqCLQm/trans.png", yinyang: 9 },
        4: { name: "Pansexual", set: ['#FF1B8D', '#FF1B8D', '#FFDA00','#FFDA00', '#1BB3FF','#1BB3FF',], icon: "https://i.postimg.cc/FH3d32M0/pan.png", yinyang: 5 },
        5: { name: "Asexual", set: ['#000000', '#a3a3a3', '#ffffff', '#810082',], icon: "https://i.postimg.cc/6QCPs5DT/asexual.png", yinyang: 4 },
        6: { name: "Aromantic", set: ['#3AA63F', '#A8D47A', '#FFFFFF', '#AAAAAA', '#000000',], icon: "https://i.postimg.cc/L6fQgs8D/aromantic.png", yinyang: 4 },
        7: { name: "Intersex", set: ['#FFDA00','#FFDA00', '#7A00AC','#7A00AC',], icon: "https://i.postimg.cc/D04Y7rZQ/intersex.png", yinyang: 3 },
        8: { name: "Lesbian", set: ['#D62900', '#FF9B55', '#FFFFFF', '#D461A6', '#A50062',], icon: "https://i.postimg.cc/sfBVMbGm/lesbian.png", yinyang: 1 },
        9: { name: "Non-binary", set: ['#000000', '#fff433', '#ffffff', '#9b59d0',], icon: "https://i.postimg.cc/gk2kYrqw/nonbinary.png", yinyang: 3 },
        10: { name: "Monochrome", set: ['#808080', '#9E9E9E', '#808080', '#616161',], icon: "https://i.postimg.cc/QNw9nQr8/monochrome.png", yinyang: 0 },
        11: { name: "Catalonia", set: ['#0f47af', '#ffffff', '#0f47af' ,'#ffd700', '#cc0000', '#ffd700', '#cc0000'], icon: "https://i.postimg.cc/HLNtB0mF/catalonia-Snake.png", yinyang: 10 },
    }

    for (var j = 1; j < Object.keys(window.rainbowAlts).length; j++) {
        document.querySelector('#color').appendChild(uiImage(window.rainbowAlts[j].icon));
    }

    window.allColorsLength = document.querySelector('#color').children.length;

    //console.log(document.querySelector('#color').children.length)

    // Add the rainbow snake color option back
    document.querySelector('#color').appendChild(uiImage('https://www.google.com/logos/fnbx/snake_arcade/v5/color_18.png'));

    colors_build = colors_build + ']';
    yinyang_colors_build = yinyang_colors_build + ']';

    //console.log("Adding new snake colors")
    catchError(snake_colors_regex, code)
    catchError(yinyang_colors_regex, code)

    code = code.assertReplace(snake_colors_regex, colors_build)
    code = code.assertReplace(yinyang_colors_regex, yinyang_colors_build)

    if (window.rainbowSnake === undefined) {
        window.rainbowSnake = ['#4E7CF6', '#5499C7', '#AF7AC5', '#E74C3C', '#F39C12', '#CCC31C', '#27AE60',];
    }
    if (window.rainbowYinYang === undefined) {
        window.rainbowYinYang = ['#808080', '#9E9E9E', '#808080', '#616161',];
    }

    default_rainbow_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}[^]?=[^]?"#4E7CF6 #5499C7 #AF7AC5 #E74C3C #F39C12 #CCC31C #27AE60"\.split\(" "\)/)
    default_rainbow_array = code.match(default_rainbow_regex)[0].split('=')[0]

    yinyang_rainbow_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}[^]?=[^]?\["#808080","#9E9E9E","#808080","#616161"\]/)
    yinyang_rainbow_array = code.match(yinyang_rainbow_regex)[0].split('=')[0]

    window.isRainbow = false;

    color_regex = new RegExp(/case "color"\:/)
    color_get_code = `case "color":
    window.isRainbow = false;
    window.randomColor = d==window.allColorsLength ? true : false;
    if(d!=window.allColorsLength && (d==10 || d>window.regularColors-1)){
        if(d!=10){window.snakeRainbowOverride = (d - (window.regularColors)) + 1;}
        else{window.snakeRainbowOverride=0}
        window.isRainbow = true;
    }`
    catchError(color_regex, code)

    code = code.assertReplace(color_regex, color_get_code);

    rainbow_usage_regex = new RegExp(`{var [a-zA-Z0-9_$]{1,6}\\\=[a-zA-Z0-9_$]{1,6}\\\?[a-zA-Z0-9_$]{1,6}\\:${window.escapeRegex(default_rainbow_array)}\\\;`)
    catchError(rainbow_usage_regex, code)
    if (window.NepDebug) {
        console.log(code.match(rainbow_usage_regex)[0])
    }

    window.snakeRainbowOverride = 0;

    rainbow_code = `{
    ${default_rainbow_array} = window.rainbowAlts[window.snakeRainbowOverride].set;
    ${yinyang_rainbow_array} = window.rainbowAlts[window.rainbowAlts[window.snakeRainbowOverride].yinyang].set;
    ${code.match(rainbow_usage_regex)[0].split('{')[1]}
    `

    code = code.assertReplace(rainbow_usage_regex, rainbow_code)

    // https://www.google.com/logos/fnbx/snake_arcade/v5/color_10.png

    snake_face_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,6}=?=?=?1?0?\?\([a-zA-Z0-9_$]{1,6}\.[a-zA-Z0-9_$]{1,6}=[a-zA-Z0-9_$]{1,6}\[0\]\[0\]/)
    catchError(snake_face_regex, code)
    snake_face_code = code.match(snake_face_regex)[0]
    snake_face_code = `window.isRainbow ? ${code.match(snake_face_regex)[0].split('?')[1].split('=')[0]}= window.isRainbow ? window.rainbowAlts[window.snakeRainbowOverride].set[0] : ${code.match(snake_face_regex)[0].replace("===10","").split('?')[1].split('=')[1]}`

    //console.log(snake_face_code)
    code = code.assertReplace(snake_face_regex, snake_face_code)
    //code = code.assertReplace(/a\.Yd=qN\[0\]\[1\];/, `a.Yd=10 === a.settings.Aa ? window.rainbowAlts[window.snakeRainbowOverride].set[0] : qN[0][1];`)
    //code = code.assertReplace(code.match(`${default_rainbow_array}\\\[0\\\]`)[0], `window.rainbowAlts[window.snakeRainbowOverride].set[0]`)
    //console.log(code)
    // ["#4E7CF6","#17439F"]
    //code = code.assertReplace(/0===a\.settings\.Aa\|\|/, "")
    //code = code.assertReplace(/0===a\.settings\.Aa\|\|/, "")
    //code = code.assertReplace(/\["#4E7CF6","#17439F"\]/, `["#FFFFFF","#FFFFFF"]`)

    snake_face2_reg = new RegExp(/\|\|1?0?=?=?=?[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}=?=?=?=1?0?\)[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/gm)
    snakeface2code = '&&!window.randomColor&&!window.isRainbow)' + code.match(snake_face2_reg)[0].split(')')[1]
    code = code.assertReplace(snake_face2_reg, snakeface2code)

    rainbow_bool_regex = new RegExp(/[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}===10/g)
    catchError(rainbow_bool_regex, code)

    is_rainbow_matches = code.match(rainbow_bool_regex).length;
    for (let index = 0; index < is_rainbow_matches; index++) {
        const element = code.match(rainbow_bool_regex)[0];
        snake_color_num = element.split('=')[0]
        make_me_different = element.split('=')[0] + `==10`
        new_rainbow_bool = make_me_different + `||window.isRainbow`
        code = code.assertReplace(element, new_rainbow_bool)

    }

    random_color_super_regex = new RegExp(/else{[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8};var c=a.[a-zA-Z0-9_$]{1,8}.[a-zA-Z0-9_$]{1,8}.[a-zA-Z0-9_$]{1,8};/)

    random_color_super_reset = `$&
    if(window.randomColor){window.isRainbow = window.getRandomBoolean() ? window.getRandomBoolean() : false;}
    if(window.randomColor&&window.isRainbow){
        window.snakeRainbowOverride = getRandomInt(0, Object.keys(window.rainbowAlts).length-1);
        c = window.rainbowAlts[window.snakeRainbowOverride].set[0];
    }`

    catchError(random_color_super_regex, code)
    code = code.assertReplace(random_color_super_regex, random_color_super_reset);

    //rainbow_bool_code = code.match(rainbow_bool_regex)[0] + "||window.isRainbow"
    //code = code.assertReplaceAll(rainbow_bool_regex, rainbow_bool_code)

    function PopulateSnakeColorsDropdown() {
        // Populate dropdown

        var selectElement = document.getElementById('snakePride');
        selectElement.addEventListener("change", function () {
            window.snakeRainbowOverride = document.getElementById('snakePride').value;
            if (window.NepDebug) {
                console.log(window.snakeRainbowOverride)
            }
        });
        for (var j = 1; j < Object.keys(window.rainbowAlts).length; j++) {
            var color = window.rainbowAlts[j];
            var option = document.createElement('option');
            option.value = j;
            option.textContent = color.name;
            selectElement.appendChild(option);
        }

    }

    PopulateSnakeColorsDropdown()

    // This fixes gate color issue, hardcoded is a poor choice but it works
    // Better search: /a=_....\(a\)/ -> 3 dots should match some function name that sets gate color or something similar
    code = code.assertReplace(/a=_.([a-zA-Z0-9_$]{1,8})\(a\);a=parseInt/,`
        if (typeof a === 'undefined') {
            a = "#4E7CF6";
        }
        a=_.$1(a);a=parseInt`);
        console.log("spawn yay");
}catch(error){
    console.error("error in running counter: "+error);
}

    //code = code.assertReplace(/this\.zd=qN\[0\]\[0\];/,`this.zd=qN[0][0];debugger;`)

    return code;
}
window.SettingsSaver = {};

window.SettingsSaver.make = function () {
    const COUNT_KEYS = ["0", "1", "2", "3", "4", "5", "6"];
    const COUNT_MINIMA = { 0: 1, 1: 3, 2: 5, 3: 10, 4: 6, 5: 24, 6: 5 };

    function defaultPoolForCount(count) {
        const min = COUNT_MINIMA[count] || 1;
        const pool = [];
        for (let i = 0; pool.length < min; i++) {
            if (i === 24) continue; // skip fruit bowl
            pool.push(i);
        }
        return pool;
    }

    function migrateSelectedPairsByCount(settings) {
        if (settings.SelectedPairsByCount && typeof settings.SelectedPairsByCount === "object") {
            for (const key of COUNT_KEYS) {
                if (!Array.isArray(settings.SelectedPairsByCount[key])) {
                    settings.SelectedPairsByCount[key] = defaultPoolForCount(Number(key));
                }
            }
            return settings;
        }

        const legacy = Array.isArray(settings.SelectedPairs) ? settings.SelectedPairs.map(Number) : null;
        settings.SelectedPairsByCount = {};
        for (const key of COUNT_KEYS) {
            const count = Number(key);
            const min = COUNT_MINIMA[count];
            // Seed each count with only its own minimum slice of the old shared list
            const seed = legacy ? legacy.slice(0, min) : defaultPoolForCount(count);
            const pool = Array.from(new Set(seed.map(Number).filter((n) => !isNaN(n) && n !== 24)));
            for (let i = 0; pool.length < min; i++) {
                if (i === 24) continue;
                if (!pool.includes(i)) pool.push(i);
            }
            settings.SelectedPairsByCount[key] = pool;
        }
        return settings;
    }

    window.loadSettings = function () {
        let pudding_settings = localStorage.getItem('PuddingSettings');
        if (pudding_settings === null) {
            pudding_settings = {
                Skull: false,
                SokoGoals: true,
                InputDisplay: false,
                TopBar: true,
                SpeedInfo: false,
                PortalPairs: false,
                SelectedPairs: defaultPoolForCount(0),
                SelectedPairsByCount: {},
                DisableRandom: false,
                randomizeThemeApple: false,
                ScrollBar: false
            };
            for (const key of COUNT_KEYS) {
                pudding_settings.SelectedPairsByCount[key] = defaultPoolForCount(Number(key));
            }
        } else {
            pudding_settings = JSON.parse(pudding_settings);
            if (typeof pudding_settings.PortalPairs !== 'boolean') {
                pudding_settings.PortalPairs = false;
            }
            if (typeof pudding_settings.ScrollBar !== 'boolean') {
                pudding_settings.ScrollBar = false;
            }
            pudding_settings = migrateSelectedPairsByCount(pudding_settings);
            pudding_settings.SelectedPairs = pudding_settings.SelectedPairsByCount["0"];
        }

        return pudding_settings;
    }
    window.pudding_settings = window.loadSettings();

    window.saveSettings = function () {
        const s = window.pudding_settings;
        if (typeof s !== 'undefined' &&
            typeof s.Skull !== 'undefined' &&
            typeof s.SokoGoals !== 'undefined' &&
            typeof s.InputDisplay !== 'undefined' &&
            typeof s.TopBar !== 'undefined' &&
            typeof s.SpeedInfo !== 'undefined' &&
            typeof s.PortalPairs !== 'undefined' &&
            typeof s.DisableRandom !== 'undefined' &&
            typeof s.randomizeThemeApple !== 'undefined'
        ) {
            localStorage.setItem('PuddingSettings', JSON.stringify(s));
        }
    }
}

window.SettingsSaver.alterCode = function (code) {
    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

    settings_reset_code = `
    saveSettings();
    $&`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, settings_reset_code);

    stop_regex = new RegExp(/stop\(a\){/)
    catchError(stop_regex, code)
    save_settings_code = `stop\(a\){saveSettings();`

    code = code.assertReplace(stop_regex, save_settings_code);
    return code;
}
window.SpeedInfo = {};

window.SpeedInfo.make = function () {

    window.isBridge = (Math.floor((Math.random()* 50) + 1) != 32);

    // First game must be CE, the other is the normal game
    const gameIDs = ["o1y9pyk6", "9dow0go1"];
    window.first_time_call = true;
    window.requestsMade = 0;

    // FastSnakeStats runs-derived WR timelines (preferred over legacy daily/ snapshots)
    const FASTSNAKE_BASE = "https://raw.githubusercontent.com/DarkSnakeGang/FastSnakeStats/refs/heads/main/time-travel-cache";
    const RUNS_DATES_URL = `${FASTSNAKE_BASE}/metadata/available-dates-runs.json`;
    const TIMELINES_URL = `${FASTSNAKE_BASE}/runs-derived/wr-timelines.json`;
    const CACHE_STALE_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours

    let timelinesData = null;
    let runsDatesMeta = null;
    let lastTimelinesUpdate = 0;
    let timelinesPromise = null;

    function sleepFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getJSON(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
        return res.json();
    }

    // Binary search: latest WR snapshot on or before `date` (same as FastSnakeStats GitHubCacheFetcher)
    function wrAsOf(timeline, date) {
        if (!timeline || !timeline.length) return [];
        let lo = 0;
        let hi = timeline.length - 1;
        let best = -1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (timeline[mid].d <= date) {
                best = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return best >= 0 ? timeline[best].runs : [];
    }

    function expandCompactRun(r, date) {
        const isGuest = r.g || String(r.p).indexOf("guest:") === 0;
        return {
            id: r.id,
            date: date,
            weblink: r.w,
            times: { primary: r.t, primary_t: r.pt },
            players: {
                data: [
                    isGuest
                        ? {
                            rel: "guest",
                            name: r.n,
                            "name-style": r.ns || {
                                style: "solid",
                                color: { dark: "#9e9e9e", light: "#9e9e9e" },
                            },
                        }
                        : {
                            rel: "user",
                            id: r.p,
                            names: { international: r.n },
                            weblink: "https://www.speedrun.com/user/" + r.p,
                            "name-style": r.ns || undefined,
                        },
                ],
            },
            values: {},
        };
    }

    async function loadRunsDerived() {
        if (
            timelinesData &&
            runsDatesMeta &&
            Date.now() - lastTimelinesUpdate < CACHE_STALE_THRESHOLD
        ) {
            const date = runsDatesMeta.availableDates[runsDatesMeta.availableDates.length - 1];
            return { timelines: timelinesData, date };
        }
        if (timelinesPromise) return timelinesPromise;

        timelinesPromise = (async () => {
            if (window.NepDebug) {
                console.log("Loading FastSnakeStats runs-derived timelines...");
            }
            const [dates, timelines] = await Promise.all([
                getJSON(RUNS_DATES_URL),
                getJSON(TIMELINES_URL),
            ]);
            if (!dates.availableDates || !dates.availableDates.length) {
                throw new Error("No available dates in runs-derived metadata");
            }
            if (!timelines.boards) {
                throw new Error("runs-derived timelines missing boards");
            }
            runsDatesMeta = dates;
            timelinesData = timelines;
            lastTimelinesUpdate = Date.now();
            window.requestsMade += 2;
            const date = dates.availableDates[dates.availableDates.length - 1];
            if (window.NepDebug) {
                console.log(`Runs-derived ready as of ${date} (${Object.keys(timelines.boards).length} boards)`);
            }
            return { timelines, date };
        })().finally(() => {
            timelinesPromise = null;
        });

        return timelinesPromise;
    }

    // Look up one category key as of the latest runs-derived date
    async function getRecordForKey(cacheKey) {
        const { timelines, date } = await loadRunsDerived();
        const top = wrAsOf(timelines.boards[cacheKey], date);
        return {
            date,
            success: top.length > 0,
            runs: top.map((r) => expandCompactRun(r, date)),
        };
    }

    // Preload timelines (startup / legacy hooks)
    async function getLatestCacheData() {
        const { timelines, date } = await loadRunsDerived();
        return { date, source: "runs-derived", boards: timelines.boards };
    }

    // Legacy function for compatibility (now uses runs-derived)
    window.makeAPIrequest = function (requestURL, callback) {
        if (window.NepDebug) {
            console.log("Legacy API request called, using runs-derived instead");
        }
        getLatestCacheData().then(data => {
            if (callback && typeof callback === "function") {
                callback(data);
            }
        }).catch(error => {
            if (window.NepDebug) {
                console.error("Runs-derived fetch failed:", error);
            }
            if (callback && typeof callback === "function") {
                callback({ data: { runs: [] } });
            }
        });
    }

    // Legacy function for compatibility
    window.getGameDetails = function () {
        if (window.NepDebug) {
            console.log("getGameDetails called - using runs-derived instead");
        }
        getLatestCacheData().catch(error => {
            if (window.NepDebug) {
                console.error("Failed to initialize runs-derived data:", error);
            }
        });
    }

    window.modeToTxt = {
        0: { name: "Classic" },
        1: { name: "Wall" },
        2: { name: "Portal" },
        3: { name: "Cheese" },
        4: { name: "Borderless" },
        5: { name: "Twin" },
        6: { name: "Winged" },
        7: { name: "Yin Yang" },
        8: { name: "Key" },
        9: { name: "Sokoban" },
        10: { name: "Poison" },
        11: { name: "Dimension" },
        12: { name: "Minesweeper" },
        13: { name: "Statue" },
        14: { name: "Light" },
        15: { name: "Shield" },
        16: { name: "Arrow" },
        17: { name: "Hotdog" },
        18: { name: "Magnet" },
        19: { name: "Gate" },
        20: { name: "Bridge" },
        21: { name: "Peaceful" },
        22: { name: "Blender" },
    }

    window.countToTxt = {
        0: { name: "1 Apple" },
        1: { name: "3 Apples" },
        2: { name: "5 Apples" },
        3: { name: "10 Apples" },
        4: { name: "Dice" },
        5: { name: "Bomb" },
        6: { name: "Tally" },
    }

    window.sizeToTxt = {
        0: { name: "Standard" },
        1: { name: "Small" },
        2: { name: "Large" },
    }

    window.speedToTxt = {
        0: { name: "Normal" },
        1: { name: "Fast" },
        2: { name: "Slow" },
    }

    daily_button.addEventListener("click", function() {
        SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e))
        EmptyAll()
      });

    window.getRecordSRC = async function (level) {

        if(window.daily_challenge){
            EmptyAll();
            return;
        }

        if (!window.pudding_settings.SpeedInfo) {
            // For those that don't want to see speedrun info, to keep the game stable without api calls
            EmptyAll();
            return;
        }

        // Modes list
        CLASSIC = 0
        WALL = 1
        PORTAL = 2
        CHEESE = 3
        BORDERLESS = 4
        TWIN = 5
        WINGED = 6
        YINYANG = 7
        KEY = 8
        SOKO = 9
        POISON = 10
        DIMENSION = 11
        MINESWEEPER = 12
        STATUE = 13
        LIGHT = 14
        SHIELD = 15
        ARROW = 16
        HOTDOG = 17
        MAGNET = 18
        GATE = 19
        BRIDGE = 20
        PEACEFUL = 21
        BLENDER = 22

        // Speed list
        DEFAULT_SPEED = 0
        FAST = 1
        SLOW = 2

        // Count settings
        ONE_APPLE = 0;
        THREE_APPLES = 1;
        FIVE_APPLES = 2;
        TEN_APPLES = 3;
        DICE = 4;
        BOMB = 5;


        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let mode = window.CurrentModeNum;

        const highscore_modes = [WALL, PORTAL, KEY, SOKO, POISON, MINESWEEPER, STATUE, SHIELD, HOTDOG, GATE, CHEESE, BRIDGE];

        // > 6 = beyond Tally (MoreMenu / custom counts)
        if (size > 2 || count > 6) {
            EmptyAll();
            return;
        }
        if (mode == BLENDER) {
            EmptyAll();
            return;
        }
        if (!highscore_modes.includes(mode) && level == "H") {
            HandleHighscore("Empty")
            return;
        }

        // Build cache key based on FastSnakeStats format
        const modeName = window.modeToTxt[mode].name;
        const countName = window.countToTxt[count].name;
        const speedName = window.speedToTxt[speed].name;
        const sizeName = window.sizeToTxt[size].name;
        
        // Determine category name
        let categoryName;
        if (level === "H") {
            categoryName = "High Score";
        } else {
            categoryName = level + " Apples";
        }

        // Build the cache key in FastSnakeStats format
        const cacheKey = `${countName}|${speedName}|${sizeName}|${modeName}|${categoryName}`;

        if (window.NepDebug) {
            console.log(`Looking for runs-derived key: ${cacheKey}`);
        }

        let recordData;
        try {
            recordData = await getRecordForKey(cacheKey);
        } catch (error) {
            if (window.NepDebug) {
                console.error("Failed to get runs-derived record:", error);
            }
            EmptyAll();
            return;
        }

        if (window.NepDebug) {
            console.log(`Record data for key ${cacheKey}:`, recordData);
        }

        if (!recordData || !recordData.success || !recordData.runs || recordData.runs.length === 0) {
            if (window.NepDebug) {
                console.log(`No successful runs found for key: ${cacheKey}`);
            }
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Runs are already expanded objects from runs-derived timelines
        const bestRun = recordData.runs[0];

        if (!bestRun || !bestRun.times || !bestRun.times.primary || !bestRun.weblink) {
            if (window.NepDebug) {
                console.log(`Invalid run data structure for key: ${cacheKey}`, bestRun);
            }
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        const runData = {
            data: {
                runs: [{
                    run: {
                        times: { primary: bestRun.times.primary },
                        weblink: bestRun.weblink
                    }
                }]
            }
        };

        switch (level) {
            case "H": HandleHighscore(runData); break;
            case "25": Handle25(runData); break;
            case "50": Handle50(runData); break;
            case "100": Handle100(runData); break;
            case "All": HandleAll(runData); break;
            default:
                if (window.NepDebug) {
                    console.warn(`No handler found for level: ${level}`);
                }
                break;
        }

    }

    //window.getRecordSRC("H");

    function EmptyAll() {
        emp = "Empty"
        Handle25(emp);
        Handle50(emp);
        Handle100(emp);
        HandleAll(emp);
        HandleHighscore(emp);
    }

    window.getAllSrc = async function () {
        const levels = ["25", "50", "100", "All", "H"];
        for (const element of levels) {
            await getRecordSRC(element);
        }
    }

    function Handle25(response) {
        if (response == "Empty") {
            document.getElementById('25src').innerHTML = ` `
            return;
        }

        if (typeof response["data"]["runs"][0] == "undefined") {
            document.getElementById('25src').innerHTML = `25 Apples: None`
            return;
        }

        world_record = convertTime(response["data"]["runs"][0]["run"]["times"]["primary"]);

        document.getElementById('25src').innerHTML = `25 Apples: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`

        //document.getElementById('Hsrc').href = response["data"]["runs"][0]["run"].weblink
        if (window.NepDebug) {
            //console.log("Found 25 apples " + world_record + " " + response["data"]["runs"][0]["run"].weblink)
        }
    }
    function Handle50(response) {
        if (response == "Empty") {
            document.getElementById('50src').innerHTML = ` `
            return;
        }

        if (typeof response["data"]["runs"][0] == "undefined") {
            document.getElementById('50src').innerHTML = `50 Apples: None`
            return;
        }
        world_record = convertTime(response["data"]["runs"][0]["run"]["times"]["primary"]);

        document.getElementById('50src').innerHTML = `50 Apples: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
    }
    function Handle100(response) {
        if (response == "Empty") {
            document.getElementById('100src').innerHTML = ` `
            return;
        }

        if (typeof response["data"]["runs"][0] == "undefined") {
            document.getElementById('100src').innerHTML = `100 Apples: None`
            return;
        }
        world_record = convertTime(response["data"]["runs"][0]["run"]["times"]["primary"]);

        document.getElementById('100src').innerHTML = `100 Apples: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
    }
    function HandleAll(response) {
        if (response == "Empty") {
            document.getElementById('Allsrc').innerHTML = ` `
            return;
        }

        if (typeof response["data"]["runs"][0] == "undefined") {
            document.getElementById('Allsrc').innerHTML = `All Apples: None`
            return;
        }
        world_record = convertTime(response["data"]["runs"][0]["run"]["times"]["primary"]);

        document.getElementById('Allsrc').innerHTML = `All Apples: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
    }

    function HandleHighscore(response) {

        if (response == "Empty") {
            document.getElementById('Hsrc').innerHTML = ` `
            return;
        }

        if (typeof response["data"]["runs"][0] == "undefined") {
            document.getElementById('Hsrc').innerHTML = `Highscore: None`
            return;
        }

        highscore = parseInt(response["data"]["runs"][0]["run"]["times"]["primary"].toString().split('.')[1]).toString();
        world_record = highscore + " Apples";

        document.getElementById('Hsrc').innerHTML = `Highscore: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
        //document.getElementById('Hsrc').href = response["data"]["runs"][0]["run"].weblink
        if (window.NepDebug) {
            //console.log("Found highscore " + highscore + " " + response["data"]["runs"][0]["run"].weblink)
        }
    }

    // This shit was generated by ChatGPT
    function convertTime(duration) {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?([\d.]+)S/;
        const matches = duration.match(regex);

        let convertedTime = '';

        if (matches[1]) {
            convertedTime += matches[1] + 'h';
        }

        if (matches[2]) {
            convertedTime += matches[2] + 'm';
        }

        const seconds = parseFloat(matches[3]);

        if (seconds > 0 || convertedTime === '') {
            const wholeSeconds = Math.floor(seconds);
            convertedTime += wholeSeconds + 's';

            const milliseconds = String(Math.round((seconds - wholeSeconds) * 1000)).padStart(3, "0");

            if (milliseconds > 0) {
                convertedTime += milliseconds + 'ms';
            }
        }

        if (convertedTime.includes('h')) {
            convertedTime = convertedTime.split('s')[0] + "s";
        }

        return convertedTime;
    }

    function countOccurrences(str, char) {
        const regex = new RegExp(char, "g");
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    }

    // Prefetch runs-derived timelines on startup
    getLatestCacheData().catch(error => {
        if (window.NepDebug) {
            console.error("Failed to initialize runs-derived data:", error);
        }
    });

   // window.speedinfoVisible = false;

    window.SpeedInfoShow = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'block';
        speedinfoBox.style.visibility = 'visible';
        window.pudding_settings.SpeedInfo = true;

        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    }

    window.SpeedInfoHide = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'block';
        speedinfoBox.style.visibility = 'hidden';
        window.pudding_settings.SpeedInfo = false;
        document.getElementById('AlwaysOnTimeKeeper').checked = false;
    }

    window.SpeedInfoSetup = function () {

        const d = document.createElement('div');
        d.id = 'speedinfo-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);
        const speedinfoElement = document.querySelector('#speedinfo-container');


        const speedinfoBox = document.createElement('div');
        speedinfoBox.style = window.puddingSidebarStyle;
        speedinfoBox.id = 'speedinfo-popup-pudding';
        speedinfoBox.style.visibility = 'hidden';
        window.speedinfoInput = speedinfoBox;
        speedinfoBox.innerHTML = `

        <span style="text-decoration: underline;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center;">Speed Info</span>
        <label id="mode-selected" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="mode-selected2" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="25" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="50" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="100" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="ALL" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="H" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="att" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <span style="display:flex; justify-content: center; align-items: center; text-align: center;">
        <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;justify-content: center; align-items: center; text-align: center;" id="time-keeper" jsname="time-keeper">Show Details</button>
        </span>
        <br>

        <span style="text-decoration: underline;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center;">SRC World Records</span>
        <label id="25src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="50src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="100src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="Allsrc" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="Hsrc" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <br>
  <button class="btn" style="display:none;margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="speedinfo-close" jsname="speedinfo-close">Close</button>

  `;

  document.getElementsByClassName('sEOCsb')[0].appendChild(speedinfoBox);

        const speedinfoCloseElements = document.getElementById('speedinfo-close');
        speedinfoCloseElements.addEventListener('click', window.SpeedInfoHide);
        //speedinfoCloseElements[1].addEventListener('click', hideSettingsBox);


        //document.getElementById('toggle-counter').addEventListener('click', toggleCounter);

        tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
        document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
            if(!window.daily_challenge){
                window.timeKeeper.toggleDialog();
            }
        });

        //debugger
    }

    window.SpeedInfoSetup();

    window.ToggleSpeedInfo = function () {

          window.pudding_settings.SpeedInfo = !window.pudding_settings.SpeedInfo;

        if (window.pudding_settings.SpeedInfo) {
            // Show it
            window.SpeedInfoShow();
        }
        else {
            // Hide it
            window.SpeedInfoHide();
        }
    }

    //Listeners to hide/show speedinfo box
    const backButton = 'p17HVe';
    document.querySelector("[class^=\"" + backButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    });

    const playButton = 'NSjDf';
    document.querySelector("[jsname^=\"" + playButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    });

    window.SpeedInfoUpdate = async function () {
        // Mainly for TimeKeeper, runs when "play" is clicked
        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let modeStr = window.timeKeeper.getCurrentMode("size");
        storage = JSON.parse(localStorage["snake_timeKeeper"]);

        //change modeStr to gamemode
        var counter = 0
        var gamemode = "";
        for (t of modeStr) {
            if (t == 1) {

                if(window.isBridge){
                    switch (counter) {
                        case 0: gamemode += "Wall, "; break;
                        case 1: gamemode += "Portal, "; break;
                        case 2: gamemode += "Cheese, "; break;
                        case 3: gamemode += "Borderless, "; break;
                        case 4: gamemode += "Twin, "; break;
                        case 5: gamemode += "Winged, "; break;
                        case 6: gamemode += "YinYang, "; break;
                        case 7: gamemode += "Key, "; break;
                        case 8: gamemode += "Sokoban, "; break;
                        case 9: gamemode += "Poison, "; break;
                        case 10: gamemode += "Dimension, "; break;
                        case 11: gamemode += "Minesweeper, "; break;
                        case 12: gamemode += "Statue, "; break;
                        case 13: gamemode += "Light, "; break;
                        case 14: gamemode += "Shield, "; break;
                        case 15: gamemode += "Arrow, "; break;
                        case 16: gamemode += "Hotdog, "; break;
                        case 17: gamemode += "Magnet, "; break;
                        case 18: gamemode += "Gate, "; break;
                        case 19: gamemode += "Bridge, "; break;
                        case 20: gamemode += "Peaceful, "; break;
                        default: gamemode += "Unknown, "; break;
                    }
                }else{
                    switch (counter) {
                        case 0: gamemode += "Wall, "; break;
                        case 1: gamemode += "Portal, "; break;
                        case 2: gamemode += "Cheese, "; break;
                        case 3: gamemode += "Borderless, "; break;
                        case 4: gamemode += "Twin, "; break;
                        case 5: gamemode += "Winged, "; break;
                        case 6: gamemode += "YinYang, "; break;
                        case 7: gamemode += "Key, "; break;
                        case 8: gamemode += "Sokoban, "; break;
                        case 9: gamemode += "Skull, "; break;
                        case 10: gamemode += "Dimension, "; break;
                        case 11: gamemode += "Minesweeper, "; break;
                        case 12: gamemode += "Statue, "; break;
                        case 13: gamemode += "Light, "; break;
                        case 14: gamemode += "Shield, "; break;
                        case 15: gamemode += "Arrow, "; break;
                        case 16: gamemode += "Hotdog, "; break;
                        case 17: gamemode += "Magnet, "; break;
                        case 18: gamemode += "Gate, "; break;
                        case 19: gamemode += "Skip, "; break;
                        case 20: gamemode += "Peaceful, "; break;
                        default: gamemode += "Unknown, "; break;
                    }
                }
            }
            counter++;
        }
        if (gamemode == "") {
            gamemode = "Classic, ";
        }
        //gamemode = gamemode.substring(0, gamemode.lastIndexOf(","));
        mode_label = document.getElementById("mode-selected");
        mode_label2 = document.getElementById("mode-selected2");

        mode_label.innerHTML = gamemode + window.HandleCount(count).substring(0, window.HandleCount(count).lastIndexOf(","));
        mode_label2.innerHTML = window.HandleSpeed(speed) + window.HandleSize(size);

        //dialog = document.getElementById("speedinfo-popup-pudding");

        for (let score of ["att", "25", "50", "100", "ALL", "H"]) {
            let name = score + "-" + modeStr + "-" + count + "-" + speed + "-" + size;
            bold = document.getElementById(score);
            if(window.daily_challenge) {
                bold.innerHTML = '';
                continue;
            }

            if (typeof (storage[name]) != "undefined") {

                if (score == "att") {
                    totalAttempts = storage[name];
                    bold.innerHTML = "Total Attempts: " + totalAttempts;
                    continue;
                }
                else if (score == "H") {
                    bold.innerHTML = "Highscore: " + storage[name].high;
                    continue;
                }

                hours = Math.floor(storage[name].time / 3600000);
                minutes = String(Math.floor((storage[name].time / 60000)-hours*60)).padStart(2, "0");
                seconds = String(Math.floor((storage[name].time - minutes * 60000-hours*3600000) / 1000)).padStart(2, "0");
                mseconds = String(storage[name].time - minutes * 60000 - seconds * 1000-hours*3600000).padStart(3, "0");
                score_label = "ALL" === score ? "All" : score;
                if(hours==0){
                    bold.innerHTML = score_label + " Apples: " + minutes + "m" + seconds + "s" + mseconds + "ms";
                }else{
                    bold.innerHTML = score_label + " Apples: " + hours + "h" + minutes + "m" + seconds + "s" + mseconds + "ms";
                }

            }
            else {
                bold.innerHTML = "";
            }
        }

        if(window.daily_challenge) {
            mode_label.innerHTML = 'Daily Challenge'
            mode_label2.innerHTML = '(TimeKeeper disabled)'
        }

    }

    window.HandleCount = function (count) {
        switch (count) {
            case 0: return "1 Apple, "; break;
            case 1: return "3 Apples, "; break;
            case 2: return "5 Apples, "; break;
            case 3: return "10 Apples, "; break;
            case 4: return "Dice count, "; break;
            case 5: return "Bomb count, "; break;
            case 6: return "Tally count, "; break;
            default: return "MoreMenu Apples, "; break;
        }
    }
    window.HandleSpeed = function (speed) {
        switch (speed) {
            case 0: return "Normal speed, "; break;
            case 1: return "Fast speed, "; break;
            case 2: return "Slow speed, "; break;
            default: return "MoreMenu speed, "; break;

        }
    }
    window.HandleSize = function (size) {
        switch (size) {
            case 0: return "Normal size"; break;
            case 1: return "Small size"; break;
            case 2: return "Large size"; break;
            default: return "MoreMenu size"; break;
        }
    }

}

window.SpeedInfo.alterCode = function (code) {
    
    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

    speedinfo_reset = `;window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    if(window.first_time_call){window.getAllSrc().catch(e=>console.error('getAllSrc error:',e));window.first_time_call=false;}
    ;$&`


    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, speedinfo_reset);

    switch_regex = new RegExp(/switch\(b\){case "apple"/)
    speedinfo_switch = `window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));switch(b){case "apple"`
    code = code.assertReplace(switch_regex, speedinfo_switch);

    window.CurrentModeNum = 0;
    mode_regex = new RegExp(/case "trophy"\:/)
    mode_get_code = `case "trophy":window.CurrentModeNum = `
    code = code.assertReplace(mode_regex, mode_get_code);

    /*
    count_regex = new RegExp(/case "count"\:/)
    count_get_code = `case "count":window.getAllSrc();`
    code = code.assertReplace(mode_regex, count_get_code);

    speed_regex = new RegExp(/case "speed"\:/)
    speed_get_code = `case "speed":window.getAllSrc();`
    code = code.assertReplace(speed_regex, speed_get_code);

    size_regex = new RegExp(/case "size"\:/)
    size_get_code = `case "size":window.getAllSrc();`
    code = code.assertReplace(size_regex, size_get_code);
    */

    return code;
}
window.InputDisplay = {};

window.InputDisplay.make = function () {

  let displayPosition = parseInt((window.puddingSidebarStyle.split(';').find(style => style.trim().startsWith('width')) ? window.puddingSidebarStyle.split(';').find(style => style.trim().startsWith('width')).split(':')[1].trim() : null),10);

  // Code that runs before anything else here, loading variables, etc.
  // Recommended to use "window." for things
  const e = document.createElement('div');
  e.id = 'input-display-container';
  e.style = `position:absolute;left:${(-553+displayPosition/2)}px;top:530px;z-index:10001;display:block;line-height:normal;`;
  window.speedinfoInput.appendChild(e);

  const f = document.createElement('div');
  f.id = 'input-display-container2';
  f.style = `position:absolute;left:${(-553+displayPosition/2)}px;top:460px;z-index:10001;display:block;line-height:normal;width: 0;height: 0;`;
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

// const arrayIndices = n => Array(n).fill().map((q, i) => i)

// const [classic, wall, portal, cheese, infinity, twin, winged, yinyang, key, sokoban, poison, dimension, minesweeper, statue, light, peaceful] = arrayIndices(16)
// const [one, three, five, dice] = arrayIndices(4)
// const [normal, fast, slow] = arrayIndices(3)
// const [standard, small, large] = arrayIndices(3)


function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}
function rgbToHex(rgb) {
  let hex = '#';
  hex += rgb.r.toString(16).padStart(2, '0');
  hex += rgb.g.toString(16).padStart(2, '0');
  hex += rgb.b.toString(16).padStart(2, '0');
  return hex;
}


window.Timer = {
  make: function() {
    window.getSelected = function(selector, selectedClass = 'DqMRee tuJOWd') {
      return (
        [...document.querySelector(selector).children].map(
          (q, i) => [q, i]
        ).filter(
          ([q,]) => q.className === selectedClass
        )[0] || [0, 0]
      )[1]
    }

    String.prototype.color = function(c) { return `<span style="color:${c}">${this.toString()}</span>` }

    Number.prototype.timeFormat = function() {
      const time = +this

      const hours   = Math.floor(time / 3600)
      const minutes = Math.floor((time / 60) % 60)
      const seconds = Math.floor(time % 60)
      const millis  = Math.floor((time % 1).toFixed(4) * 1000)

      let out = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}.${millis.toString().padStart(3, '0')}`
      out = out.slice(out.search(/[^0:]/))

      return (out[0] === '.' ? '0' : '') + out
    }
    String.prototype.timeFormat = function() {
      return (+this).timeFormat()
    }

    window._splits = []

    window._cat = 3

    localStorage._snake_timer_format = localStorage._snake_timer_format ?? 1
    window._format = localStorage._snake_timer_format

    localStorage._snake_show_delta = localStorage._snake_show_delta ?? 0
    window._showDelta = +localStorage._snake_show_delta

    localStorage._snake_pb = localStorage._snake_pb ?? '{}'
    window._pb = JSON.parse(localStorage._snake_pb)

    // Bridge inserted before Peaceful: old mode index 20 (Peaceful) -> 21
    if (!localStorage._snake_pb_bridge_migrated) {
      if (window._pb[20] && !window._pb[21]) {
        window._pb[21] = window._pb[20];
        delete window._pb[20];
        localStorage._snake_pb = JSON.stringify(window._pb);
      }
      localStorage._snake_pb_bridge_migrated = '1';
    }


    localStorage._snake_aheadg  = localStorage._snake_aheadg  ?? '#008010'
    localStorage._snake_aheadl  = localStorage._snake_aheadl  ?? '#53dd87'
    localStorage._snake_behindg = localStorage._snake_behindg ?? '#dd3333'
    localStorage._snake_behindl = localStorage._snake_behindl ?? '#a00000'

    const nullFormats = [
      '-:--:--:---',
        '--:--:---',
         '-:--:---',
           '--:---',
            '-:---',
      '-:--:--.---',
        '--:--.---',
         '-:--.---',
           '--.---',
            '-.---',
    ]
    localStorage._snake_null_split = localStorage._snake_null_split ?? nullFormats[_format]


    const timerSplitDiv = document.getElementsByClassName('Jc72He rc48Qb')[0]
    const deltaDiv = document.createElement('div')
    deltaDiv.id = 'timerDelta'
    deltaDiv.innerHTML = '-'.color('white')
    timerSplitDiv.appendChild(deltaDiv)
    if(!_showDelta) deltaDiv.style.display = 'none'

    // const realTimerDiv = document.getElementsByClassName('Jc72He gmwAbc')[0]
    // realTimerDiv.style.position = 'relative'
    // if(_showDelta) realTimerDiv.style.bottom = window.location.href.includes('fbx') ? '9px' : '13px'

    // const wholeTimerDiv = document.getElementsByClassName('A2vT0')[0]
    // wholeTimerDiv.style.cursor = 'pointer'


    window.editTimer = function() {
      // console.warn(window.themes)

      let editBox = document.getElementById('edit-box')
      if(editBox) {
        editBox.remove()
      } else {
        const theme = window.themes[getSelected('#theme', 'DqMRee tuJOWd') || getSelected('#theme', 'tuJOWd')]

        editBox = document.createElement('div')
        editBox.id = 'edit-box'
        editBox.style = `
          background-color: ${theme.real_top_bar ?? '#aaaaff'};
          border-radius: 0.5vw;
          position: absolute;
          height: 93vh;
          z-index: 1000000;
          top: 30px;
          left: 50%;
          backdrop-filter: blur(5px);
          text-align: center;
          padding: 4px;
          transform: translate(-50%, 0);
          box-shadow: 0px 0px 8px rgba(0,0,0,0.4);
          border: 1px solid ${theme.topbar_color ?? '#4444dd'};
          font-size: 2.5vh;
          color: #ffffff;
          width: 50vw;
          font-family: Roboto,Arial,sans-serif;
          overflow-y: auto;
        `
        editBox.innerHTML = `
        <span id="close-box" style="
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        color: #ffffff;
        font-size: 0.9em;
      ">&#x2715</span>
</br>
<label class="form-check-label" style="font-size: 3.5vh">
        Custom Timer/Splits Settings
      </label> </br>
</br>

<div id="edit-mode">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_02.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_03.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_04.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_05.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_06.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_07.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_08.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_09.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_10.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_11.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_12.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_13.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_14.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/trophy_15.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v18/trophy_16.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v19/trophy_17.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v20/trophy_18.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v21/trophy_19.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v22/trophy_20.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_15.png" />
</div>
<br/>
<div id="edit-count">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_02.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v18/count_03.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v18/count_04.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v18/count_05.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v19/count_06.png" />
</div>
<br/>
<div id="edit-speed">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_02.png" />
</div>
<br/>
<div id="edit-size">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_02.png" />
</div>
<br/>

<div id="edit-cat">
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/d1R1Y648/25.png" />
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/7hmZC6vh/50.png" />
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/qqk7MK5W/100.png" />
  <img class="sel" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/52j6Cw2V/all.png" />
</div>

<br/>
<div id="edit-times" style="left:0px;">
  <div>
      <label class="form-check-label" for="edit-25"> 25</label>
      <input class="text-input" size="9" name="edit-25" id="edit-25" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-50"> 50</label>
      <input class="text-input" size="9" name="edit-50" id="edit-50" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-100">100</label>
      <input class="text-input" size="9" name="edit-100" id="edit-100" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-ALL">ALL</label>
      <input class="text-input" size="9" name="edit-ALL" id="edit-ALL" type="text" style="font-family:Consolas;" />
  </div>
</div>

<div id="edit-customsplit" style="border-top:0px solid black">

</div>

<div id="edit-split">
  <label class="form-check-label" for="edit-splitscore">New Split</label>
  <input class="text-input" size="6" name="edit-splitscore" id="edit-splitscore" type="number" placeholder="Score" />
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="edit-addsplit">Add</button>
</div>
<div id="edit-customsplit" style="border-top:0px solid black">
</br>
<label class="form-check-label" style="flex:center;">Timer Format</label>
<select class="form-control" id="edit-format" style="flex:center;">
    <option value="0">0:00:00:000</option>
    <option value="1">  00:00:000</option>
    <option value="2">   0:00:000</option>
    <option value="3">     00:000</option>
    <option value="4">      0:000</option>
    <option value="5">0:00:00.000</option>
    <option value="6">  00:00.000</option>
    <option value="7">   0:00.000</option>
    <option value="8">     00.000</option>
    <option value="9">      0.000</option>
  </select>
<br/>
<input class="form-check-input" style="width: 1.5em; height: 1.5em;" type="checkbox" checked="true" name="edit-delta" id="edit-delta" />
<label class="form-check-label" for="edit-delta">Show Delta</label>
<br/>
<br/>
<label class="form-check-label" for="edit-aheadg">Ahead (gaining time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-aheadg" id="edit-aheadg" type="color" />
<label class="form-check-label" for="edit-aheadl">Ahead (losing time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-aheadl" id="edit-aheadl" type="color" />
<br/>
<label class="form-check-label" for="edit-behindg">Behind (gaining time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-behindg" id="edit-behindg" type="color" />
<label class="form-check-label" for="edit-behindl">Behind (losing time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-behindl" id="edit-behindl" type="color" />

</div>
        `
        document.body.appendChild(editBox)
        document.getElementById('close-box').addEventListener('click', function() { document.getElementById('edit-box').remove() })

        const toggleDelta = document.getElementById('edit-delta')
        toggleDelta.checked = +_showDelta
        toggleDelta.addEventListener('change', function() {
          window._showDelta = +toggleDelta.checked
          localStorage._snake_show_delta = _showDelta

          if(_showDelta) {
            deltaDiv.style.display = ''
            // realTimerDiv.style.bottom = window.location.href.includes('fbx') ? '9px' : '13px'
          } else {
            deltaDiv.style.display = 'none'
            // realTimerDiv.style.bottom = '0px'
          }
        })


        const formatSelect = document.getElementById('edit-format')
        formatSelect.value = _format
        formatSelect.addEventListener('change', function() {
          window._format = +formatSelect.value
          localStorage._snake_timer_format = _format
          localStorage._snake_null_split = nullFormats[window._format]
        })

        const customSplitSectionDiv = document.getElementById('edit-customsplit')
        const newSplitInput = document.getElementById('edit-splitscore')
        newSplitInput.addEventListener('keydown', function() {
          setTimeout(function() {
            newSplitInput.value = newSplitInput.value.replace(/\D/g, '')
          }, 1)
        })
        document.getElementById('edit-addsplit').addEventListener('click', function() {
          const splitScore = document.getElementById('edit-splitscore').value
          if(!+splitScore) return

          const splitDiv = document.createElement('div')

          const splitName = `edit-${splitScore}`

          const splitLabel = document.createElement('label')
          splitLabel.for = splitName
          splitLabel.innerText = splitScore.toString().padStart(3, ' ') + ' '

          const splitInput = document.createElement('input')
          splitInput.className = 'text-input'
          splitInput.id = splitInput.name = splitName
          splitInput.size = 9
          splitInput.type = 'text'


          const splitDeleteButton = document.createElement('button')
          splitDeleteButton.innerText = 'Delete'
          splitDeleteButton.className = 'btn'
          splitDeleteButton.addEventListener('click', function() {
            splitDiv.remove()

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',  'sel')

            delete _pb[_mode][_count][_speed][_size][_cat][splitScore]
            localStorage._snake_pb = JSON.stringify(_pb)
            while(_splits.includes(+splitScore)) {
              _splits.splice(_splits.indexOf(+splitScore), 1)
            }
          })

          if(!window._splits.includes(+splitScore)) window._splits.push(+splitScore)

          function handleChange() {
            const val = splitInput.value.split(':')
            let time = 0
            for(let i = 1; i <= val.length; i++) {
              let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
              time += s * +val.at(-i)
            }


            const key = splitInput.name.replace('edit-', '')
            splitInput.className = 'text-input'

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',   'sel')

            if(!_pb[_mode]) _pb[_mode] = {}
            if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
            if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
            if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
            if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
            _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

            localStorage._snake_pb = JSON.stringify(_pb)


            splitInput.value = time === 0 ? '' : time.timeFormat()
          }
          handleChange()

          splitInput.addEventListener('keydown', function(evt) {
            if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

            setTimeout(function() {
              splitInput.value = splitInput.value.replace(/[^\d.:]/g, '')
            }, 1)
          })
          splitInput.addEventListener('change', handleChange)

          splitDiv.appendChild(splitLabel)
          splitDiv.appendChild(splitInput)
          splitDiv.appendChild(splitDeleteButton )

          customSplitSectionDiv.appendChild(splitDiv)

        })

        const divs = ['edit-mode', 'edit-count', 'edit-speed', 'edit-size'].map(q => document.getElementById(q))
        const selectors = ['#trophy', '#count', '#speed', '#size']
        for(let j = 0; j < 4; j++) {
          let temp = [...document.querySelector(selectors[j]).children]
          temp.forEach((q, i) => {
            if(_r = divs[j].children[i]) {
              _r.style.border = i === getSelected(selectors[j]) ? '0.5vh ridge #af4490ff' : '0.5vh ridge #00000000'
              _r.className = i === getSelected(selectors[j]) ? 'sel' : 'uns'
            }
          })
        }

        const cats = [...document.getElementById('edit-cat').children]
        cats.forEach((q, i) => {
          q.style.border = i === _cat ? '0.5vh ridge #af4490ff' : '0.5vh ridge #00000000'
          q.className = i === _cat ? 'sel' : 'uns'
        })


        for(const inp of document.getElementById('edit-times').children) {
          const el = inp.children[1]

          function handleChange() {
            const val = el.value.split(':')
            let time = 0
            for(let i = 1; i <= val.length; i++) {
              let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
              time += s * +val.at(-i)
            }

            const key = el.name.replace('edit-', '')

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',   'sel')

            if(!_pb[_mode]) _pb[_mode] = {}
            if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
            if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
            if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
            if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
            _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

            localStorage._snake_pb = JSON.stringify(_pb)


            el.value = time === 0 ? '' : time.timeFormat()
          }

          el.addEventListener('keydown', function(evt) {
            if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

            setTimeout(function() {
              el.value = el.value.replace(/[^\d.:]/g, '')
            }, 1)
          })

          el.addEventListener('change', handleChange)
        }

        function updateToMode() {

          const _mode  = getSelected('#edit-mode',  'sel')
          const _count = getSelected('#edit-count', 'sel')
          const _speed = getSelected('#edit-speed', 'sel')
          const _size  = getSelected('#edit-size',  'sel')

          window._cat  = getSelected('#edit-cat',   'sel')

          const time = _pb[_mode] && _pb[_mode][_count] && _pb[_mode][_count][_speed] && _pb[_mode][_count][_speed][_size] && _pb[_mode][_count][_speed][_size][_cat] ? _pb[_mode][_count][_speed][_size][_cat] : {}

          for(const inp of document.getElementById('edit-times').children) {
            const el = inp.children[1]
            const key = el.name.replace('edit-', '')


            el.value = time[key] ? time[key].timeFormat() : ''

          }

          for(let i = customSplitSectionDiv.children.length - 1; i >= 0; i--) {
            customSplitSectionDiv.removeChild(customSplitSectionDiv.children[i])
          }

          for(const [_splitName, _splitTime] of Object.entries(time)) {
            if(!['25', '50', '100', 'ALL'].includes(_splitName)) {
              const splitDiv = document.createElement('div')
              const splitName = `edit-${_splitName}`

              const splitLabel = document.createElement('label')
              splitLabel.for = splitName
              splitLabel.innerText = _splitName.padStart(3, ' ') + ' '

              const splitInput = document.createElement('input')
              splitInput.id = splitInput.name = splitName
              splitInput.size = 9
              splitInput.type = 'text'
              splitInput.className = 'text-input'
              splitInput.value = +_splitTime ? _splitTime.timeFormat() : ''

              const splitDeleteButton = document.createElement('button')
              // splitDeleteButton.id = `delete-${splitName}`
              splitDeleteButton.innerText = 'Delete'
              splitDeleteButton.className = 'btn'
              splitDeleteButton.addEventListener('click', function() {
                splitDiv.remove()
                delete time[_splitName]
                delete _pb[_mode][_count][_speed][_size][_cat][_splitName]
                localStorage._snake_pb = JSON.stringify(_pb)
                while(window._splits.includes(+_splitName)) {
                  window._splits.splice(window._splits.indexOf(+_splitName), 1)
                }
              })

              if(!window._splits.includes(+_splitName)) window._splits.push(+_splitName)


              function handleChange() {
                const val = splitInput.value.split(':')
                let time = 0
                for(let i = 1; i <= val.length; i++) {
                  let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
                  time += s * +val.at(-i)
                }

                const key = splitInput.name.replace('edit-', '')


                const _mode  = getSelected('#edit-mode',  'sel')
                const _count = getSelected('#edit-count', 'sel')
                const _speed = getSelected('#edit-speed', 'sel')
                const _size  = getSelected('#edit-size',  'sel')

                window._cat  = getSelected('#edit-cat',   'sel')

                if(!_pb[_mode]) _pb[_mode] = {}
                if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
                if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
                if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
                if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
                _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

                localStorage._snake_pb = JSON.stringify(_pb)

                splitInput.value = time === 0 ? '' : time.timeFormat()
              }
              handleChange()

              splitInput.addEventListener('keydown', function(evt) {
                if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

                setTimeout(function() {
                  splitInput.value = splitInput.value.replace(/[^\d.:]/g, '')
                }, 1)
              })
              splitInput.addEventListener('change', handleChange)


              splitDiv.appendChild(splitLabel)
              splitDiv.appendChild(splitInput)
              splitDiv.appendChild(splitDeleteButton)

              customSplitSectionDiv.appendChild(splitDiv)

            }
          }
        }
        updateToMode()


        for(const id of ['edit-mode', 'edit-count', 'edit-speed', 'edit-size', 'edit-cat'])
          for(const opt of document.getElementById(id).children) {
            opt.addEventListener('click', function() {
              for(const opt1 of document.getElementById(id).children) {
                opt1.style.border = '0.5vh ridge #00000000'
                opt1.className = 'uns'
              }
              opt.style.border = '0.5vh ridge #af4490ff'
              opt.className = 'sel'

              updateToMode()
            })
          }



        for(const subid of ['aheadg', 'aheadl', 'behindg', 'behindl']) {
          // console.log(localStorage[subid])
          const el = document.getElementById(`edit-${subid}`)
          el.value = localStorage[`_snake_${subid}`]
          el.addEventListener('change', function() {
            localStorage[`_snake_${subid}`] = el.value
          })
        }





      }
    }





  },
  alterCode: function(code) {

    code = code.replace('"--:--:---"', 'localStorage._snake_null_split')
    code = code.replace('"25"', 'Math.min(25, ...(window._splits.length === 0 ? [25] : window._splits)) || 25')

    const resetFunction = code.match(
      /reset\(\)\n?{\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?\[\];\n?var a\n?=\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?\.\n?settings[^]*?\)\}\;/
    )[0]

    /*
    const modeKey = resetFunction.match(
      /0===this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('0===this.settings.', '')
    const countKey = resetFunction.match(
      /2===this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('2===this.settings.', '')
    const speedKey = code.match(
      /0!==a\.settings\.[a-zA-Z0-9_$]{1,8}\?-10:0/
    )[0].replace('0!==a.settings.', '').replace('?-10:0', '')
    const sizeKey = resetFunction.match(
      /1!==this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('1!==this.settings.', '')
*/

    code = code.replace(resetFunction,
      resetFunction.replace(
        'reset(){',
        `reset(){this.xdddd=[];

          const _mode  = getSelected('#trophy')
          const _count = getSelected('#count')
          const _speed = getSelected('#speed')
          const _size  = getSelected('#size')

          window._run = {}
          window._run[_mode] = {}
          window._run[_mode][_count] = {}
          window._run[_mode][_count][_speed] = {}
          window._run[_mode][_count][_speed][_size] = {}
          window._run[_mode][_count][_speed][_size][_cat] = {}


          if(!window._pb) window._pb = {}
          if(!window._pb[_mode]) window._pb[_mode] = {}
          if(!window._pb[_mode][_count]) window._pb[_mode][_count] = {}
          if(!window._pb[_mode][_count][_speed]) window._pb[_mode][_count][_speed] = {}
          if(!window._pb[_mode][_count][_speed][_size]) window._pb[_mode][_count][_speed][_size] = {}
          if(!window._pb[_mode][_count][_speed][_size][_cat]) window._pb[_mode][_count][_speed][_size][_cat] = {}

          for(let __ind = window._splits.length - 1; __ind >= 0; __ind--) {
            if(!window._pb[_mode][_count][_speed][_size][_cat][window._splits[__ind]]) {
              window._splits.splice(__ind, 1)
            }
          }

          for(let __key of Object.keys(window._pb[_mode][_count][_speed][_size][_cat])) {
            if(!['25','50','100','ALL'].includes(__key) && !window._splits.includes(+__key)) {
              window._splits.push(+__key)
            }
          }


          const deltaDiv = document.getElementById('timerDelta')
          deltaDiv.innerHTML = '-'.color('white')

          window._lastDelta = 0

        `
      )
    )


    const timeFormatFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}=function\(a\){a=Math\.floor\(a\);if\(a<=0\)return[^]*?3,"0"\)}/
    )[0]


    code = code.replace(timeFormatFunction,
      timeFormatFunction.replace(
        'function(a){',
        `window._flj = function(a) {
          const _splitTimeDiv = document.getElementsByClassName('Jc72He rc48Qb')[0].children[1]
          _splitTimeDiv.innerHTML = _splitTimeDiv.innerHTML.trimStart()
        `
      ).replace(
        '"00:00:000"',
        `['0:00:00:000', '00:00:000', '0:00:000', '00:000', '0:000', '0:00:00.000', '00:00.000', '0:00.000', '00.000', '0.000'][_format]`
      ).replace(
        'if(600<=b)return"9:59:59:999";',
        ''
      ).replace(
        'return(0===c?"":c.toString()+":")+(b%60).toString().padStart(2,"0")+":"+(Math.floor(a/1E3)%60).toString().padStart(2,"0")+":"+(a%1E3).toString().padStart(3,"0")',
        `
        const _hours = c === 0 ? "" : c.toString() + ":"
        const _minutes = b % 60
        const _seconds = (Math.floor(a / 1E3) % 60).toString()
        const _millis = (a % 1E3).toString().padStart(3, "0")
        return [
          c.toString() + ":" + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,_hours || _minutes ? "0" : " ") + ":" + _millis,

          c.toString() + ":" + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,"0") + "." + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,_hours || _minutes ? "0" : " ") + "." + _millis,
        ][_format]`
      )
    )

    const stuffBlock = code.match(
      /[a-zA-Z0-9_$]{1,8}=this\.header,[a-zA-Z0-9_$]{1,8}=\n?this\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}=this\.ticks,[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8};/
    )[0]
    const score = stuffBlock.match(/header,[a-zA-Z0-9_$]{1,8}=\n?this\.[a-zA-Z0-9_$]{1,8}/)[0].replace(/header,[a-zA-Z0-9_$]{1,8}=/,'')
    const ticks = stuffBlock.match(/[a-zA-Z0-9_$]{1,8}=this\.ticks/)[0].replace(/[a-zA-Z0-9_$]{1,8}=/,'')
    const dt    = stuffBlock.match(/ticks,[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}/)[0].replace(/ticks,[a-zA-Z0-9_$]{1,8}=/,'')



    const splitStuff = code.match(
      /if\(2?5?=?=?=?\n?[a-zA-Z0-9_$]{1,8}=?=?=?2?5?\|\|5?0?=?=?=?[a-zA-Z0-9_$]{1,8}=?=?=?5?0?\|\|1?0?0?=?=?=?[a-zA-Z0-9_$]{1,8}=?=?=?1?0?0?\)/
    )[0]

    code = code.replace(
      splitStuff,
      `
      if([25, 50, 100].includes(${score}) || window._splits.includes(${score})) {
        const deltaDiv = document.getElementById('timerDelta')
        const _mode  = getSelected('#trophy')
        const _count = getSelected('#count')
        const _speed = getSelected('#speed')
        const _size  = getSelected('#size')

        const _split = ${ticks} * ${dt} * 1e-3

        window._run[_mode][_count][_speed][_size][_cat][${score}] = _split

        if(window._pb[_mode][_count][_speed][_size][_cat][${score}]) {
          const _delta = _split - window._pb[_mode][_count][_speed][_size][_cat][${score}]
          const _absDeltaString = Math.abs(_delta).timeFormat()
          if(_delta !== 0)
            deltaDiv.innerHTML = ((_delta < 0 ? '-' : '+') + _absDeltaString).color(
              localStorage[
                _delta > 0 ?
                  _delta > _lastDelta ? '_snake_behindl' : '_snake_behindg'
                :
                  _delta > _lastDelta ? '_snake_aheadl'  : '_snake_aheadg'
              ]
            )
          else
            deltaDiv.innerHTML = '-'.color('white')



          window._lastDelta = _delta
        } else {
          deltaDiv.innerHTML = '-'.color('white')
        }

        if(
          (
            (${score} === 25  && _cat === 0) ||
            (${score} === 50  && _cat === 1) ||
            (${score} === 100 && _cat === 2)
          ) && (
            !window._pb[_mode][_count][_speed][_size][_cat][${score}] ||
            _split - window._pb[_mode][_count][_speed][_size][_cat][${score}] < 0
          )
        ) {
          window._pb[_mode][_count][_speed][_size][_cat] = window._run[_mode][_count][_speed][_size][_cat]
          localStorage._snake_pb = JSON.stringify(window._pb)
        }





      }


      if([25, 50, 100].includes(${score}) || window._splits.includes(${score}))

      `
    )

    const winStuff = code.match(
      /_\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},"ALL"\);/
    )[0]

    code = code.replace(
      winStuff,
      `
      ${winStuff}
      const deltaDiv = document.getElementById('timerDelta')
      const _mode  = getSelected('#trophy')
      const _count = getSelected('#count')
      const _speed = getSelected('#speed')
      const _size  = getSelected('#size')

      const _time = ${ticks} * ${dt} * 1e-3

      let _delta = NaN

      window._run[_mode][_count][_speed][_size][_cat]['ALL'] = _time
      if(window._pb[_mode][_count][_speed][_size][_cat]['ALL']) {
        _delta = _time - window._pb[_mode][_count][_speed][_size][_cat]['ALL']
        const _absDeltaString = Math.abs(_delta).timeFormat()
        if(_delta !== 0)
          deltaDiv.innerHTML = ((_delta < 0 ? '-' : '+') + _absDeltaString).color(
            localStorage[
              _delta > 0 ?
                _delta > _lastDelta ? '_snake_behindl' : '_snake_behindg'
              :
                _delta > _lastDelta ? '_snake_aheadl'  : '_snake_aheadg'
            ]
          )
        else
          deltaDiv.innerHTML = '-'.color('white')
      } else {
        deltaDiv.innerHTML = '-'.color('white')
      }

      if(_delta < 0 || isNaN(_delta)) {
        window._pb[_mode][_count][_speed][_size][_cat] = window._run[_mode][_count][_speed][_size][_cat]
        localStorage._snake_pb = JSON.stringify(window._pb)
      }



      `
    )

    return code
  }
}
window.BootstrapMenu = {};

window.BootstrapMenu.make = function () {

    window.bootstrapVisible = false;

    window.BootstrapShow = function () {
        const settingsBox = document.getElementById('settings-popup-pudding');
        settingsBox.style.display = 'block';
        settingsBox.style.visibility = 'visible';
        window.bootstrapVisible = true;

    }

    window.BootstrapHide = function () {
        const settingsBox = document.getElementById('settings-popup-pudding');
        settingsBox.style.visibility = 'hidden';
        if (typeof window.PortalPairsPanelHide === "function") {
            window.PortalPairsPanelHide();
        }
        if (window.bootstrapVisible && typeof window.getAllSrc != "undefined") {
            window.getAllSrc();
        }
        window.bootstrapVisible = false;

    }

    random_button_jsname = 'qycu7d' // Hardcoded because I'm lazy

    // Get the button by its jsname attribute
    window.random_button = document.querySelector(`[jsname="${random_button_jsname}"]`);

    // Disable the button
    window.ToggleRandom = function () {
        window.pudding_settings.DisableRandom = !window.pudding_settings.DisableRandom;
        if (window.pudding_settings.DisableRandom) {
            // Disable it
            random_button.style.pointerEvents = 'none';
        }
        else {
            // Enable it
            random_button.style.pointerEvents = 'auto';
        }
    }

    window.ToggleScrollbar = function () {
        window.pudding_settings.ScrollBar = !window.pudding_settings.ScrollBar;
        if (window.pudding_settings.ScrollBar) {
            // Disable it
            document.body.style.overflow = 'hidden';
        }
        else {
            // Enable it
            document.body.style.overflow = '';
        }
    }


    window.BootstrapSetup = function () {

        const a = new Image();
        a.src = getStatIconImageSrc();
        a.id = 'stat-icon';
        a.width = a.height = 25;
        a.style = 'position:relative;left:200px;top:70px;';
        window.divList = document.createElement('div');
        divList.class = 'counter-num'
        divList.style = 'width:25px;z-index:5;position:relative;left:230px;top:45px;font-size:14px;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;line-height: normal;'
        divList.id = 'counter-num'

        document.getElementsByClassName('sEOCsb')[0].appendChild(a);
        document.getElementsByClassName('sEOCsb')[0].appendChild(divList);

        const d = document.createElement('div');
        d.id = 'input-counter-settings-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10002;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);

        const css_stripped = window.NepDebug
            ? "http://127.0.0.1:5500/bootstrap-stripped.css"
            : 'https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/bootstrap-stripped.css';

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const cssText = xhr.responseText;
                window.bootstrap_css = cssText;

                const styleElement = document.getElementsByTagName('style')[0];
                if (styleElement) {
                    styleElement.innerHTML = styleElement.innerHTML + cssText;
                }

                let styleElnew = document.getElementById('custom-style');
                if (!styleElnew) {
                    styleElnew = document.createElement('style');
                    styleElnew.id = 'custom-style';
                    document.head.appendChild(styleElnew);
                    styleElnew.innerHTML = cssText;
                }
            } else {
                console.error('Failed to load Bootstrap CSS:', xhr.status, xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error('Network error while loading Bootstrap CSS');
        };

        xhr.ontimeout = function () {
            console.error('Timeout while loading Bootstrap CSS');
        };

        xhr.timeout = 10000;
        xhr.open('GET', css_stripped, true);
        xhr.send();

        const settingsBox = document.createElement('div');
        settingsBox.style = window.puddingSidebarStyle;
        settingsBox.style.display = 'none';
        settingsBox.id = 'settings-popup-pudding';
        settingsBox.innerHTML = `

        <script src="https://code.jquery.com/jquery-3.7.0.slim.js" integrity="sha256-7GO+jepT9gJe9LB4XFf8snVOjX3iYNb0FHYr5LI1N5c=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

        <span style="color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center;">Pudding Mod Settings</span>

    <select style="margin-top:3px;margin-bottom:3px;margin-left: auto; margin-right: auto;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center; align:center;" id="stat-chooser" class="form-control">
        <option value="inputGame">Count game inputs</option>
        <option value="inputSession">Count session inputs</option>
        <option value="inputLifetime">Count lifetime inputs</option>
        <option value="playsSession">Count session resets</option>
        <option value="playsLifetime">Count lifetime resets</option>
        <option value="applesSession">Count fruit session</option>
        <option value="applesLifetime">Count fruit lifetime</option>
        <option value="wallsGame">Count walls</option>
        <option value="hideCount">Hide counter</option>
    </select>

  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="edit-stat">Edit stat</button>
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="reset-stats">Reset stats</button><br>
  <button class="btn" style="display:none;margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="time-keeper" jsname="time-keeper">Show TimeKeeper</button>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="SkullPoisonFruit">
    <label class="form-check-label" for="SkullPoisonFruit" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Skull Poison Fruit</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="DistinctSokoGoals">
    <label class="form-check-label" for="DistinctSokoGoals" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Distinct Soko Goals</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="InputDisplay">
    <label class="form-check-label" for="InputDisplay" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Input Display</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="TopBarIcons">
    <label class="form-check-label" for="TopBarIcons" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Top Bar Icons</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="AlwaysOnTimeKeeper">
    <label class="form-check-label" for="AlwaysOnTimeKeeper" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Show SpeedInfo</label>
    </div>
    <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="TimerSettings">Timer settings</button><br>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="DisableRandom">
    <label class="form-check-label" for="DisableRandom" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Disable Randomizer</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="RemoveScrollbar">
    <label class="form-check-label" for="RemoveScrollbar" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Remove Scrollbar</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="EatThemeRandomizer">
    <label class="form-check-label" for="EatThemeRandomizer" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;" id="EatThemeRandomizer2">"Dragon Fruit"</label>
    </div>
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="ResetKeybind">Reset Key: Shift</button><br>
  <button type="button" class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="CustomBowlFruits" onclick="window.TogglePortalPairsPanel&&window.TogglePortalPairsPanel()">Custom Bowl Fruits</button><br>
    </div>

<select style="display:none;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif; align-items: center; text-align: center;" id="snakePride" class="form-control flex-row">
  <option value="0">Default Rainbow</option>
</select>

  <button class="btn" style="display:none;margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="settings-close" jsname="settings-close">Close</button>

  <br>
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="ScrollLeftBtn">Scroll Left</button><br>

  `;

  document.getElementsByClassName('sEOCsb')[0].appendChild(settingsBox);

        timer_settings = document.getElementById("TimerSettings");
        timer_settings.addEventListener("click", window.editTimer);

        ScrollLeftBtn = document.getElementById("ScrollLeftBtn");
        ScrollLeftBtn.style.display = 'none';

        EatThemeRandomizer = document.getElementById("EatThemeRandomizer");
        EatThemeRandomizer2 = document.getElementById("EatThemeRandomizer2");
        EatThemeRandomizer.checked = window.pudding_settings.randomizeThemeApple;
        EatThemeRandomizer.addEventListener("change", function() {
            window.pudding_settings.randomizeThemeApple = !window.pudding_settings.randomizeThemeApple;
        });


        skull_checkbox = document.getElementById("SkullPoisonFruit");
        skull_checkbox.checked = window.pudding_settings.Skull;
        skull_checkbox.addEventListener("change", toggle_skull_func);

        soko_checkbox = document.getElementById("DistinctSokoGoals");
        soko_checkbox.checked = window.pudding_settings.SokoGoals;
        soko_checkbox.addEventListener("change", toggle_soko_goal);

        input_checkbox = document.getElementById("InputDisplay");
        input_checkbox.addEventListener("change", toggle_input_display);
        input_checkbox.checked = window.pudding_settings.InputDisplay;
        toggle_input_display();

        topbar_checkbox = document.getElementById("TopBarIcons");
        topbar_checkbox.addEventListener("change", window.toggle_topbar_icons);
        topbar_checkbox.checked = window.pudding_settings.TopBar;

        speedinfo_checkbox = document.getElementById("AlwaysOnTimeKeeper");
        speedinfo_checkbox.addEventListener("change", window.ToggleSpeedInfo);
        speedinfo_checkbox.checked = window.pudding_settings.SpeedInfo;

        randombtn_checkbox = document.getElementById("DisableRandom");
        randombtn_checkbox.addEventListener("change", window.ToggleRandom);
        randombtn_checkbox.checked = window.pudding_settings.DisableRandom;

        if (window.pudding_settings.DisableRandom) {
            // Disable it
            random_button.style.pointerEvents = 'none';
        }
        else {
            // Enable it
            random_button.style.pointerEvents = 'auto';
        }

        scrollbtn_checkbox = document.getElementById("RemoveScrollbar");
        scrollbtn_checkbox.addEventListener("change", window.ToggleScrollbar);
        scrollbtn_checkbox.checked = window.pudding_settings.ScrollBar;

        if (window.pudding_settings.ScrollBar) {
            // Disable it
            document.body.style.overflow = 'hidden';
        }
        else {
            // Enable it
            document.body.style.overflow = '';
        }

        if (localStorage.getItem('snakeChosenMod') === "PuddingMod" || window.NepDebug) {
            EatThemeRandomizer.style.display = 'none';
            EatThemeRandomizer2.style.display = 'none';
            EatThemeRandomizer.checked = false;
            window.pudding_settings.randomizeThemeApple = false;
            EatThemeRandomizer.parentElement.style.display = 'none';
        } else
        {
            EatThemeRandomizer.parentElement.style.display = 'block';
            console.log("Disabling SpeedInfo")
            speedinfo_checkbox.disabled = true;
            speedinfo_checkbox.checked = false;
            window.SpeedInfoHide();
        }

        if(window.isSnakeMobileVersion){
            speedinfo_checkbox.disabled = true;
            speedinfo_checkbox.checked = false;
            window.SpeedInfoHide();

            input_checkbox.disabled = true;
            ScrollLeftBtn.style.display = '';
            ScrollLeftBtn.addEventListener("click", function () {
                document.documentElement.scrollLeft -= 800;
            });
        }

        let settingsToValues = {
            inputs: {
                game: 'inputGame',
                session: 'inputSession',
                lifetime: 'inputLifetime'
            },
            plays: {
                session: 'playsSession',
                lifetime: 'playsLifetime'
            },
            apples: {
                session: 'applesSession',
                lifetime: 'applesLifetime'
            },
            walls: {
                game: 'wallsGame'
            },
            hide: {
                count: 'hideCount'
            }
        }

        let valuesToSettings = {
            inputGame: { stat: 'inputs', duration: 'game' },
            inputSession: { stat: 'inputs', duration: 'session' },
            inputLifetime: { stat: 'inputs', duration: 'lifetime' },
            playsSession: { stat: 'plays', duration: 'session' },
            playsLifetime: { stat: 'plays', duration: 'lifetime' },
            applesSession: { stat: 'apples', duration: 'session' },
            applesLifetime: { stat: 'apples', duration: 'lifetime' },
            wallsGame: { stat: 'walls', duration: 'game' },
            hideCount: { stat: 'hide', duration: 'count' },
        }

        document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

        const settingsCloseElements = document.getElementById('settings-close');
        settingsCloseElements.addEventListener('click', window.BootstrapHide);

        document.getElementById('stat-chooser').onchange = function () {
            stats.statShown = valuesToSettings[this.value].stat;
            stats.statDurationShown = valuesToSettings[this.value].duration;
            document.getElementById('stat-icon').src = getStatIconImageSrc();
            updateCounterDisplay();
        }

        document.getElementById('edit-stat').addEventListener('click', promptToEditStatCount);
        document.getElementById('reset-stats').addEventListener('click', promptToResetStats);
    }

    window.BootstrapSetup();

    window.ToggleBootstrap = function () {
        if (!window.bootstrapVisible) {
            // Show it
            window.BootstrapShow();
        }
        else {
            // Hide it
            window.BootstrapHide();
        }
    }

    //Listeners to hide/show settings box
    const settingsButton = 'iyH4Cb';
    document.querySelector("div[jsname^=\"" + settingsButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapShow();
        if (window.isSnakeMobileVersion) {
            window.enableScrollMobile();
            if (localStorage.getItem('snakeChosenMod') === "VisibilityMod") {
                document.getElementById('delete-stuff-popup').hidden = false;
            }
        }
    });

    const backButton = 'p17HVe';
    document.querySelector("[class^=\"" + backButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapHide();
        if (window.isSnakeMobileVersion) {
            if (localStorage.getItem('snakeChosenMod') === "VisibilityMod") {
                document.getElementById('delete-stuff-popup').hidden = true;
            }
        }
    });

    const playButton = 'NSjDf';
    document.querySelector("[jsname^=\"" + playButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapHide();
        if (window.isSnakeMobileVersion) {
            if (localStorage.getItem('snakeChosenMod') === "VisibilityMod") {
                document.getElementById('delete-stuff-popup').hidden = true;
            }
        }
    });


    // Function to enable horizontal scroll
    window.enableScrollMobile = function () {
        // Enable scroll by setting overflow to auto
        document.body.style.overflowX = 'auto';
        document.documentElement.scrollLeft = document.documentElement.scrollWidth;
    }

}

window.BootstrapMenu.alterCode = function (code) {
    if(window.pudding_settings.SpeedInfo)
    {
        window.SpeedInfoShow();
    }
    return code;
}
window.ResetKey = {}

window.ResetKey.make = function (){
  keybind_settings = document.getElementById("ResetKeybind"); // keybind changer

  // Code for reset key
  let keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
  function setupKeybindPicker(buttonId, keybindType) {
      const button = document.getElementById(buttonId);
      if(!keybinds[keybindType]){
          keybinds[keybindType] = "Shift";
      }
      button.textContent = `Reset Key: ${keybinds[keybindType]}`;

      button.addEventListener("click", () => {
          button.textContent = "Press any key...";
          document.addEventListener("keydown", function handler(e) {
          keybinds[keybindType] = e.key;
          button.textContent = `Reset Key: ${e.key}`;
          localStorage.setItem("keybinds", JSON.stringify(keybinds));
          document.removeEventListener("keydown", handler);
          });
      });
  }

  // Apply to each bind
  setupKeybindPicker("ResetKeybind", "resetKey");
}

window.ResetKey.alterCode = function(code){
  document.addEventListener('keydown', function(e){
    let keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
    let resetButton = document.getElementById('ResetKeybind');
    let isSettingKeybind = resetButton && resetButton.textContent === "Press any key...";
    if(!(isSettingKeybind || window.timeKeeper.dialogActive || document.getElementById('edit-box'))){
        if(e.key === keybinds["resetKey"]){
            const keydownEvent = new KeyboardEvent('keydown', {
                keyCode: 27
            });
            document.dispatchEvent(keydownEvent);
            document.querySelector('[jsname="NSjDf"]').click();
        }
    }
  });
  return code
}
// Hold the first game tick until the board has visually rendered once.
// Four hooks: render() stamps lastFrameTime; reset() stamps resetTime and
// drains a delayed key; the key handler queues early inputs until then.

window.RenderDelayFix = {};

window.RenderDelayFix.make = function () {
  window.lastFrameTime = 0;
  window.resetTime = 0;
  window.oldResetTime = 0;
  window.delayedKeyStorage = false;
  window.keyObject = false;
  window.stuffKeys = ()=>{};
}

window.RenderDelayFix.alterCode = function (code) {
  code = assertReplace(
    code,
    /render\s*\(\s*a\s*,\s*b\s*\)\s*\{\s*this\.([a-zA-Z0-9_$]{1,8})\.([a-zA-Z0-9_$]{1,8})\s*&&/,
    "render(a,b){window.lastFrameTime=Date.now();if(window.resetTime!=window.oldResetTime){window.oldResetTime=window.resetTime;}this.$1.$2&&"
  );
  // Capture all three props — v11 uses Bb.oa.oa, v12 uses wb.ka.ka
  code = assertReplace(
    code,
    /reset\s*\(\s*\)\s*\{\s*this\.([a-zA-Z0-9_$]{1,8})\.([a-zA-Z0-9_$]{1,8})\.([a-zA-Z0-9_$]{1,8})\s*=\s*0\s*;/,
    "reset(){window.resetTime=Date.now();setTimeout(()=>{if(delayedKeyStorage){stuffKeys.call(keyObject,delayedKeyStorage);delayedKeyStorage=false;keyObject=false}},20);this.$1.$2.$3=0;"
  );
  code = assertReplace(
    code,
    /([a-zA-Z0-9_$]{1,8})\s*\(\s*a\s*\)\s*\{\s*if\s*\(\s*!this\.closed\s*\)\s*\{/,
    "$1=window.stuffKeys=function(a){if(!this.closed){if(window.resetTime<window.lastFrameTime){"
  );
  code = assertReplace(
    code,
    /a\.preventDefault\s*\(\s*\)\s*\}\s*\}\}/,
    "a.preventDefault()}}else{delayedKeyStorage=a;keyObject=this}}};"
  );
  return code;
}
window.CustomBowl = {};

window.CustomBowl.make = function () {
    const FRUIT_BOWL_INDEX = 24;
    const COUNT_MINIMA = {
        0: 1,  // 1a
        1: 3,  // 3a
        2: 5,  // 5a
        3: 10, // 10a
        4: 6,  // dice
        5: 24, // bomb
        6: 5   // tally
    };
    const BOWL_SPRITE = "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_22.png";

    window.custom_pair_call_counter = 0;
    window.__portalAppleArrayName = window.__portalAppleArrayName || "ka";
    window.__customBowlCountOverride = null;

    function getCountIndex() {
        if (typeof window.__customBowlCountOverride === "number" && !isNaN(window.__customBowlCountOverride)) {
            return window.__customBowlCountOverride;
        }
        if (window.timeKeeper && typeof window.timeKeeper.getCurrentSetting === "function") {
            const c = window.timeKeeper.getCurrentSetting("count");
            if (typeof c === "number" && !isNaN(c)) return c;
        }
        if (typeof window.count_var !== "undefined") {
            const c = Number(window.count_var);
            if (!isNaN(c)) return c;
        }
        return 0;
    }

    window.getPortalPairMinimum = function () {
        const count = getCountIndex();
        return COUNT_MINIMA.hasOwnProperty(count) ? COUNT_MINIMA[count] : 1;
    };

    function countKey(count) {
        return String(count);
    }

    function defaultPoolForCount(count) {
        const min = COUNT_MINIMA.hasOwnProperty(count) ? COUNT_MINIMA[count] : 1;
        return normalizePool([], min);
    }

    function normalizePool(pool, min) {
        let next = Array.isArray(pool) ? pool.map(Number).filter((n) => !isNaN(n) && n !== FRUIT_BOWL_INDEX) : [];
        next = Array.from(new Set(next));
        if (next.length < min) {
            for (let i = 0; i < 64 && next.length < min; i++) {
                if (i === FRUIT_BOWL_INDEX) continue;
                if (!next.includes(i)) next.push(i);
            }
        }
        return next;
    }

    function ensurePairsByCountStore() {
        if (!window.pudding_settings.SelectedPairsByCount || typeof window.pudding_settings.SelectedPairsByCount !== "object") {
            window.pudding_settings.SelectedPairsByCount = {};
        }
        for (const c of Object.keys(COUNT_MINIMA)) {
            const key = countKey(c);
            if (!Array.isArray(window.pudding_settings.SelectedPairsByCount[key])) {
                window.pudding_settings.SelectedPairsByCount[key] = defaultPoolForCount(Number(c));
            }
        }
    }

    function getPoolForCurrentCount(minOverride) {
        ensurePairsByCountStore();
        const count = getCountIndex();
        const key = countKey(count);
        const min = Math.max(window.getPortalPairMinimum(), minOverride || 0);
        const pool = normalizePool(window.pudding_settings.SelectedPairsByCount[key], min);
        window.pudding_settings.SelectedPairsByCount[key] = pool;
        window.pudding_settings.SelectedPairs = pool;
        return pool;
    }

    function setPoolForCurrentCount(pool) {
        ensurePairsByCountStore();
        const count = getCountIndex();
        const key = countKey(count);
        const min = window.getPortalPairMinimum();
        const next = normalizePool(pool, min);
        window.pudding_settings.SelectedPairsByCount[key] = next;
        window.pudding_settings.SelectedPairs = next;
        return next;
    }

    function ensurePoolMeetsMinimum() {
        return getPoolForCurrentCount();
    }

    function getAppleList(appleManager) {
        if (!appleManager) return null;
        const key = window.__portalAppleArrayName || "ka";
        if (Array.isArray(appleManager[key])) return appleManager[key];
        if (Array.isArray(appleManager.ka)) return appleManager.ka;
        return null;
    }

    // Types currently visible on the board (type < 0 = slot being reassigned, not showing).
    function typesOnBoard(appleManager) {
        const showing = new Set();
        const apples = getAppleList(appleManager);
        if (!apples) return showing;
        for (const apple of apples) {
            if (!apple) continue;
            const t = Number(apple.type);
            if (!isNaN(t) && t >= 0) showing.add(t);
        }
        return showing;
    }

    function isCustomBowlActive(settings) {
        if (!(window.pudding_settings && window.pudding_settings.PortalPairs && settings)) return false;
        const prop = window.__fruitBowlSettingProp || "Ka";
        return Number(settings[prop]) === 24;
    }

    function syncCountOverride(settings) {
        if (settings && typeof settings.ka === "number" && !isNaN(settings.ka)) {
            window.__customBowlCountOverride = settings.ka;
        }
    }

    /**
     * Roll a fruit from the custom bowl pool.
     * Portal mode only: allowed = selected − types showing on screen.
     * If allowed is empty (e.g. 5 selected on 5a after clearing the eaten pair),
     * fall back to the full pool so the eaten type can reappear.
     * Non-portal: plain random from the selected pool (duplicates allowed).
     */
    window.pickCustomPortalType = function (appleManager, isPortal) {
        syncCountOverride(appleManager && appleManager.settings);
        try {
            const pool = ensurePoolMeetsMinimum();
            if (!pool.length) return 0;
            if (!isPortal) {
                return pool[Math.floor(Math.random() * pool.length)];
            }
            const showing = typesOnBoard(appleManager);
            const available = pool.filter((t) => !showing.has(t));
            const source = available.length > 0 ? available : pool;
            return source[Math.floor(Math.random() * source.length)];
        } finally {
            window.__customBowlCountOverride = null;
        }
    };

    // Portal-only full board assign: clear slots, then roll with showing-list rules.
    window.assignCustomPortalPairTypes = function (appleManager) {
        if (!appleManager || !isCustomBowlActive(appleManager.settings)) return false;
        const apples = getAppleList(appleManager);
        if (!apples || apples.length < 2) return false;

        for (let i = 0; i < apples.length; i++) apples[i].type = -1;

        for (let i = 0; i < apples.length; i += 2) {
            const t = window.pickCustomPortalType(appleManager, true);
            apples[i].type = t;
            if (apples[i + 1]) apples[i + 1].type = t;
        }
        return true;
    };

    // Portal-only safety: if two pairs share a type, re-roll with showing-list rules.
    window.enforceUniquePortalFruitTypes = function (appleManager) {
        if (!appleManager || !isCustomBowlActive(appleManager.settings)) return;
        const apples = getAppleList(appleManager);
        if (!apples || apples.length < 2) return;

        const seen = new Set();
        for (let i = 0; i < apples.length; i += 2) {
            const a0 = apples[i];
            const a1 = apples[i + 1];
            let t = Number(a0 && a0.type);
            if (isNaN(t) || t < 0 || seen.has(t)) {
                if (a0) a0.type = -1;
                if (a1) a1.type = -1;
                t = window.pickCustomPortalType(appleManager, true);
                if (a0) a0.type = t;
                if (a1) a1.type = t;
            } else if (a1 && Number(a1.type) !== t) {
                a1.type = t;
            }
            seen.add(t);
        }
    };

    window.give_custom_pair = function () {
        return window.pickCustomPortalType(null, true);
    };
    window.startCustomBowlDeal = function () { /* no-op */ };
    window.endCustomBowlDeal = function () { /* no-op */ };

    function getFruitSrc(index) {
        const apple = document.querySelector("#apple");
        if (apple && apple.children[index] && apple.children[index].src) {
            return apple.children[index].src;
        }
        if (index < FRUIT_BOWL_INDEX) {
            const ver = index >= 22 ? "v18" : "v17";
            const num = String(index).padStart(2, "0");
            return `https://www.google.com/logos/fnbx/snake_arcade/${ver}/apple_${num}.png`;
        }
        return BOWL_SPRITE;
    }

    function buildFruitOptions() {
        const apple = document.querySelector("#apple");
        const options = [];
        if (!apple) return options;
        for (let i = 0; i < apple.children.length; i++) {
            if (i === FRUIT_BOWL_INDEX) continue;
            options.push(i);
        }
        return options;
    }

    function updateStatusLabel() {
        const el = document.getElementById("fruit-bowl-status");
        if (!el) return;
        const pool = getPoolForCurrentCount();
        const min = window.getPortalPairMinimum();
        el.textContent = `Selected ${pool.length} / min ${min}`;
    }

    function renderFruitGrid() {
        const grid = document.getElementById("fruit-bowl-grid");
        if (!grid) return;
        const pool = new Set(ensurePoolMeetsMinimum());
        const options = buildFruitOptions();
        const min = window.getPortalPairMinimum();
        grid.innerHTML = "";

        const rowSize = 6;
        for (let i = 0; i < options.length; i += rowSize) {
            const row = document.createElement("div");
            row.style = "display:flex;flex-wrap:nowrap;gap:8px;margin-bottom:8px;justify-content:center;";
            options.slice(i, i + rowSize).forEach((fruitIndex) => {
                const selected = pool.has(fruitIndex);
                const cell = document.createElement("div");
                cell.className = "blender_icon" + (selected ? " blender_icon_on" : "");
                cell.style = "width:52px;height:52px;padding-bottom:0;flex:0 0 52px;display:flex;align-items:center;justify-content:center;cursor:pointer;";
                cell.dataset.fruit = String(fruitIndex);
                cell.title = `Fruit ${fruitIndex}`;

                const img = document.createElement("img");
                img.className = "blender_icon_img" + (selected ? " blender_icon_img_selected" : "");
                img.src = getFruitSrc(fruitIndex);
                img.draggable = false;
                img.style = "width:44px;height:44px;max-width:100%;";
                cell.appendChild(img);

                cell.addEventListener("click", function () {
                    if (!window.pudding_settings.PortalPairs) return;
                    const current = getPoolForCurrentCount().slice();
                    const idx = current.indexOf(fruitIndex);
                    if (idx >= 0) {
                        if (current.length <= min) return;
                        current.splice(idx, 1);
                    } else {
                        current.push(fruitIndex);
                    }
                    setPoolForCurrentCount(current.sort((a, b) => a - b));
                    if (typeof window.saveSettings === "function") window.saveSettings();
                    renderFruitGrid();
                    updateStatusLabel();
                });

                row.appendChild(cell);
            });
            grid.appendChild(row);
        }
        updateStatusLabel();
    }

    function syncPanelEnabledState() {
        const toggle = document.getElementById("fruit-bowl-enable");
        if (toggle) toggle.checked = !!window.pudding_settings.PortalPairs;
        const grid = document.getElementById("fruit-bowl-grid");
        if (grid) {
            grid.style.opacity = window.pudding_settings.PortalPairs ? "1" : "0.45";
            grid.style.pointerEvents = window.pudding_settings.PortalPairs ? "auto" : "none";
        }
    }

    // Theme background is applied separately via applyPanelTheme (Theme.js sets real_topbar_color).
    const PANEL_STYLE =
        "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100000;" +
        "padding:18px 20px 16px;display:none;border-radius:8px;" +
        "width:min(480px,92vw);min-width:280px;height:auto;min-height:320px;max-height:min(720px,88vh);" +
        "overflow-x:hidden;overflow-y:auto;visibility:hidden;box-sizing:border-box;" +
        "box-shadow:0 12px 36px rgba(0,0,0,0.5);border:2px solid rgba(255,255,255,0.18);";

    const BACKDROP_STYLE =
        "position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:99999;" +
        "background:rgba(0,0,0,0.45);display:none;visibility:hidden;";

    function applyPanelTheme(panel) {
        if (!panel) return;
        const color = window.real_topbar_color || "#4a752c";
        panel.style.background = color;
        panel.style.backgroundColor = color;
    }

    function getPanelHost() {
        return document.body;
    }

    function ensureUi() {
        const host = getPanelHost();
        if (!host) return;

        document.querySelectorAll("#fruit-bowl-settings-icon").forEach((el) => el.remove());

        // If an old tiny in-game panel exists, rebuild it.
        const existing = document.getElementById("fruit-bowl-popup-pudding");
        if (existing && existing.parentElement !== host) {
            existing.remove();
            const oldBd = document.getElementById("fruit-bowl-backdrop-pudding");
            if (oldBd) oldBd.remove();
        }

        const legacy = document.getElementById("portal-pairs-popup-pudding");
        if (legacy) legacy.remove();

        let backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "fruit-bowl-backdrop-pudding";
            backdrop.style.cssText = BACKDROP_STYLE;
            backdrop.addEventListener("click", function () {
                window.PortalPairsPanelHide();
            });
            host.appendChild(backdrop);
        } else if (backdrop.parentElement !== host) {
            host.appendChild(backdrop);
        }

        let panel = document.getElementById("fruit-bowl-popup-pudding");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "fruit-bowl-popup-pudding";
            panel.style.cssText = PANEL_STYLE;
            panel.innerHTML = `
                <div style="color:white;font-family:Roboto,Arial,sans-serif;text-align:center;margin-bottom:14px;font-size:18px;font-weight:bold;letter-spacing:0.2px;">Fruit Bowl Settings</div>
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin:0 auto 12px;width:100%;">
                    <input class="form-check-input" type="checkbox" role="switch" id="fruit-bowl-enable" style="margin:0;float:none;position:static;">
                    <label class="form-check-label" for="fruit-bowl-enable" style="margin:0;color:white;font-family:Roboto,Arial,sans-serif;font-size:14px;line-height:1.2;">Enable custom fruit bowl</label>
                </div>
                <div id="fruit-bowl-status" style="color:#dce8c8;font-family:Roboto,Arial,sans-serif;font-size:13px;margin:0 0 12px 0;text-align:center;"></div>
                <div id="fruit-bowl-grid" style="padding:4px 0 8px;display:flex;flex-direction:column;align-items:center;"></div>
                <button type="button" class="btn" style="margin-top:8px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;width:100%;padding:8px 12px;font-size:14px;" id="fruit-bowl-close">Close</button>
            `;
            host.appendChild(panel);
            applyPanelTheme(panel);

            document.getElementById("fruit-bowl-enable").addEventListener("change", function () {
                window.pudding_settings.PortalPairs = !!this.checked;
                ensurePoolMeetsMinimum();
                if (typeof window.saveSettings === "function") window.saveSettings();
                syncPanelEnabledState();
                renderFruitGrid();
            });
            document.getElementById("fruit-bowl-close").addEventListener("click", function () {
                window.PortalPairsPanelHide();
            });
        } else {
            if (panel.parentElement !== host) host.appendChild(panel);
            const shown = !!window.portalPairsPanelVisible;
            panel.style.cssText = PANEL_STYLE + (shown
                ? "display:block;visibility:visible;"
                : "display:none;visibility:hidden;");
            applyPanelTheme(panel);
            backdrop.style.cssText = BACKDROP_STYLE + (shown
                ? "display:block;visibility:visible;"
                : "display:none;visibility:hidden;");
        }

        syncPanelEnabledState();
        renderFruitGrid();
    }

    window.PortalPairsPanelShow = function () {
        ensureUi();
        try { ensurePoolMeetsMinimum(); } catch (e) { /* settings may still be loading */ }
        syncPanelEnabledState();
        renderFruitGrid();
        const panel = document.getElementById("fruit-bowl-popup-pudding");
        const backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (panel) {
            panel.style.display = "block";
            panel.style.visibility = "visible";
            applyPanelTheme(panel);
        }
        if (backdrop) {
            backdrop.style.display = "block";
            backdrop.style.visibility = "visible";
        }
        window.portalPairsPanelVisible = true;
    };

    window.PortalPairsPanelHide = function () {
        const panel = document.getElementById("fruit-bowl-popup-pudding");
        const backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (panel) {
            panel.style.display = "none";
            panel.style.visibility = "hidden";
        }
        if (backdrop) {
            backdrop.style.display = "none";
            backdrop.style.visibility = "hidden";
        }
        window.portalPairsPanelVisible = false;
    };

    window.TogglePortalPairsPanel = function () {
        if (window.portalPairsPanelVisible) window.PortalPairsPanelHide();
        else window.PortalPairsPanelShow();
    };

    window.CustomBowlSyncUi = function () {
        if (!window.portalPairsPanelVisible) return;
        ensurePoolMeetsMinimum();
        syncPanelEnabledState();
        renderFruitGrid();
    };

    setTimeout(function () {
        try { ensurePoolMeetsMinimum(); } catch (e) { /* ignore */ }
        ensureUi();
        window.PortalPairsPanelHide();
    }, 0);
};

window.CustomBowl.alterCode = function (code) {
    const reset_regex = new RegExp(/;this\.reset\(\)\}\}/);
    catchError(reset_regex, code);
    code = code.assertReplace(reset_regex, `window.custom_pair_call_counter=0;$&`);

    code = code.assertReplace(
        /case "apple":/,
        `case "apple":setTimeout(function(){window.CustomBowlSyncUi&&window.CustomBowlSyncUi()},0);`
    );
    code = code.assertReplace(
        /case "count":/,
        `case "count":setTimeout(function(){window.CustomBowlSyncUi&&window.CustomBowlSyncUi()},0);`
    );

    const aaf_regex = /([a-zA-Z0-9_$]{1,8})=function\(a\)\{if\(a\.settings\.([a-zA-Z0-9_$]{1,8})===24\)\{/;
    catchError(aaf_regex, code);
    const aaf_match = code.match(aaf_regex);
    const aaf_name = aaf_match[1];
    const fruit_setting = aaf_match[2];

    const baf_regex = /([a-zA-Z0-9_$]{1,8})=function\(a\)\{if\(([a-zA-Z0-9_$]{1,8})\(a\.settings,2\)\)\{var b=\s*Math\.floor\(48\/a\.([a-zA-Z0-9_$]{1,8})\.length\);/;
    catchError(baf_regex, code);
    const baf_match = code.match(baf_regex);
    const baf_name = baf_match[1];
    const portal_check = baf_match[2];
    const apple_array = baf_match[3];
    window.__portalAppleArrayName = apple_array;
    window.__fruitBowlSettingProp = fruit_setting;

    // Portal init: clear + roll from (pool − showing) pair by pair.
    code = code.assertReplace(
        baf_regex,
        `${baf_name}=function(a){` +
        `if(${portal_check}(a.settings,2)&&window.assignCustomPortalPairTypes&&window.assignCustomPortalPairTypes(a))return;` +
        `if(${portal_check}(a.settings,2)){var b=Math.floor(48/a.${apple_array}.length);`
    );

    // Custom bowl pick: portal → showing-list uniqueness; other modes → random from pool.
    code = code.assertReplace(
        aaf_regex,
        `${aaf_name}=function(a){` +
        `if(window.pudding_settings&&window.pudding_settings.PortalPairs&&a.settings.${fruit_setting}===24){` +
        `return window.pickCustomPortalType(a,${portal_check}(a.settings,2));}` +
        `if(a.settings.${fruit_setting}===24){`
    );

    // Before in-place portal retype, drop the eaten pair from "showing" (type=-1).
    const inplace_regex = new RegExp(
        `Ni&&\\(this\\.wa\\.ka\\[vd\\]\\.type=${aaf_name}\\(this\\.wa\\),this\\.wa\\.ka\\[Ok\\]\\.type=this\\.wa\\.ka\\[vd\\]\\.type\\)`
    );
    catchError(inplace_regex, code);
    code = code.assertReplace(
        inplace_regex,
        `Ni&&(this.wa.ka[vd].type=-1,this.wa.ka[Ok].type=-1,this.wa.ka[vd].type=${aaf_name}(this.wa),this.wa.ka[Ok].type=this.wa.ka[vd].type)`
    );

    const refill_regex = new RegExp(
        `if\\(([a-zA-Z0-9_$]{1,8})\\(a\\.settings,2\\)&&b\\.length>0\\)for\\(b\\[0\\]\\.type=${aaf_name}\\(a\\.([a-zA-Z0-9_$]{1,8})\\),b\\[1\\]\\.type=b\\[0\\]\\.type,a=2;a<b\\.length;a\\+=2\\)b\\[a\\]\\.type=\\(b\\[a-2\\]\\.type\\+1\\)%24,b\\[a\\+1\\]\\.type=b\\[a\\]\\.type`
    );
    catchError(refill_regex, code);
    const refill_match = code.match(refill_regex);
    const mode_check = refill_match[1];
    const apple_mgr_prop = refill_match[2];

    const refill_replacement =
        `if(${mode_check}(a.settings,2)&&b.length>0){` +
        `if(window.pudding_settings&&window.pudding_settings.PortalPairs&&a.settings.${fruit_setting}===24&&window.assignCustomPortalPairTypes){` +
        `window.assignCustomPortalPairTypes(a.${apple_mgr_prop});` +
        `}else for(b[0].type=${aaf_name}(a.${apple_mgr_prop}),b[1].type=b[0].type,a=2;a<b.length;a+=2)b[a].type=(b[a-2].type+1)%24,b[a+1].type=b[a].type;` +
        `window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(a.${apple_mgr_prop})` +
        `}`;

    code = code.assertReplace(refill_regex, refill_replacement);

    // Enforce after baF without breaking if/else (comma expression).
    code = code.assertReplace(
        new RegExp(`${baf_name}\\(this\\)`),
        `(${baf_name}(this),window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(this))`
    );
    const bafArgRegex = new RegExp(`${baf_name}\\(a\\.([a-zA-Z0-9_$]{1,8})\\)`);
    catchError(bafArgRegex, code);
    const bafArgProp = code.match(bafArgRegex)[1];
    code = code.assertReplace(
        bafArgRegex,
        `(${baf_name}(a.${bafArgProp}),window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(a.${bafArgProp}))`
    );

    return code;
};
window.PuddingMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeBefore = function () {
  window.isVisi = false;

  console.log("Thank you for loading Yarmiplay's Pudding Mod! Hope you enjoy :)");
  console.log("Please provide feedback and report bugs in #snake-modding in the Official Google Snake Discord");
  console.log("Google Snake SRC Discord link: https://discord.gg/dDuCTm62EZ");

  window.getRandomBoolean = function () {
    return Math.random() < 0.5;
  }

  window.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.escapeRegex = function escapeRegex(string) {
      return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  window.loadCode = function loadAndRunCodeSynchronous(url) {
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.onload = function () {
      if (this.status === 200) {
        (1, eval)(this.responseText);
      } else {
        console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
      }
    };
    req.onerror = function (event) {
      console.error(`Error when attempting to retrieve mod code from ${url}`);
      console.log(event);
    };
    req.send();
  }

  window.NepDebug = false;
  if (localStorage.getItem('snakeChosenMod') === "customUrl") {
    console.log("Detect customUrl - enabling debug mode and printing initial code")
    window.NepDebug = true;
  }

  window.catchError = function catchError(culprit_regex, code) {
    try {
      something = code.match(culprit_regex)[0];
    } catch (e) {
      console.log("I caught it!")
      console.log(culprit_regex)
      console.log(code)
      throw e
    }
    return false;
  }

  //Style differently depending on if snake is centered.
  let isSnakeCentered = !window.location.href.includes('fbx');
  let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {};
  if (advancedSettings.hasOwnProperty('fbxCentered') && advancedSettings.fbxCentered) {
    isSnakeCentered = true;
  }

  //if (!isSnakeCentered) {
    // Move menu so it doesn't overlap panels
    //document.getElementsByClassName('bZUgDf')[0].style.width = '50%';
  //}

  window.Libraries = [
    "Core",
    "Theme",
    "DistinctVisual",
    "Counter",
    "TimeKeeper",
    "Fruit",
    "TopBar",
    "SnakeColor",
    "SettingsSaver",
    "SpeedInfo",
    "InputDisplay",
    "Timer",
    "BootstrapMenu",
    "ResetKey",
    "RenderDelayFix",
    "CustomBowl",
  ];
  console.log("Enabling Pudding Mod");

  libUrlPrefix = window.NepDebug ? "http://127.0.0.1:5500/Libraries/" : "https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/Libraries/";
  window.Libraries.forEach(LibName => {
    console.log("Loading library: " + LibName)
    eval("window." + LibName + ".make();")
  });


};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.PuddingMod.alterSnakeCode = function (code) {
  if (window.NepDebug) {
    console.log(code)
  }


  code = code.replaceAll(/\$\$/gm, `doubleD`)
  code = code.replaceAll(/\$\&/gm, `$ &`)

  //code = code.assertReplaceAll(/\$i/gm, `something_i`)

  window.Libraries.forEach(LibName => {
    console.log("Alter code with library: " + LibName)
    eval("code = window." + LibName + ".alterCode(code);")
  });

  console.log("Done, enjoy Pudding Mod!");

  if (window.NepDebug) {
    console.log(code)
  }

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function () {
  let modIndicator = document.createElement('div');
  modIndicator.style = 'position:absolute;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Pudding Mod';
  if (window.loaded_code) {
    // commented out cuz i dont want it to annoy people since its now the official version
    //modIndicator.textContent = 'Pudding Mod - Google Test Version';
  }
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);

};

window.moreMenu = {
  runCodeBefore: () => {
    window.uiImage = src => {
      let img = new Image()
      img.src = src
      img.width = 40
      img.height = 40
      img.class = 'DqMRee SsAred'
      return img
    }

  
    for(let src of [
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Micro.png?raw=true',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Tiny.png?raw=true',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAABYElEQVRoQ+2Y2w7DIAxD1///6E2VRsUYJXZuFIm9AuHEMSzleC38OxZmf214oXrvZtxNMEugAtWL0QLX/JY9f3SwBGLgz31G81VHLwq+B1NXw7LvFdsSRKOkZs1tVTY8aNilbeNqmVOwTNssC+9umUzl3VXf8OC5WVb5EL9n2CYMPBPeciVPaw9CvF6ysSiCgIV9iFhtg7Q0oR8lFuUR+HrOKBGVEzLh3ROZBS99aUGWfhI8a0NTS0xv5r1ghvLIFQvl+SR4OikGvhec3XDU67CxKM+3wTVNF/JQBQsKT6xevMo1RislvJrR8Rj4E7r3L8nEmKZ8D54Br9ePHmfhmPDE792l8Xm59qS1qbbRJn63LhQ+w+9QT6NpQe9aWrQCroeVybL1q+TfUdfoclg18PXGjEelZJlYlzBoyaFGaTBJgpPGu6E3PFAWSVlp/NHKA/n/T8myjQpOWrThJYWixj+UTlgwJgIXFAAAAABJRU5ErkJggg==',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Super%20Big.png?raw=true',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Too%20Big.png?raw=true',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Humongous.png?raw=true',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Too%20Big.png?raw=true',
      'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main/Way%20Too%20Big.png?raw=true'
    ]) document.querySelector('#size').appendChild(uiImage(src))
  
    for(let src of [
      'https://i.postimg.cc/bNYJfjyZ/Turtle-Bunny.png',
      'https://i.postimg.cc/GtdppWvS/Lightning.png',
      'https://i.postimg.cc/L43XWspd/Snail.png',
      'https://i.postimg.cc/brgwSmTY/Lightning-Snail.png',
      'https://i.postimg.cc/yN3xpXVn/Desert-Bus.png',
      'https://i.postimg.cc/dVLVDmTv/Bullet.png',
      'https://i.postimg.cc/4N83JFyB/Red-Bullet.png',
      'https://i.postimg.cc/MpNKBMyB/Purple-Bullet.png',
      'https://i.postimg.cc/qRdJmPDM/Blue-Bullet.png',
      'https://i.postimg.cc/fL4LGtys/Eternal.png',
      'https://i.postimg.cc/LXzX29g1/Fire-Bunny.png'
    ]) document.querySelector('#speed').appendChild(uiImage(src))
  
    for(let src of [
      'https://i.postimg.cc/cJx1Lt2W/13-cr.png',
      'https://i.postimg.cc/HWq26Bdv/25.png',
      'https://i.postimg.cc/c4fc2wJx/40.png',
      'https://i.postimg.cc/50sStLRc/87.png',
      'https://i.postimg.cc/YCkxH041/Apple-Bomb.png',
      'https://i.postimg.cc/wMx20pWL/Nuke.png'
    ]) document.querySelector('#count').appendChild(uiImage(src))
  },
  alterSnakeCode: code => {
    const resetFunction = code.match(
      /reset\n?\(\n?\)\n?{\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?\[\];[^]*?!1\n?\)\n?}/
    )[0]
  
    const selectedAppleCount = resetFunction.match(
      /this\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?!==\n?0/
    )[0].replace(/!==\n?0/, '').replace(/\n/g, '')
  
    const applePlacementStem = resetFunction.match(
      /this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?push\n?\(\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?,/
    )[0]
    const appleArray = applePlacementStem.match(/this\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0]
  
    const checkBadMode = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?=\n?function\n?\(a\)\n?{\n?return [a-zA-Z0-9_$]{1,8}\n?\(\n?a\n?,\n?2\n?\)\n?\|\|\n?[a-zA-Z0-9_$]{1,8}\n?\(a\n?,\n?8\n?\)\n?\|\|\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?a\n?,\n?9\n?\)\n?\|\|\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?a\n?,\n?10\n?\)\n?}/
    )[0].match(/[a-zA-Z0-9_$]{1,8}/)[0]
    const isModeSelected = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?=\n?function\n?\(\n?a\n?,\n?b\n?\)\n?{\n?return a\.[a-zA-Z0-9_$]{1,8}\?a\.[a-zA-Z0-9_$]{1,8}\.has\(b\):[^]*?===\n?b\n?}/
    )[0].match(/[a-zA-Z0-9_$]{1,8}/)[0]
  
  
    code = code.assertReplace(resetFunction,
      resetFunction.assertReplace(
        'if(a)',
        `
        if(${selectedAppleCount} > 6) {

          if(!${checkBadMode}(this.settings)) {
            if(${selectedAppleCount} === 7) {
              ${applePlacementStem} +1, +2))
              ${applePlacementStem} -1, +2))
              ${applePlacementStem} -3, +2))
              ${applePlacementStem} +0, +1))
              ${applePlacementStem} -2, +1))
              ${applePlacementStem} +1, +0))
              ${applePlacementStem} -1, +0))
              ${applePlacementStem} -3, +0))
              ${applePlacementStem} +0, -1))
              ${applePlacementStem} -2, -1))
              ${applePlacementStem} +1, -2))
              ${applePlacementStem} -1, -2))
              ${applePlacementStem} -3, -2))
            } else if(${selectedAppleCount} === 8) {
              ${applePlacementStem} +1, +2))
              ${applePlacementStem} +0, +2))
              ${applePlacementStem} -1, +2))
              ${applePlacementStem} -2, +2))
              ${applePlacementStem} -3, +2))
              ${applePlacementStem} +1, +1))
              ${applePlacementStem} +0, +1))
              ${applePlacementStem} -1, +1))
              ${applePlacementStem} -2, +1))
              ${applePlacementStem} -3, +1))
              ${applePlacementStem} +1, +0))
              ${applePlacementStem} +0, +0))
              ${applePlacementStem} -1, +0))
              ${applePlacementStem} -2, +0))
              ${applePlacementStem} -3, +0))
              ${applePlacementStem} +1, -1))
              ${applePlacementStem} +0, -1))
              ${applePlacementStem} -1, -1))
              ${applePlacementStem} -2, -1))
              ${applePlacementStem} -3, -1))
              ${applePlacementStem} +1, -2))
              ${applePlacementStem} +0, -2))
              ${applePlacementStem} -1, -2))
              ${applePlacementStem} -2, -2))
              ${applePlacementStem} -3, -2))
            } else if(${selectedAppleCount} === 9) {
              ${applePlacementStem} +1, +2))
              ${applePlacementStem} +0, +2))
              ${applePlacementStem} -1, +2))
              ${applePlacementStem} -2, +2))
              ${applePlacementStem} -3, +2))
              ${applePlacementStem} +1, +1))
              ${applePlacementStem} +0, +1))
              ${applePlacementStem} -1, +1))
              ${applePlacementStem} -2, +1))
              ${applePlacementStem} -3, +1))
              ${applePlacementStem} +1, +0))
              ${applePlacementStem} +0, +0))
              ${applePlacementStem} -1, +0))
              ${applePlacementStem} -2, +0))
              ${applePlacementStem} -3, +0))
              ${applePlacementStem} +1, -1))
              ${applePlacementStem} +0, -1))
              ${applePlacementStem} -1, -1))
              ${applePlacementStem} -2, -1))
              ${applePlacementStem} -3, -1))
              ${applePlacementStem} +1, -2))
              ${applePlacementStem} +0, -2))
              ${applePlacementStem} -1, -2))
              ${applePlacementStem} -2, -2))
              ${applePlacementStem} -3, -2))
              ${applePlacementStem} -3, -3))
              ${applePlacementStem} -2, -3))
              ${applePlacementStem} -1, -3))
              ${applePlacementStem} +0, -3))
              ${applePlacementStem} +1, -3))
              ${applePlacementStem} +2, -2))
              ${applePlacementStem} +2, -1))
              ${applePlacementStem} +2, +0))
              ${applePlacementStem} +2, +1))
              ${applePlacementStem} +2, +2))
              ${applePlacementStem} +1, +3))
              ${applePlacementStem} +0, +3))
              ${applePlacementStem} -1, +3))
              ${applePlacementStem} -2, +3))
              ${applePlacementStem} -3, +3))
            } else if(${selectedAppleCount} === 10) {
              for(let dy = -4; dy <= 4; dy++)
                for(let dx = -7; dx <= 2; dx++)
                  ${applePlacementStem} dx, dy))
            } else if(${selectedAppleCount} === 11) {
              for(let i = 0; i < 200; i++)
                ${applePlacementStem} -1, +0))
            } else if(${selectedAppleCount} === 12) {
              for(let i = 0; i < 10000; i++)
                ${applePlacementStem} -1, +0))
            } else
              ${applePlacementStem} +100000, +1))
  
          } else {

            if(${selectedAppleCount} < 12) {
              const count = (
                ${selectedAppleCount} === 6
                  ? 13
                : ${selectedAppleCount} === 7
                  ? 25
                : ${selectedAppleCount} === 8
                  ? 40
                : ${selectedAppleCount} === 9
                  ? 87
                : ${selectedAppleCount} === 10
                  ? 200
                : 0
              )
              for(let dx = 0; dx < count; dx++)
                for(const dy of [-4, 4])
                  ${applePlacementStem} -count + dx, dy))
            } else {
              for(let i = 0; i < 20000; i++)
                ${applePlacementStem} +0, +0))
            }
          }
        } else if(a)
        `
      ).assertReplace(
        /!1\n?\)\n?}/,
        `!1)
          if(${isModeSelected}(this.settings, 2) && ${selectedAppleCount} > 7) {
            for(let __i___ = 0; __i___ < ${appleArray}.length; __i___ += 2) {
              ${appleArray}[__i___].type = ${appleArray}[__i___ + 1].type = Math.floor(Math.random() * 24)
            }
          }
  
        }`
      )
    )
  
  
    const tileLengthSetLine = code.match(
      /this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?\(\n?d\n?\.\n?isMobile\n?\?\n?175\n?:\n?135\n?\)\n?\*\n?a\n?;/
    )[0]
    const selectedSpeed = code.match(
      /switch\n?\(\n?d\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?{\n?case(\n? \n?|\n)1\n?:\n?a\n?=\n?\.66/
    )[0].match(
      /d\n?\.\n?[a-zA-Z0-9_$]{1,8}/
    )[0].replace('d', 'this.settings')
  
    const tickFunction = code.match(
      /tick\n?\(\n?\)\n?{\n?[^]*?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?keys\n?,\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?,\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?}\n?}\n?}\n?}/
    )[0]
    const replacePoint = tickFunction.match(
      /\.5\n?:\n?1\.25\n?\);\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\+\+;/
    )[0]
  
    window.bunnyTurtleSpeed = 1.33
    window.lightningSnailSpeed = 1.85
  
    code = code.assertReplace(tickFunction,
      tickFunction.replaceAll(
        '&&', ' && '
      ).replace(
        replacePoint,
        replacePoint
         + `
          window.bunnyTurtleSpeed = Math.random() < .5 ? .66 : 1.33
          window.lightningSnailSpeed = Math.random() < .5 ? .45 : 1.85
          let speedMultiplier
          switch(${selectedSpeed}) {
            case 1:
              speedMultiplier = .66
              break
            case 2:
              speedMultiplier = 1.33
              break
            case 3:
              speedMultiplier = window.bunnyTurtleSpeed
              break
            case 4:
              speedMultiplier = .45
              break
            case 5:
              speedMultiplier = 1.85
              break
            case 6:
              speedMultiplier = window.lightningSnailSpeed
              break
            case 7:
              speedMultiplier = 18.5
              break
            case 8:
              speedMultiplier = .35
              break
            case 9:
              speedMultiplier = .25
              break
            case 10:
              speedMultiplier = .15
              break
            case 11:
              speedMultiplier = .05
              break
            case 12:
              speedMultiplier = 26640
              break
            case 13:
              speedMultiplier = .00001
              break
            default:
              speedMultiplier = 1
              break
          }
          ${tileLengthSetLine.replace(/\*\n?a/, '* speedMultiplier').replace('d.isMobile', 'this.settings.isMobile')}
        `
      )
    )
  
    const resetFunction1 = code.match(
      /reset\n?\(\n?\)\n?{\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?null[^]*?\.66[^]*?!0\n?\)\n?\)\n?}/
    )[0]
  
    code = code.assertReplace(resetFunction1,
      resetFunction1.assertReplace(
        /{case 1:a=\.66[^}]*?1}/,
        `{
          case 1:
            a = .66
            break a
          case 2:
            a = 1.33                       
            break a
          case 3:
            a = window.bunnyTurtleSpeed    
            break a
          case 4:
            a = .45                        
            break a
          case 5:
            a = 1.85                       
            break a
          case 6:
            a = window.lightningSnailSpeed 
            break a
          case 7:
            a = 18.5                       
            break a
          case 8:
            a = .35                        
            break a
          case 9:
            a = .25                        
            break a
          case 10:
            a = .15                        
            break a
          case 11:
            a = .05                        
            break a
          case 12:
            a = 26640                      
            break a
          case 13:
            a = .00001                     
            break a
          default:
            a = 1                          
            break a
        }`
      )
    );
  
    const speedIconFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?=\n?function\n?\(a\)\n?{\n?var b\n?=\n?a\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?===\n?1\n?;\n?a\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?clearRect\n?\(\n?0\n?,\n?0\n?,\n?[^]*?\n?0\n?\)\n?,\n?0\n?,\n?c\n?,\n?a\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?}/
    )[0]
    const canvWidth = speedIconFunction.match(
      /var c\n?=\n?a\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?width/
    )[0].assertReplace(/var c\n?=/, '')
    const canv = speedIconFunction.match(
      /a\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?render/g
    )[1].assertReplace(/.\n?render/, '')
    const selectedSpeed1 = speedIconFunction.match(
      /a\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?===\n?1/g
    )[1].assertReplace(/\n?===\n?1/, '')
  
    code = code.assertReplace(speedIconFunction,
      speedIconFunction.assertReplace(
        '&&', '?'
      ).assertReplace(
        /\)\n?\)\n?;/,
        `)) : ${selectedSpeed1} !== 0 && (${canv}.context.drawImage(document.querySelector('#speed').children[${selectedSpeed1}], ${canvWidth} - 80, d.y - 80, 80, 80));`
      )
    )
  
  
    const sizeHandleFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?\(\n?\)\n?{\n?var(\n|\n? \n?)a\n?=\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\("JI3Aqc[^]*?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?}\n?}/
    )[0]
    const selectedSize = sizeHandleFunction.match(
      /switch\n?\(\n?this\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?{\n?case 2\n?:/
    )[0].match(/this\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0]
    const sizeHold = sizeHandleFunction.match(
      /[a-zA-Z0-9_$]\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?new(\n? \n?|\n)_\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?Math\n?\.\n?floor\n?\(\n?[a-zA-Z0-9_$]\n?\/\n?[a-zA-Z0-9_$]\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?,\n?Math\n?\.\n?floor\n?\(\n?[a-zA-Z0-9_$]\n?\/\n?[a-zA-Z0-9_$]\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?\)\n?[^]*?;/
    )[0]
    const sizeHolder = sizeHold.match(/[a-zA-Z0-9_$]\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0]
    const dim = sizeHold.match(/[a-zA-Z0-9_$]\n?\/\n?[a-zA-Z0-9_$]\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0].replace(/[a-zA-Z0-9_$]\n?\//, '')
    const e = sizeHandleFunction.match(/[a-zA-Z0-9_$]\n?=\n?512/)[0][0]
  
    code = code.assertReplace(sizeHandleFunction,
      sizeHandleFunction
      .assertReplace(
        `Math.floor(Math.sqrt(${e}))`, `Math.max(1, Math.floor(Math.sqrt(${e})))`
      )
      .assertReplace(
        /new(\n|\n? \n?)_\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?Math\n?\.\n?floor[^]*?\)\n?\)/,
        `
        {
          width:  ${selectedSize} === 3 ? 5 : ${selectedSize} === 4 ? 7 : ${selectedSize} === 5 ? 12 : Math.floor(a / ${dim}),
          height: ${selectedSize} === 3 ? 4 : ${selectedSize} === 4 ? 6 : ${selectedSize} === 5 ? 11 : Math.floor(c / ${dim})
        }
        `
      )
      .assertReplace(
        `default:${e}=256}`,
        `
        case 3:
          ${e} = 20
          break
        case 4:
          ${e} = 42
          break
        case 5:
          ${e} = 132
          break
        case 6:
          ${e} = 1200
          break
        case 7:
          ${e} = 3600
          break
        case 8:
          ${e} = 9700
          break
        case 9:
          ${e} = 25000
          break
        case 10:
          ${e} = 318000
          break
        default:
          ${e} = 256
        }
        `
      )
      .assertReplace(
        /21\n?\)\n?}/,
        `
          21)
          break
        case 3:
          ${sizeHolder} = { width: 5, height: 4 }
          break
        case 4:
          ${sizeHolder} = { width: 7, height: 6 }
          break
        case 5:
          ${sizeHolder} = { width: 12, height: 11 }
          break
        case 6:
          ${sizeHolder} = { width: 37, height: 32 }
          break
        case 7:
          ${sizeHolder} = { width: 64, height: 56 }
          break
        case 8:
          ${sizeHolder} = { width: 105, height: 92 }
          break
        case 9:
          ${sizeHolder} = { width: 168, height: 147 }
          break
        case 10:
          ${sizeHolder} = { width: 600, height: 530 }
          break
        }
        if(this.settings.isMobile && [3, 4, 5].includes(${selectedSize})) {
          let squareSize = a / ${sizeHolder}.width
          if(squareSize * ${sizeHolder}.height > c)
            squareSize = c / ${sizeHolder}.height
          squareSize *= .98
          if(squareSize > 1) squareSize = ~~squareSize
          ${dim} = squareSize
          if(window.innerWidth / window.innerHeight < .55) {
            squareSize *= window.innerWidth / window.innerHeight * 1.75
            if(squareSize > 1) squareSize = ~~squareSize
            ${dim} = squareSize
          }
        }
        `
      )
    )
    
  
    const menuUpdateFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?\(\n?\)\n?{\n?if\n?\(\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?\)\n?\)\n?[^]*?"thso6e"\n?\)\n?}\n?}/
    )[0]
    const selectedAppleCount1 = `([...document.querySelector('#count').children].indexOf(document.querySelector('#count').getElementsByClassName('tuJOWd')[0]))`
  
  
    code = code.assertReplace(
      menuUpdateFunction,
      menuUpdateFunction.assertReplace(
        '}}',
        `}
          const appleCountDisplay = document.body.getElementsByClassName('UJhXPd wSwbef EWyEF')[0]
  
          // [...appleCountDisplay.children].forEach((e, i) => i > 1 && (appleCountDisplay.removeChild(appleCountDisplay.children[i])))
          for(let i = 2; i < appleCountDisplay.children.length; i++) {
            appleCountDisplay.removeChild(appleCountDisplay.children[i])
          }

          if(${selectedAppleCount1} > 3) {
            const __src = document.querySelector('#count').children[${selectedAppleCount1}].src
            const __img = window.uiImage(__src)
            __img.style.position = 'relative'
            __img.style.left = '50px'
            appleCountDisplay.appendChild(__img)
          }
        } 
        `
      )
    )
  
  
    const pixelIssueFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?=\n?function\n?\(\n?a\n?\)\n?{\n?var(\n| )b\n?=\n?a\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?;\n?if[^]*?10\n?}\n?}\n?}/
    )[0]
    const pixelIssueB = pixelIssueFunction.match(
      /var(\n| )b\n?=\n?a\n?\.\n?[a-zA-Z0-9_$]{1,8}/
    )[0].replace(/var(\n| )b\n?=\n?/, '')
    const boardDimensions = pixelIssueFunction.match(
      /b\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?height/
    )[0].replace('b', pixelIssueB).replace(/\n?\.\n?height/, '')
    const boardThing = pixelIssueFunction.match(
      /b\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\[\n?d\n?\.\n?y\n?\]\n?\[\n?d\n?\.\n?x\n?\]/
    )[0].replace(/\n?\[\n?d\n?\.\n?y\n?\]\n?\[\n?d\n?\.\n?x\n?\]/, '')
    code = code.assertReplaceAll(
      RegExp(`${boardThing}\\n?\\[\\n?c\\n?\\.\\n?y\\n?\\]\\n?\\[\\n?c\\n?\\.\\n?x\\n?\\]\\n?=\\n?e`, 'g'),
      `c.y >= 0 && c.y < ${boardDimensions}.height && c.x >= 0 && c.x < ${boardDimensions}.width && (${boardThing}[c.y][c.x] = e)`
    )
  
  
    code = code.assertReplace(
      /switch\n?\(\n?Math\n?\.\n?floor\n?\(\n?Math\n?\.\n?random\n?\(\n?\)\n?\*\n?6\n?\)\n?\)\n?{\n?default\n?:\n?case[^}]*?}/,
      'h = Math.floor(12 * Math.random());'
    ).assertReplace(
      /f\n?=\n?Math\n?\.\n?random\n?\(\n?\)\n?<\n?\.25\n?\?\n?Math\n?\.\n?random\n?\(\n?\)\n?<\n?\.25\n?\?\n?2\n?:\n?1\n?:\n?0/,
      'f = Math.floor(14 * Math.random())'
    ).assertReplace(
      /g\n?=\n?Math\n?\.\n?random\n?\(\n?\)\n?<\n?\.25\n?\?\n?Math\n?\.\n?random\n?\(\n?\)\n?<\n?\.25\n?\?\n?2\n?:\n?1\n?:\n?0/,
      'g = Math.floor(11 * Math.random())'
    )
  
  
  
    const appleTypeChosen = code.match(
      /for\n?\(\n?a\n?=\n?a\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}/
    )[0].match(/a\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0]

    code = code.assertReplace(
      RegExp(`for\\n?\\(\\n?a\\n?=\\n?${appleTypeChosen}\\n?;\\n?c\\.has\\n?\\(\\n?a\\n?\\)\\n?;\\n?\\)`),
      `for(a = ${appleTypeChosen}, __i = 0; c.has(a) && __i < 24; __i++)`
    )

    // pause mod code
    const pauseCondition = code.match(
      /\(\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?direction\n?!==\n?"NONE"\n?\|\|\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?\)/
    )[0]

    code = code.assertReplace(
      pauseCondition,
      `(${pauseCondition} && !window.pauseGame)`
    )
  
  
    return code
  },
  runCodeAfter: () => {
    const modIndicator = document.createElement('div')
    modIndicator.style = `
      position: absolute;
      font-family: Roboto, Arial, sans-serif;
      color: white;
      font-size: 14px;
      padding-top: 4px;
      padding-left: 30px;
      user-select: none;
    `
    modIndicator.textContent = 'More Menu Mod'
    const canvasNode = document.getElementsByClassName('jNB0Ic')[0]
    document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode)

    // pause mod code
    document.addEventListener('keydown', evt => {
      if(evt.code === 'KeyQ') {
        window.pauseGame = !window.pauseGame

        const pausedDarkOverlayDiv = document.getElementsByClassName('wjOYOd')[0]
        const menuDiv = pausedDarkOverlayDiv.children[0]

        if(window.pauseGame) {
          pausedDarkOverlayDiv.style.visibility = "visible"
          pausedDarkOverlayDiv.style.opacity = 1
          menuDiv.style.visibility = "hidden"
        } else {
          setTimeout(() => {
            if(!window.pauseGame) {
              menuDiv.style.visibility = "visible"
            }
          }, 500)
          pausedDarkOverlayDiv.style.visibility = "hidden"
          pausedDarkOverlayDiv.style.opacity = 0
        }
      }
    })
  }
}
window.VisibilityModCode = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.VisibilityModCode.runCodeBefore = function () {
  window.catchError = function catchError(culprit_regex, code) {
    try {
      something = code.match(culprit_regex)[0];
    } catch (e) {
      console.log("I caught it!")
      if (window.NepDebug) {
        console.log(culprit_regex)
        console.log(code)
      }
      return true;
    } return false;

  }

  function loadAndRunCodeSynchronous(url) {
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.onload = function () {
      if (this.status === 200) {
        (1, eval)(this.responseText);
      } else {
        console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
      }
    };
    req.onerror = function (event) {
      console.error(`Error when attempting to retrieve mod code from ${url}`);
      console.log(event);
    };
    req.send();
  }

  //loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js');
  //window.PuddingMod.runCodeBefore();

  console.log("Enabling Visibility Mod");

  window.checkboxes = {
    checkboxStatuses: {
      leftEye: true, rightEye: true, body: true, snoot: true, nose: true,
      lightTiles: true, darkTiles: true, eatAnimation: true, fruit: true, poison: true, shadow: true,
      border: true, die: true, lumps: true, portals: true, flashSnake: false, shadowIncluded: true,
      keys: true, walls: true, locks: true, hotdogWalls: true, sokobanBox: true, sokobanGoal: true,
      mines: true, statue: true, brokenStatue: true, mineRadius: true, tongue: true,
      bridges: true, arrows: true, gates: true, shields: true,
      lightSnake: true, lightFruit: true,
    },
  };

  // The game builds the shadow as a silhouette of the sprite layer partway through a frame, so
  // anything we skip drawing would lose its shadow too. When Shadow Included is off, that part of
  // the frame runs twice: once with every silhouette gate forced open (what the shadow is taken
  // from), then the sprite layer is rewound and drawn again honouring the checkboxes. When it is
  // on, hidden parts simply are not drawn and their shadows go with them.
  window.visiFullPass = false;
  window.visiShadowScratch = null;
  window.visiShadowPassKeys = ['body', 'fruit', 'poison', 'lumps', 'leftEye', 'rightEye', 'snoot', 'nose',
    'eatAnimation', 'tongue', 'die', 'keys', 'sokobanBox'];

  window.visiBeginShadowPass = function visiBeginShadowPass(renderer, isInfinity) {
    window.visiFullPass = false;

    //Infinity mode composites the shadow from wrapped copies further down the frame, so the rewind
    //point here would land in the wrong place.
    let statuses = window.checkboxes.checkboxStatuses;
    if (isInfinity || !statuses.shadow || statuses.shadowIncluded) { return; }

    let anyHidden = false;
    for (let i = 0; i < window.visiShadowPassKeys.length; i++) {
      if (!statuses[window.visiShadowPassKeys[i]]) { anyHidden = true; break; }
    }
    if (!anyHidden) { return; }

    let source = renderer.ka.canvas;
    let scratch = window.visiShadowScratch;
    if (!scratch) {
      scratch = window.visiShadowScratch = document.createElement('canvas').getContext('2d');
    }
    if (scratch.canvas.width !== source.width || scratch.canvas.height !== source.height) {
      scratch.canvas.width = source.width;
      scratch.canvas.height = source.height;
    }
    scratch.setTransform(1, 0, 0, 1, 0, 0);
    scratch.globalAlpha = 1;
    scratch.globalCompositeOperation = 'copy';
    scratch.drawImage(source, 0, 0);
    scratch.globalCompositeOperation = 'source-over';

    window.visiFullPass = true;
  };

  window.visiEndShadowPass = function visiEndShadowPass(renderer) {
    if (!window.visiFullPass) { return false; }
    window.visiFullPass = false;

    let ctx = renderer.ka;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(window.visiShadowScratch.canvas, 0, 0);
    ctx.restore();
    return true;
  };

  // Border is also painted as CSS background-color on the canvas chrome; keep handles so the
  // checkbox can toggle it live without restarting.
  window.visiBorderEls = [];
  window.visiBorderColor = "";
  window.applyVisiBorder = function applyVisiBorder() {
    let color = window.checkboxes.checkboxStatuses.border ? (window.visiBorderColor || "") : "transparent";
    for (let i = 0; i < window.visiBorderEls.length; i++) {
      let el = window.visiBorderEls[i];
      if (el && el.style) { el.style.backgroundColor = color; }
    }
  };

  window.flashSnakeStatus = { flashCount: 0, currentlyFlashingSnake: false, durationMillisecond: 1000 };

  window.dragHandler = {
    dragItem: null,
    dragContainer: null,
    dragObject: null,
    active: false,
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0,
    dragStart: (e) => {
      if (e.target === window.dragHandler.dragItem) {
        window.dragHandler.initialX = e.clientX - window.dragHandler.xOffset;
        window.dragHandler.initialY = e.clientY - window.dragHandler.yOffset;
        window.dragHandler.active = true;
      }
    },
    dragEnd: (e) => {
      window.dragHandler.initialX = window.dragHandler.currentX;
      window.dragHandler.initialY = window.dragHandler.currentY;
      window.dragHandler.active = false;
    },
    drag: (e) => {
      if (window.dragHandler.active) {

        //Enforce coordinates being within viewport
        let restrictedClientX = Math.max(Math.min(e.clientX, window.innerWidth - 5), 5);
        let restrictedClientY = Math.max(Math.min(e.clientY, window.innerHeight - 5), 5);

        e.preventDefault();
        window.dragHandler.currentX = restrictedClientX - window.dragHandler.initialX;
        window.dragHandler.currentY = restrictedClientY - window.dragHandler.initialY;
        window.dragHandler.xOffset = window.dragHandler.currentX;
        window.dragHandler.yOffset = window.dragHandler.currentY;

        window.dragHandler.setTranslate(window.dragHandler.currentX, window.dragHandler.currentY, window.dragHandler.dragObject);
      }
    },
    setTranslate: function (xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    },
    initialiseDragHandler: function () {
      this.dragItem = document.getElementById('drag-handle');
      this.dragContainer = window;
      this.dragObject = document.getElementById('delete-stuff-draggable');

      //If it isn't fbx snake, then start at the left edge
      if (!/fbx\?fbx=snake_arcade/.test(document.location.href)) {
        this.dragObject.style.left = '5px';
      }

      this.dragContainer.addEventListener("mousedown", this.dragStart, false);
      this.dragContainer.addEventListener("mouseup", this.dragEnd, false);
      this.dragContainer.addEventListener("mousemove", this.drag, false);
    }
  };

  function setupEventListeners() {
    document.getElementById('delete-stuff-close').onclick = function () {
      document.getElementById('delete-stuff-popup').hidden = true;
    };

    document.addEventListener('keydown', function (event) {
      if (event.key == 'i') {
        document.getElementById('delete-stuff-popup').hidden = !document.getElementById('delete-stuff-popup').hidden;
      }
    });

    document.getElementById('left-eye').onchange = function () {
      window.checkboxes.checkboxStatuses.leftEye = this.checked;
    }

    document.getElementById('right-eye').onchange = function () {
      window.checkboxes.checkboxStatuses.rightEye = this.checked;
    }

    document.getElementById('snake-body').onchange = function () {
      window.checkboxes.checkboxStatuses.body = this.checked;
    }

    document.getElementById('snoot').onchange = function () {
      window.checkboxes.checkboxStatuses.snoot = this.checked;
    }

    document.getElementById('nose').onchange = function () {
      window.checkboxes.checkboxStatuses.nose = this.checked;
    }

    document.getElementById('light-tiles').onchange = function () {
      window.checkboxes.checkboxStatuses.lightTiles = this.checked;
    }

    document.getElementById('dark-tiles').onchange = function () {
      window.checkboxes.checkboxStatuses.darkTiles = this.checked;
    }

    document.getElementById('eat-animation').onchange = function () {
      window.checkboxes.checkboxStatuses.eatAnimation = this.checked;
    }

    document.getElementById('tongue').onchange = function () {
      window.checkboxes.checkboxStatuses.tongue = this.checked;
    }
    document.getElementById('fruit').onchange = function () {
      window.checkboxes.checkboxStatuses.fruit = this.checked;
    }
    document.getElementById('poison').onchange = function () {
      window.checkboxes.checkboxStatuses.poison = this.checked;
    }
    document.getElementById('shadow').onchange = function () {
      window.checkboxes.checkboxStatuses.shadow = this.checked;
    }
    document.getElementById('border').onchange = function () {
      window.checkboxes.checkboxStatuses.border = this.checked;
      window.applyVisiBorder();
    }
    document.getElementById('die').onchange = function () {
      window.checkboxes.checkboxStatuses.die = this.checked;
    }
    document.getElementById('lumps').onchange = function () {
      window.checkboxes.checkboxStatuses.lumps = this.checked;
    }
    document.getElementById('portals').onchange = function () {
      window.checkboxes.checkboxStatuses.portals = this.checked;
    }
    document.getElementById('flash-snake').onchange = function () {
      window.checkboxes.checkboxStatuses.flashSnake = this.checked;
    }
    //Handle dropdown for controlling duration of snake flashes
    document.getElementById('flash-snake-timing').onchange = function () {
      window.flashSnakeStatus.durationMillisecond = this.value;
    }
    document.getElementById('shadow-included').onchange = function () {
      window.checkboxes.checkboxStatuses.shadowIncluded = this.checked;
    }
    document.getElementById('keys').onchange = function () {
      window.checkboxes.checkboxStatuses.keys = this.checked;
    }
    document.getElementById('walls').onchange = function () {
      window.checkboxes.checkboxStatuses.walls = this.checked;
    }
    document.getElementById('locks').onchange = function () {
      window.checkboxes.checkboxStatuses.locks = this.checked;
    }
    document.getElementById('hotdog-walls').onchange = function () {
      window.checkboxes.checkboxStatuses.hotdogWalls = this.checked;
    }
    document.getElementById('sokoban-box').onchange = function () {
      window.checkboxes.checkboxStatuses.sokobanBox = this.checked;
    }
    document.getElementById('sokoban-goal').onchange = function () {
      window.checkboxes.checkboxStatuses.sokobanGoal = this.checked;
    }
    document.getElementById('mines').onchange = function () {
      window.checkboxes.checkboxStatuses.mines = this.checked;
      if (this.checked) {
        eval("window.MinesRef." + window.minesDefined + "=window.DefaultMines;")
      }
      else {
        eval("window.MinesRef." + window.minesDefined + "=window.NoMines;")
      }
    }
    document.getElementById('mine-radius').onchange = function () {
      window.checkboxes.checkboxStatuses.mineRadius = this.checked;
    }
    document.getElementById('broken-statue').onchange = function () {
      window.checkboxes.checkboxStatuses.brokenStatue = this.checked;
    }
    document.getElementById('statue').onchange = function () {
      window.checkboxes.checkboxStatuses.statue = this.checked;
    }
    document.getElementById('bridges').onchange = function () {
      window.checkboxes.checkboxStatuses.bridges = this.checked;
    }
    document.getElementById('arrows').onchange = function () {
      window.checkboxes.checkboxStatuses.arrows = this.checked;
    }
    document.getElementById('gates').onchange = function () {
      window.checkboxes.checkboxStatuses.gates = this.checked;
    }
    document.getElementById('shields').onchange = function () {
      window.checkboxes.checkboxStatuses.shields = this.checked;
    }
    document.getElementById('light-snake').onchange = function () {
      window.checkboxes.checkboxStatuses.lightSnake = this.checked;
    }
    document.getElementById('light-fruit').onchange = function () {
      window.checkboxes.checkboxStatuses.lightFruit = this.checked;
    }
    document.getElementById('spin').onchange = spinHandler;
  }

  function injectInitialHtml() {
    let initialHtml =
      `<div id="delete-stuff-popup" style="margin:0px;position:fixed;z-index:9001;width:100%;">
  <div id="delete-stuff-draggable" style="width: 370px; background-color: rgb(87, 138, 52); z-index: 9002; border-color: rgb(87, 138, 52); border-style: solid; border-width: 4px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 10px; position: fixed; left: 5px; top: 5px;border-width: 0px;">
    <div id="drag-handle" style="width: 22px; height: 22px; background-color: rgb(77, 193, 249); position: absolute; border-top-left-radius: 10px; border-bottom-right-radius: 18px; border-right: 3px solid rgb(87, 138, 52); border-bottom: 3px solid rgb(87, 138, 52); cursor: move; border-top-color: rgb(87, 138, 52); border-left-color: rgb(87, 138, 52);"></div>
    <div style="padding:10px;width:350px;margin:0;">
      <div id="visi-title" class="form-check-label" style="text-align: center; padding: 5px; background-color: rgb(74, 117, 44); color: white; font-size: 20px;">Visibility Mod</div>
      <div id="visi-boxes" style="background-color: rgb(74, 117, 44); margin-top: 5px; padding: 0px 0px 10px;">
        <!--Begin test area-->
        <!--Snake body Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="left-eye" type="checkbox" checked>Left Eye</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="right-eye" type="checkbox" checked>Right Eye</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="snoot" type="checkbox" checked>Snoot</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="nose" type="checkbox" checked>Nostrils</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="snake-body" type="checkbox" checked>Body</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="lumps" type="checkbox" checked>Lumps</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="eat-animation" type="checkbox" checked>Eat Anim.</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="tongue" type="checkbox" checked>Tongue</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="die" type="checkbox" checked>Die Anim.</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shadow" type="checkbox" checked>Shadow</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shadow-included" type="checkbox" checked>Shadow Included</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Background Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 50%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-tiles" type="checkbox" checked>Light Tiles</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="dark-tiles" type="checkbox" checked>Dark Tiles</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 50%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="border" type="checkbox" checked>Border</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="spin" type="checkbox">Spin</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Fruits Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="fruit" type="checkbox" checked>Fruit</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="poison" type="checkbox" checked>Poison</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="portals" type="checkbox" checked>Portals</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="keys" type="checkbox" checked>Keys</label>
            </li>
            <li>
            <label class="form-check-label"><input class="form-check-input" id="statue" type="checkbox" checked>Statue</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="mines" type="checkbox" checked>Mines</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="walls" type="checkbox" checked>Walls</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="locks" type="checkbox" checked>Locks</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="sokoban-box" type="checkbox" checked>Sokobox</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="sokoban-goal" type="checkbox" checked>Sokogoal</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="broken-statue" type="checkbox" checked>Cracks</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="mine-radius" type="checkbox" checked>Mine Radius</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Newer modes Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="bridges" type="checkbox" checked>Bridges</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="arrows" type="checkbox" checked>Arrows</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="gates" type="checkbox" checked>Gates</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shields" type="checkbox" checked>Shields</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="hotdog-walls" type="checkbox" checked>Hotdog Walls</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-snake" type="checkbox" checked>Light Snake</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-fruit" type="checkbox" checked>Light Fruit</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Flash Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="flash-snake" type="checkbox">Flash eat</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:2px;margin: 0px;width: 55%;display:inline-block;">
          <label class="form-check-label" style="padding-top:5px;display:inline-block;float:left;">Flash time:</label>
            <select id="flash-snake-timing" style="margin-top: 9px; margin-right: 10px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: space-evenly; align-items: center; text-align: center;border-radius:0.375rem;float:right;">
              <option value="20">0.05s</option>
              <option value="200">0.2s</option>
              <option value="500">0.5s</option>
              <option value="1000" selected="">1s</option>
              <option value="2000">2s</option>
              <option value="3000">3s</option>
            </select>
        </div>
        <!--End test area-->
        <div style="text-align:center; clear:both" class="form-check-label"><a id="delete-stuff-close" href="#">Close</a> (Press i to show again)</div>
      </div>

    </div>

  </div>
</div>
<template id="tooltiptemplate">
  <div style="position:relative;display:inline-block;color: white;float:right;border: 1px solid white;border-radius:50%;width:1em;height:1em;text-align:center;font-family:Roboto,Arial,sans-serif;line-height:1em;" class="tooltip">
  ?
  <div style="position:absolute;top:0;left:120%;background-color:black;color:white;border-radius:0.5em;padding:0.5em;font-weight:normal;box-shadow:0 3px 10px rgba(0,0,0,0.4);width:110px;z-index:9003;visibility:hidden;opacity:0;transition: opacity 0.8s;" class="tooltiptext">
  </div>
  </div>
</template>`;

    let intialElement = document.createElement('div');
    intialElement.style.backgroundColor = 'transparent';
    intialElement.style.position = 'fixed';
    intialElement.style.zIndex = '9001';
    intialElement.innerHTML = initialHtml;

    document.getElementsByTagName('body')[0].prepend(intialElement);
  };

  function setupCss() {
    let customStyle = document.createElement('style');
    customStyle.type = 'text/css';
    customStyle.innerHTML = `.tooltip:hover .tooltiptext:not(:hover){visibility:visible!important;opacity:1!important;}
  #drag-handle:hover{background-color:rgb(17, 85, 204)!important;}
  #delete-stuff-popup label,#delete-stuff-popup div{user-select:none;}

  :root {--rotation-period: 30s;}
  .cer0Bd[data-spin='true']{animation: spin var(--rotation-period) linear infinite;}
  .cer0Bd[data-spin='x']{animation: spinx var(--rotation-period) linear infinite;}
  @keyframes spin { 100% { transform:rotate(360deg); } }
  @keyframes spinx { 100% { transform:rotateX(360deg); } }
  `;
    document.getElementsByTagName('head')[0].appendChild(customStyle);
  }

  function addTooltip(id, helpText) {
    let tooltipTemplate = document.getElementById('tooltiptemplate').content;
    let tooltipToInsert = tooltipTemplate.cloneNode(true);
    tooltipToInsert.querySelector('.tooltiptext').textContent = helpText;
    document.getElementById(id).parentElement.parentElement.appendChild(tooltipToInsert);
  }

  function loadTooltips() {
    let tooltipText = {
      'left-eye': "Left eye of snake. Looks towards the nearest fruit.",
      'right-eye': "Right eye of snake. Looks towards the nearest fruit.",
      'snoot': "Filled circle at the tip of the snake's head.",
      'nose': "The small nostril dots under the eyes.",
      'snake-body': "The lines and curves that make up the snake's body.",
      'lumps': "The swallowed fruit that pass through the snake.",
      'eat-animation': "The snake's mouth animation when eating fruit.",
      'tongue': "Animation when the snake sticks out it's tongue.",
      'die': "Animation when the snake dies. Also used in sokoban mode.",
      'shadow': "Toggles the snake/fruit/key shadow layer. Off = no shadows at all. Default colour is dark green.",
      'shadow-included': "When on (default), hiding something also removes that part's shadow. When off, hiding something still keeps its shadow.",
      'light-tiles': "The light tiles used for the background. You may need to restart (press esc and then play) for this to take effect. This is actually just a big rectangle that the dark tiles get drawn on top of. Has a glitchy visual effect when removed.",
      'dark-tiles': "The dark tiles used for the background. You may need to restart (press esc and then play) for this to take effect. These are individually drawn squares that get drawn on top of the light tile background.",
      'border': "The dark green border around the board (canvas fill and chrome background).",
      'fruit': "Regular fruit. Poison fruit is controlled separately.",
      'poison': "Poison fruit in poison mode.",
      'portals': "The portals that can be found in portal mode.",
      'keys': "The keys that can be found in key mode.",
      'walls': "The walls that can be found in wall mode.",
      'locks': "The locks that can be found in key mode (wall blocks with lock icons).",
      'hotdog-walls': "The side walls that spawn along the snake in hotdog mode.",
      'sokoban-box': "The box that can be found in the mode where you push around a box into a goal.",
      'sokoban-goal': "The goal that can be found in the mode where you push around a box into a goal.",
      'flash-snake': "When this setting is turned on, the snake will briefly show whenever a fruit is eaten. The amount of time it shows for is controlled by the Flash Time setting. This only has a noticable effect if parts of the snake are hidden to begin with.",
      'mines': "The mines (flags) in minesweeper mode.",
      'statue': "The statue in statue mode. Including broken statue.",
      'broken-statue': "The broken statues in statue mode.",
      'spin': "Spin the entire board.",
      'mine-radius': "The mine's radius in minesweeper mode. Dashed lines. Also includes confetti from explosion.",
      'bridges': "Bridge tiles and the dashed bridge path in bridge mode.",
      'arrows': "Direction arrows painted on the board in arrow mode.",
      'gates': "Dashed gate rectangles in gate mode.",
      'shields': "Directional shield bars drawn on fruit in shield mode.",
      'light-snake': "The glow around the snake's head in light mode.",
      'light-fruit': "The glow around apples in light mode.",
    };

    for (let inputElementId in tooltipText) {
      addTooltip(inputElementId, tooltipText[inputElementId]);
    }
  }

  function spinHandler() {
    let canvasElement = document.getElementsByClassName('cer0Bd')[0];
    if (!this.checked) {
      canvasElement.dataset.spin = 'false';
    } else {
      let r = document.querySelector(':root');
      let promptResponse = prompt('How many seconds should a spin take? Enter a number', '30');
      promptResponse = parseFloat(promptResponse);
      if (isNaN(promptResponse) || promptResponse <= 0) {
        alert('Invalid value entered. Defaulting to 30');
        r.style.setProperty('--rotation-period', '30s');
      } else {
        alert(`Spinning every ${promptResponse} seconds.`);
        r.style.setProperty('--rotation-period', promptResponse + 's');
      }
      let spinAroundZ = confirm('Spin around z axis?');//Spin around x or z axis.
      canvasElement.dataset.spin = spinAroundZ ? 'true' : 'x';
    }
  }

  injectInitialHtml();
  setupCss();
  loadTooltips();
  setupEventListeners();
  window.dragHandler.initialiseDragHandler();

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.VisibilityModCode.alterSnakeCode = function (code) {

  //code = window.PuddingMod.alterSnakeCode(code);
  let deleteModDebug = false;
  if (localStorage.getItem('snakeChosenMod') === "customUrl") {
    console.log("Detected customUrl - enabling debug mode and printing initial code")
    deleteModDebug = true;
    console.log(code)
  }
  window.snakeScale = { tailStart: 1, tailEnd: 1, face: 1, eyes: 1 };

  /*
Same as replace, but throws an error if nothing is changed
*/
  function assertReplace(baseText, regex, replacement) {
    if (typeof baseText !== 'string') {
      throw new Error('String argument expected for assertReplace');
    }
    let outputText = baseText.replace(regex, replacement);

    //Throw warning if nothing is replaced
    if (baseText === outputText) {
      diagnoseRegexError(baseText, regex);
    }

    return outputText;
  }

  function swapInMainClassPrototype(mainClass, functionText) {
    functionText = assertReplace(functionText, /^[$a-zA-Z0-9_]{0,6}/, `${mainClass}.prototype`);
    return functionText;
  }

  /*
  Same as replaceAll, but throws an error if nothing is changed
  */
  function assertReplaceAll(baseText, regex, replacement) {
    if (typeof baseText !== 'string') {
      throw new Error('String argument expected for assertReplace');
    }
    let outputText = baseText.replaceAll(regex, replacement);

    //Throw warning if nothing is replaced
    if (baseText === outputText) {
      diagnoseRegexError(baseText, regex);
    }

    return outputText;
  }


  function diagnoseRegexError(baseText, regex) {
    if (!(regex instanceof RegExp)) {
      throw new Error('Failed to find match using string argument. No more details available');
    }

    //see if removing line breaks works - in that case we can give a more useful error message
    let oneLineText = baseText.replaceAll(/\n/g, '');
    let res = regex.test(oneLineText);

    //If line breaks don't solve the issue then throw a general error
    if (!res) {
      throw new Error('Failed to find match for regex.');
    }

    //Try to suggest correct regex to use for searching
    let regexSource = regex.source;
    let regexFlags = regex.flags;

    //Look at all the spots where line breaks might occur and try adding \n? there to see if it makes a difference
    //It might be easier to just crudely brute force putting \n? at each possible index?
    for (let breakableChar of ["%", "&", "\\*", "\\+", ",", "-", "\\/", ":", ";", "<", "=", ">", "\\?", "{", "\\|", "}"]) {
      for (let pos = regexSource.indexOf(breakableChar); pos !== -1; pos = regexSource.indexOf(breakableChar, pos + 1)) {
        //Remake the regex with a new line at the candidate position
        let candidateRegexSource = `${regexSource.slice(0, pos + breakableChar.length)}\\n?${regexSource.slice(pos + breakableChar.length)}`;
        let candidateRegex;

        try {
          candidateRegex = new RegExp(candidateRegexSource, regexFlags);
        } catch (err) {
          continue;
        }

        //See if the new regex works
        let testReplaceResult = candidateRegex.test(baseText);
        if (testReplaceResult) {
          //Success we found the working regex! Give descriptive error message to user and log suggested regex with new line in correct place
          console.log(`Suggested regex improvement:
  ${candidateRegex}`);
          throw new Error('Suggested improvement found! Error with line break, failed to find match for regex. See logged output for regex to use instead that should hopefully fix this.');
        }
      }
    }

    throw new Error('Line break error! Failed to failed to find match for regex - most likely caused by a new line break. No suggestions provided');
  }

  window.brieflyShowSnake = function brieflyShowSnake() {
    if (window.flashSnakeStatus.flashCount < 0) {
      throw new Error('Error with flashing snake');
    }
    window.flashSnakeStatus.flashCount++;
    window.flashSnakeStatus.currentlyFlashingSnake = true;

    //Clear flashed snake after a duration
    setTimeout(
      function () {
        window.flashSnakeStatus.flashCount--; if (window.flashSnakeStatus.flashCount === 0) { window.flashSnakeStatus.currentlyFlashingSnake = false; }
      },
      window.flashSnakeStatus.durationMillisecond
    );
  }

  //Function for body parts
  //let rightEyeRegex = /(\([a-z]\?[a-z]\.[$a-zA-Z0-9_]{0,6}:[a-z]\.[$a-zA-Z0-9_]{0,6}\)\.render\([a-z],\n?[a-z],\n?[a-z],\n?[a-z]\.[$a-zA-Z0-9_]{0,6},\n?[a-z])(\),)/;
  let rightEyeRegex = /(\([a-z]\?[a-z]\.[$a-zA-Z0-9_]{0,6}:[a-z]\.[$a-zA-Z0-9_]{0,6}\)\.render\([a-z],\n?[a-z],\n?[a-z],\n?[a-z],\n?[a-z]\*[a-z])(\),)/;

  if (deleteModDebug) {
    console.log(code)
  }

  let funcWithBodyParts_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    rightEyeRegex,
    deleteModDebug);

  let funcWithBodyParts = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    rightEyeRegex,
    deleteModDebug);

  //Die anim. The dying face is die.png, which the sprite class instantiates three times:
  //normal, mirrored, and a recoloured copy used while the snake is fading. Gate all of them.
  let dieSpriteProps = [];
  code.replace(/this\.([$a-zA-Z0-9_]{1,6})=new [$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},\n?"[^"]*die\.png"/g,
    function (whole, prop) {
      if (dieSpriteProps.indexOf(prop) === -1) { dieSpriteProps.push(prop); }
      return whole;
    });
  if (dieSpriteProps.length === 0) {
    throw new Error('Visibility mod: could not find the die.png sprite properties');
  }

  let dieGateCount = 0;
  funcWithBodyParts = funcWithBodyParts.replace(
    /(?:\([$a-zA-Z0-9_]{1,6}\?[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}):[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6})\)|[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}))\.render\(/g,
    function (whole, ternaryLeft, ternaryRight, plain) {
      let usesDieSprite = [ternaryLeft, ternaryRight, plain].some(function (prop) {
        return prop && dieSpriteProps.indexOf(prop) !== -1;
      });
      if (!usesDieSprite) { return whole; }
      dieGateCount++;
      return '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.die || window.visiFullPass) && ' + whole;
    });
  if (dieGateCount === 0) {
    throw new Error('Visibility mod: could not gate any die.png renders');
  }

  //Left/Right Eye. Both eyes come from the same sprite, drawn back to back in one comma expression
  funcWithBodyParts = assertReplace(funcWithBodyParts, /(\(([$a-zA-Z0-9_]{0,6}\?[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}:[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6})\)\.render\([$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_*]{0,6})(\)),(\(\2\)\.render\([$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_*]{0,6})(\))/,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.leftEye || window.visiFullPass) && $1 * window.snakeScale.eyes $3,' +
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.rightEye || window.visiFullPass) && $4 * window.snakeScale.eyes $5');

  //Eye offsets
  funcWithBodyParts = assertReplaceAll(funcWithBodyParts, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\+=\n?Math\.(?:cos|sin)\([$a-zA-Z0-9_]{0,6}[+-][$a-zA-Z0-9_]{0,6}\)\*[$a-zA-Z0-9_]{0,6}/g,
    '$& * window.snakeScale.eyes');

  //Eat / Nostrils share eat.png. Resting frame (d3===0) is nostrils; any other frame is the mouth.
  let eatSpriteProps = [];
  code.replace(/this\.([$a-zA-Z0-9_]{1,6})=new [$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},\n?"[^"]*eat\.png"/g,
    function (whole, prop) {
      if (eatSpriteProps.indexOf(prop) === -1) { eatSpriteProps.push(prop); }
      return whole;
    });
  if (eatSpriteProps.length === 0) {
    throw new Error('Visibility mod: could not find the eat.png sprite properties');
  }

  let eatGateCount = 0;
  funcWithBodyParts = funcWithBodyParts.replace(
    /(?:\([$a-zA-Z0-9_]{1,6}\?[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}):[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6})\)|[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}))\.render\(Math\.floor\(([$a-zA-Z0-9_.]{1,12})\)/g,
    function (whole, ternaryLeft, ternaryRight, plain, frameExpr) {
      let usesEatSprite = [ternaryLeft, ternaryRight, plain].some(function (prop) {
        return prop && eatSpriteProps.indexOf(prop) !== -1;
      });
      if (!usesEatSprite) { return whole; }
      eatGateCount++;
      return '(window.flashSnakeStatus.currentlyFlashingSnake||window.visiFullPass||(Math.floor(' + frameExpr + ')===0?window.checkboxes.checkboxStatuses.nose:window.checkboxes.checkboxStatuses.eatAnimation))&&' + whole;
    });
  if (eatGateCount === 0) {
    throw new Error('Visibility mod: could not gate any eat.png renders');
  }

  //Tongue
  funcWithBodyParts = assertReplace(funcWithBodyParts, /(\([$a-zA-Z0-9_]{0,6}\?[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}:[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6})(\)\))/,
    '(window.checkboxes.checkboxStatuses.tongue || window.visiFullPass) && $1 * window.snakeScale.face $2');

  //Snoot
  funcWithBodyParts = assertReplace(funcWithBodyParts, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fill\(\)/,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.snoot || window.visiFullPass) && $&');

  //Snoot scale
  funcWithBodyParts = assertReplace(funcWithBodyParts, /\.4/, 'window.snakeScale.face * 0.4');

  //eval(funcWithBodyParts);

  //Function for fruit (ES6 class method render(a,b) on v12+)
  let fruitRegex = /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6},0,0,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},-[$a-zA-Z0-9_]{0,6}\/2,-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/;

  let funcWithFruit_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    fruitRegex,
    deleteModDebug);

  let funcWithFruit = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    fruitRegex,
    deleteModDebug);

  //Regular fruit vs poison fruit. `nla` marks the poisonous half of the fruit set in poison mode.
  funcWithFruit = assertReplace(funcWithFruit, fruitRegex,
    '(window.visiFullPass || (b.nla ? window.checkboxes.checkboxStatuses.poison : window.checkboxes.checkboxStatuses.fruit)) && $&');

  //Mirrored copy (in twin/infinity layouts), using the same poison marker.
  funcWithFruit = assertReplace(funcWithFruit, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6},0,0,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},-\([$a-zA-Z0-9_]{0,6}\/2\),-\([$a-zA-Z0-9_]{0,6}\/2\),[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.visiFullPass || (b.nla ? window.checkboxes.checkboxStatuses.poison : window.checkboxes.checkboxStatuses.fruit)) && $&');

  //For compatitibilty, also change this code for animatedSnakeColours
  /*
  //Commented out until I find a new way to do animated Snake Colours
  funcWithFruit = assertReplaceAll(funcWithFruit,'"#578A34"', '((typeof animateSnakeGlobals !== "undefined" && animateSnakeGlobals.voice.isBorderSet) ? animateSnakeGlobals.voice.borderColour : "#578A34")');
  */

  //eval(funcWithFruit);


  // Walls / locks (ES6 class render(a) over Ca.Aa values)
  let wallInsideRegex = /this\.[$a-zA-Z0-9_]{0,6}\.Ca\.Aa\.values\(\)/;

  let funcWithRenderWall_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    wallInsideRegex,
    deleteModDebug);

  let funcWithRenderWall = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    wallInsideRegex,
    deleteModDebug);

  //for walls / locks / hotdog walls (same renderer; distinguished by k.ez and k.XNa)
  funcWithRenderWall = assertReplace(funcWithRenderWall, /this\.[$a-zA-Z0-9_]{0,6}\.fillRect\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(k.ez?window.checkboxes.checkboxStatuses.hotdogWalls:(k.XNa!==void 0&&k.XNa>=0?window.checkboxes.checkboxStatuses.locks:window.checkboxes.checkboxStatuses.walls))&&$&');

  //lock icon on wall
  funcWithRenderWall = assertReplace(funcWithRenderWall, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.locks && $&');


  //Sokoban box (TaF-style helper)
  let sokobanInsideRegex = /[$a-zA-Z0-9_]{0,6}\([a-z]\.settings,7\)&&![a-z]\)\{[a-z]=new/;

  let funcWithSokoban_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    sokobanInsideRegex,
    deleteModDebug);

  let funcWithSokoban = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    sokobanInsideRegex,
    deleteModDebug);

  //Sokoban mirrored
  funcWithSokoban = assertReplace(funcWithSokoban, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.checkboxes.checkboxStatuses.sokobanBox || window.visiFullPass) && $&');

  //Sokoban normal
  funcWithSokoban = assertReplace(funcWithSokoban, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,0,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.checkboxes.checkboxStatuses.sokobanBox || window.visiFullPass) && $&');

  //  eval(funcWithSokoban);

  SokoGoalRegex = /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,[$a-zA-Z0-9_]{0,6}\*128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\+[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\+[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)/

  //Sokoban goal func
  let funcWithSokobanGoal_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    SokoGoalRegex,
    deleteModDebug);

  let funcWithSokobanGoal = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    SokoGoalRegex,
    deleteModDebug);

  //Sokoban goal
  funcWithSokobanGoal = assertReplace(funcWithSokobanGoal, SokoGoalRegex,
    'window.checkboxes.checkboxStatuses.sokobanGoal && $&');

  //eval(funcWithSokobanGoal);


  //Shadow
  let funcWithShadow_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6}\)$/, /destination-atop/, deleteModDebug);

  let funcWithShadow = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6}\)$/, /destination-atop/, deleteModDebug);

  funcWithShadow = assertReplace(funcWithShadow, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.globalCompositeOperation="destination-atop";/, 'if(!window.checkboxes.checkboxStatuses.shadow){return}$&')


  //Normal background (i.e not on infinity)

  let funcWithBackground_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a\)$/,
    /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);for/,
    deleteModDebug);

  let funcWithBackground = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a\)$/,
    /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);for/,
    deleteModDebug);

  funcWithBackground = assertReplace(funcWithBackground, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);/,
    'if(window.checkboxes.checkboxStatuses.lightTiles){$&}');

  funcWithBackground = assertReplace(funcWithBackground, /[a-z]\.[$a-zA-Z0-9_]{0,6}\.fillRect\([a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.darkTiles && $&');

  //eval(funcWithBackground);

  let funcWithMiscRendering_Origin = findFunctionInCode(code, /render\(a,b\)$/,
    /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    deleteModDebug);

  let funcWithMiscRendering = findFunctionInCode(code, /render\(a,b\)$/,
    /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    deleteModDebug);

  //Background for infinity is also contained in funcWithFruit
  //For outer wall. This is the full canvas fill that everything else is drawn on top of
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    'window.checkboxes.checkboxStatuses.border && $&');

  //Border strips drawn around the board on mobile layouts
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /this\.context\.fillRect\((?!0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\))[^)]*\)/g,
    'window.checkboxes.checkboxStatuses.border && $&');

  //For light tiles (infinity). The infinity board renders through a local alias rather than `this`
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /(?<![$a-zA-Z0-9_.])(?!this\.)[$a-zA-Z0-9_]{1,6}\.context\.fillRect\(0,0,[$a-zA-Z0-9_]{1,6}\.context\.canvas\.width,[$a-zA-Z0-9_]{1,6}\.context\.canvas\.height\);/,
    'window.checkboxes.checkboxStatuses.lightTiles && $&');

  //For dark tiles (infinity)
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /[$a-zA-Z0-9_]{1,6}\.context\.fillRect\([$a-zA-Z0-9_]{1,6}\*[$a-zA-Z0-9_.]{1,24}-[$a-zA-Z0-9_]{1,6}\.x\+[$a-zA-Z0-9_]{1,6}\.x,[$a-zA-Z0-9_]{1,6}\*[$a-zA-Z0-9_.]{1,24}-[$a-zA-Z0-9_]{1,6}\.y\+[$a-zA-Z0-9_]{1,6}\.y,[$a-zA-Z0-9_.]{1,24},[$a-zA-Z0-9_.]{1,24}\)/,
    'window.checkboxes.checkboxStatuses.darkTiles && $&');

  //Light mode: snake-head glow (TbF) vs apple glow (fruit list loop)
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /TbF\(/g,
    'window.checkboxes.checkboxStatuses.lightSnake&&TbF(');

  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /(for\(let [$a-zA-Z0-9_]{1,6} of [$a-zA-Z0-9_]{1,6}\.wb\.wa\.ka\)\{)/,
    'if(window.checkboxes.checkboxStatuses.lightFruit)$1');

  //Inline active bridges/gates drawn in the compositor (not only via helper functions)
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /f7\(this\.settings,20\)/g,
    'f7(this.settings,20)&&window.checkboxes.checkboxStatuses.bridges');
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /f7\(this\.settings,19\)/g,
    'f7(this.settings,19)&&window.checkboxes.checkboxStatuses.gates');

  //Snake, fruit, keys and boxes are drawn into the sprite layer, and the shadow is taken straight
  //off that layer's silhouette. When Shadow Included is off and something is hidden, duplicating
  //that stretch keeps a complete silhouette for the shadow while the visible pass honours the
  //checkboxes. Everything in the stretch only paints the sprite layer, so running it twice has no
  //other effect.
  let shadowFnName = funcWithShadow_Origin.match(/^([$a-zA-Z0-9_]{1,6})=function/)[1];
  let sceneRegionRegex = new RegExp(
    '(this\\.[$a-zA-Z0-9_]{1,6}\\.render\\(a,b,[$a-zA-Z0-9_]{1,6}\\(this\\)\\);[\\s\\S]*?)' +
    '(f7\\(this\\.settings,4\\)\\|\\|' + shadowFnName.replace(/\$/g, '\\$') + '\\(this\\);)');

  funcWithMiscRendering = assertReplace(funcWithMiscRendering, sceneRegionRegex,
    'window.visiBeginShadowPass(this,f7(this.settings,4));$1$2if(window.visiEndShadowPass(this)){$1}');

  //eval(funcWithMiscRendering);

  let funcWithLockRendering_Origin = findFunctionInCode(code, /render\(\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.hb\.particles/,
    false);

  let funcWithLockRendering = findFunctionInCode(code, /render\(\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.hb\.particles/,
    false);

  //background for falling lock piece
  funcWithLockRendering = assertReplace(funcWithLockRendering, /this\.[$a-zA-Z0-9_]{0,6}\.fillRect\(-\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\)\*[$a-zA-Z0-9_]{0,6},-\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\)\*[$a-zA-Z0-9_]{0,6},this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*[$a-zA-Z0-9_]{0,6},this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.locks && $&');

  //lock icon and sokoban icon falling
  funcWithLockRendering = assertReplace(funcWithLockRendering, /(drawImage\()([a-z]\.type===\n?0\?)([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas):([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas)/,
    '$1$2(window.checkboxes.checkboxStatuses.locks ? $3 : new Image()) : (window.checkboxes.checkboxStatuses.sokobanBox ? $4 : new Image())');

  //eval(funcWithLockRendering);

  let funcWithKeyRendering_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,/,
    deleteModDebug);

  let funcWithKeyRendering = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,/,
    deleteModDebug);

  //keys
  funcWithKeyRendering = assertReplace(funcWithKeyRendering, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,[a-z]\.[a-z]-[a-z]\/2,[a-z]\.[a-z]-[a-z]\/2,[a-z],[a-z]\)/,
    '(window.checkboxes.checkboxStatuses.keys || window.visiFullPass) && $&');

  //keys upside down
  funcWithKeyRendering = assertReplace(funcWithKeyRendering, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,-\([a-z]\/2\),-\([a-z]\/2\),[a-z],[a-z]\)/,
    '(window.checkboxes.checkboxStatuses.keys || window.visiFullPass) && $&');


  //eval(funcWithKeyRendering);

  let funcWithBodyLines_Origin = findFunctionInCode(code, /render\(a,b,c\)$/,
    /quadraticCurveTo/,
    deleteModDebug);
  let funcWithBodyLines = findFunctionInCode(code, /render\(a,b,c\)$/,
    /quadraticCurveTo/,
    deleteModDebug);

if(window.NepDebug){
  console.log(funcWithBodyLines)
}

  //Lumps get drawn two different ways depending on the mode: normally as a circle wider than
  //the body stroke, and in modes that skip those circles as a bulge in the stroke width.

  //Circle version, the only arc that gets its own fillStyle before being filled
  funcWithBodyLines = assertReplace(funcWithBodyLines, /(this\.[$a-zA-Z0-9_]{0,6}\.beginPath\(\),this\.[$a-zA-Z0-9_]{0,6}\.arc\([$a-zA-Z0-9_]{0,6}\.x,[$a-zA-Z0-9_]{0,6}\.y,[$a-zA-Z0-9_]{0,6},0,2\*Math\.PI\),)(this\.[$a-zA-Z0-9_]{0,6}\.fill\(\))/,
    '$1(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.lumps || window.visiFullPass) && $2');

  //Stroke width version, the only place the body line width is scaled after being set
  funcWithBodyLines = assertReplace(funcWithBodyLines, /(this\.[$a-zA-Z0-9_]{0,6}\.lineWidth\*=[$a-zA-Z0-9_]{1,6};)/,
    'if(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.lumps || window.visiFullPass){$1}');

  funcWithBodyLines = assertReplaceAll(funcWithBodyLines, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.lineTo\(\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y\)/g,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.body || window.visiFullPass) && $&');

  funcWithBodyLines = assertReplaceAll(funcWithBodyLines, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.quadraticCurveTo\(\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y,\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y\)/g,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.body || window.visiFullPass) && $&');

  //Body scale
  //funcWithBodyLines = assertReplace(funcWithBodyLines, /\.8/, '(window.snakeScale.tailStart * 0.8)');
  //funcWithBodyLines = assertReplace(funcWithBodyLines, /\.4/, '(window.snakeScale.tailEnd * 0.4)');


  //eval(funcWithBodyLines);

  //Portals
  let portalInsideRegex = /Math\.cos\([$a-zA-Z0-9_]{0,6}\*2\*Math\.PI\)/;

  let funcWithPortals_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    portalInsideRegex,
    deleteModDebug);

  let funcWithPortals = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    portalInsideRegex,
    deleteModDebug);

  funcWithPortals = assertReplaceAll(funcWithPortals, /[$a-zA-Z0-9_]{0,6}\.fill\(\)/g,
    'window.checkboxes.checkboxStatuses.portals && $&');

  //eval(funcWithPortals);

  //For flashing snake body when we eat an apple
  let eatInsideRegex = /if\([$a-zA-Z0-9_]{0,6}\|\|[$a-zA-Z0-9_]{0,6}\){(?:var|let|const) [$a-zA-Z0-9_]{0,6}=[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6};[$a-zA-Z0-9_]{0,6}\|\|\([$a-zA-Z0-9_]{0,6}=!0/;

  let funcWithEat_Origin = findFunctionInCode(code, /tick\(\)$/,
    eatInsideRegex,
    deleteModDebug);

  let funcWithEat = findFunctionInCode(code, /tick\(\)$/,
    eatInsideRegex,
    deleteModDebug);

  funcWithEat = assertReplace(funcWithEat, /if\([$a-zA-Z0-9_]{0,6}\|\|[$a-zA-Z0-9_]{0,6}\){/,
    '$& window.checkboxes.checkboxStatuses.flashSnake && window.brieflyShowSnake();');

  //funcWithEat = swapInMainClassPrototype(mainClass, funcWithEat);
  //eval(funcWithEat);

  //Mine radius: the dashed red circle plus its fading blast preview. Both are helper calls
  //shaped `helper(renderer, centre, offsetX, offsetY, radius)`, once for the board and once per
  //wrapped copy in infinity mode.
  let mineRadiusInsideRegex = /strokeStyle="#f23606"/;

  let funcWithMineRadius_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    mineRadiusInsideRegex,
    deleteModDebug);

  let funcWithMineRadius = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    mineRadiusInsideRegex,
    deleteModDebug);

  funcWithMineRadius = assertReplaceAll(funcWithMineRadius, /[$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_]{1,6},[$a-zA-Z0-9_]{1,6},(?:0,0|[$a-zA-Z0-9_]{1,6}\.x,[$a-zA-Z0-9_]{1,6}\.y),[$a-zA-Z0-9_]{1,6}\)/g,
    'window.checkboxes.checkboxStatuses.mineRadius && $&');

  //Arrows (mode 16): triangle/stroke tiles (zaF)
  let arrowsFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{[$a-zA-Z0-9_.]{1,6}\.ka\.save\(\)/);
  if (!arrowsFnMatch) {
    throw new Error('Visibility mod: could not find arrow tile drawer (zaF)');
  }
  let arrowsFnName = arrowsFnMatch[1];
  code = assertReplace(code, new RegExp(arrowsFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    arrowsFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.arrows)return;');

  //Shields (mode 15): directional bars on fruit via S$E
  let shieldsFnMatch = code.match(/([$a-zA-Z0-9_$]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})=!1\)\{var [$a-zA-Z0-9_]{1,6}=Math\.round\([$a-zA-Z0-9_.]{1,20}\/5\)/);
  if (!shieldsFnMatch) {
    throw new Error('Visibility mod: could not find shield drawer (S$E)');
  }
  let shieldsFnName = shieldsFnMatch[1];
  code = assertReplace(code, new RegExp(shieldsFnName.replace(/\$/g, '\\$') + '=function\\(([$a-zA-Z0-9_=!,]+)\\)\\{'),
    shieldsFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.shields)return;');

  //Gates (mode 19): BbF dashed rectangles
  let gatesFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{for\(let [$a-zA-Z0-9_]{1,6} of [$a-zA-Z0-9_.]{1,20}\.Yfa\)/);
  if (!gatesFnMatch) {
    throw new Error('Visibility mod: could not find gate drawer (BbF)');
  }
  let gatesFnName = gatesFnMatch[1];
  code = assertReplace(code, new RegExp(gatesFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    gatesFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.gates)return;');

  //Bridges (mode 20): obF static tiles
  let bridgesFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{[$a-zA-Z0-9_]{1,6}\.ka\.save\(\);[$a-zA-Z0-9_]{1,6}===0&&[$a-zA-Z0-9_]{1,6}===0\|\|/);
  if (!bridgesFnMatch) {
    throw new Error('Visibility mod: could not find bridge drawer (obF)');
  }
  let bridgesFnName = bridgesFnMatch[1];
  code = assertReplace(code, new RegExp(bridgesFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    bridgesFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.bridges)return;');

  //Border chrome CSS background-color (same palette index as the canvas border fill)
  code = assertReplaceAll(code,
    /_\.on\(([$a-zA-Z0-9_.()]{1,40}),"background-color",([$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},[$a-zA-Z0-9_.]{1,20},3\))\)/g,
    '($1&&window.visiBorderEls.push($1),window.visiBorderColor=$2,_.on($1,"background-color",window.checkboxes.checkboxStatuses.border?$2:"transparent"))'
  );

    // Mines
    /*
  let funcWithMines_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}\.prototype\.render=function\(a\)$/,
    /7/,
    deleteModDebug);

  let funcWithMines = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}\.prototype\.render=function\(a\)$/,
    /7/,
    deleteModDebug);

    funcWithMines = assertReplaceAll(funcWithMines, /a.Aa.drawImage\(a.oa.canvas,0,a.ka.ka.ka\/6\)/g,
    'window.checkboxes.checkboxStatuses.mines && $&');
*/

    // Statue Cracks (best-effort — pattern may be absent on some builds)
  if (!window.catchError(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.drawImage\([a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),[a-z]\.[$a-zA-Z0-9_]{0,6}\*[a-z],0,[a-z],[a-z],-[a-z]\/2,-[a-z]\/2,[a-z],[a-z]\),[a-z]\.[$a-zA-Z0-9_]{0,6}\.globalAlpha=[a-z]\)/g, code)) {
  code = code.assertReplace(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.drawImage\([a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),[a-z]\.[$a-zA-Z0-9_]{0,6}\*[a-z],0,[a-z],[a-z],-[a-z]\/2,-[a-z]\/2,[a-z],[a-z]\),[a-z]\.[$a-zA-Z0-9_]{0,6}\.globalAlpha=[a-z]\)/g,
     'window.checkboxes.checkboxStatuses.brokenStatue && $&')
  }

     // Statue (including cracks)
  code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this,[a-z],[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\.angle,[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
     `window.checkboxes.checkboxStatuses.statue && $&`)



  minesDefinition_Origin = code.match(/this\.[a-zA-Z0-9_$]{1,8}=new [a-zA-Z0-9_$]{1,8}\(this.[a-zA-Z0-9_$]{1,8},"snake_arcade\/mine\.png\",10,this\.[a-zA-Z0-9_$]{1,8},"snake_arcade\/pixel\/px_mine\.png\"\)/g)[0]

  window.minesDefined = minesDefinition_Origin.split('=')[0].split('.')[1]
  window.minesEmptySrc = 'https://i.postimg.cc/LhKWc2Wb/Empty.png'
  minesDefinition_NewCode = `${minesDefinition_Origin};
    window.MinesRef=this;
    window.DefaultMines=${minesDefinition_Origin}
    window.NoMines=${minesDefinition_Origin.split('=')[1].split('"')[0]} "${window.minesEmptySrc}" ${minesDefinition_Origin.split('"')[2]} "${window.minesEmptySrc}" ${minesDefinition_Origin.split('"')[4]}
    `

/*
  mineRadiusWidth_Origin = code.match(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.lineWidth=[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/12;/)[0]
  mineRadiusWidth = mineRadiusWidth_Origin;

  mineRadiusWidth_Code = `
  if(window.checkboxes.checkboxStatuses.mineRadius) {
    ${mineRadiusWidth_Origin}
  }
  else {
    ${mineRadiusWidth_Origin.split('=')[0]}=0;
  }
  `
  */
  //code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this,[a-z],[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\.angle,[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
  //   `window.checkboxes.checkboxStatuses.mines && $&`)

  //code = code.assertReplace(mineRadiusWidth_Origin, mineRadiusWidth_Code)
  code = code.assertReplace(minesDefinition_Origin, minesDefinition_NewCode)
  code = code.assertReplace(funcWithMineRadius_Origin, funcWithMineRadius)
  code = code.assertReplace(funcWithFruit_Origin, funcWithFruit)
  code = code.assertReplace(funcWithBodyParts_Origin, funcWithBodyParts)
  code = code.assertReplace(funcWithRenderWall_Origin, funcWithRenderWall)
  code = code.assertReplace(funcWithSokoban_Origin, funcWithSokoban)
  code = code.assertReplace(funcWithSokobanGoal_Origin, funcWithSokobanGoal)
  code = code.assertReplace(funcWithShadow_Origin, funcWithShadow)
  code = code.assertReplace(funcWithBackground_Origin, funcWithBackground)
  code = code.assertReplace(funcWithMiscRendering_Origin, funcWithMiscRendering)
  code = code.assertReplace(funcWithLockRendering_Origin, funcWithLockRendering)
  code = code.assertReplace(funcWithKeyRendering_Origin, funcWithKeyRendering)
  code = code.assertReplace(funcWithBodyLines_Origin, funcWithBodyLines)
  code = code.assertReplace(funcWithPortals_Origin, funcWithPortals)
  code = code.assertReplace(funcWithEat_Origin, funcWithEat)

  // Disables statue break animation
  if (!window.catchError(/[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6},[a-z],new _\.[$a-zA-Z0-9_]{0,6}\([a-z],[a-z]\),[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g, code)) {
  code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6},[a-z],new _\.[$a-zA-Z0-9_]{0,6}\([a-z],[a-z]\),[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
     `window.checkboxes.checkboxStatuses.statue && $&`)
  }

  // Disable minesweeper break animation
  if (!window.catchError(/[a-z]=_\.[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\);for\([a-z]=a\.next\(\);/, code)) {
  code = code.assertReplace(/[a-z]=_\.[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\);for\([a-z]=a\.next\(\);/,
  `$& window.checkboxes.checkboxStatuses.mineRadius &&`)
  }

  //console.log(code)
  window.isVisi = true;

  return code;
}

window.VisibilityModCode.runCodeAfter = function () {

};window.MorePudding = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.MorePudding.runCodeBefore = function() {

  /*
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
*/
    //loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js');
    //loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakeCustomMenuStuff/main/modloadercode.js');

    console.log("Enabling Pudding Mod");
    window.PuddingMod.runCodeBefore();
    window.VisibilityModCode.runCodeBefore();
    window.moreMenu.runCodeBefore();

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.MorePudding.alterSnakeCode = function(code) {
  return window.moreMenu.alterSnakeCode(window.VisibilityModCode.alterSnakeCode(window.PuddingMod.alterSnakeCode(code)));
}


window.MorePudding.runCodeAfter = function() {
  //window.moreMenu.runCodeAfter();
  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'More Pudding Mod';
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
};
