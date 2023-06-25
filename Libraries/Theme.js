window.Theme = {};

window.Theme.make = function () {

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
    for(let h of window.input_button)
    {
      h.style.background = buttons_color;
    }
    for(let h of window.ui_background){
      h.style.background = bg_color;
    }
    for(let h of window.ui_bottom){
      h.style.background = bottom_color;
    }

    document.getElementById('settings-popup-pudding').style.background = real_top_bar;
    document.getElementById('speedinfo-popup-pudding').style.background = real_top_bar;

    window.real_topbar_color = real_top_bar;
    window.button_color = buttons_color;
    for(let h of window.boot_button){
      h.style.backgroundColor = buttons_color;
    }
    for(let h of window.boot_check){
      h.style.backgroundColor = buttons_color;
    }
    for(let h of window.boot_dropdown){
      h.style.backgroundColor = buttons_color;
    }

    if (set_theme) {
      window.snake.setCustomTheme(light_tiles, dark_tiles, shadow, border, key_block_sign_color, real_top_bar, endscreen_background)
    }
    `



  code = code.assertReplace(/case "theme":/, `case "theme":
  set_theme = true;
  switch(d){
    case 0:
      set_theme = true;
      light_tiles='#aad751';
      dark_tiles='#a2d149';
      shadow='#94bd46';
      border='#578a34';
      key_block_sign_color='#38640e';
      real_top_bar='#4a752c';
      endscreen_background='#4dc1f9'; // Default Sun
      sep_color='#7eccfa';
      topbar_color='#3a91bb';
      buttons_color='#1155CC';
      bg_color=bottom_color='#4dc1f9';
    break;
    case 1:
      set_theme = true;
      light_tiles='#494351';
      dark_tiles='#443e4c';
      shadow='#3d3644';
      border='#2c2730';
      key_block_sign_color='#453d4d';
      real_top_bar='#262428';
      endscreen_background='#2a2640'; // Official Dark
      sep_color='#363438';
      topbar_color=buttons_color='#111111';
      bg_color=bottom_color='#262428';
    break;
    case 2: set_theme = true;
      light_tiles='#deeced';
      dark_tiles='#d1e4e6';
      shadow='#b9d4d5';
      border='#879fa1';
      key_block_sign_color='#506486';
      real_top_bar='#75898a';
      endscreen_background='#8cbfd9'; // Snow
      sep_color='#85999a';
      topbar_color=buttons_color='#677f91';
      bg_color=bottom_color='#75898a';
    break;
    case 3: set_theme = true;
      light_tiles='#6e3535';
      dark_tiles='#673232';
      shadow='#633131';
      border='#a33e3e';
      key_block_sign_color='#642b2b';
      real_top_bar='#762d2d';
      endscreen_background='#292e4c'; // Volcano
      sep_color='#863d3d';
      topbar_color=buttons_color='#a33e3e';
      bg_color=bottom_color='#762d2d';
    break;
    case 4: set_theme = true;
      light_tiles='#f2d78c';
      dark_tiles='#eccd79';
      shadow='#e6c770';
      border='#977b26';
      key_block_sign_color='#594d26';
      real_top_bar='#725e1d';
      endscreen_background='#5fb7e3'; // Desert
      sep_color='#826e2d';
      topbar_color=buttons_color='#977b26';
      bg_color=bottom_color='#725e1d';
    break;
    case 5: set_theme = true;
      light_tiles='#3f5543';
      dark_tiles='#3b4f3f';
      shadow='#334737';
      border='#253227';
      key_block_sign_color='#354b38';
      real_top_bar='#202822';
      endscreen_background='#2b375a'; // Official Jungle
      sep_color='#303832';
      topbar_color=buttons_color='#253227';
      bg_color=bottom_color='#202822';
    break;
    case 6: set_theme = true;
      light_tiles='#b4d0f9';
      dark_tiles='#a3c5f5';
      shadow='#94baf0';
      border='#275ba5';
      key_block_sign_color='#11325f';
      real_top_bar='#1d457c';
      endscreen_background='#42a5f0'; // Pool
      sep_color='#2d558c';
      topbar_color='#275ba5';buttons_color='#1155CC';
      bg_color=bottom_color='#1d457c';
    break;
    case 7: set_theme = true;
      light_tiles='#432c68';
      dark_tiles='#3d285d';
      shadow='#3a2956';
      border='#604096';
      key_block_sign_color='#3f305a';
      real_top_bar='#432a6f';
      endscreen_background='#32224f'; // Space
      sep_color='#533a7f';
      topbar_color=buttons_color='#604096';
      bg_color=bottom_color='#432a6f';
    break;
    case 8: set_theme = false;
      window.snake.clearCustomTheme(); // Random Globe
      sep_color='#7eccfa';
      topbar_color='#3a91bb';
      real_top_bar='#4a752c';
      buttons_color='#1155CC';
      bg_color=bottom_color='#4dc1f9';
    break; // Randomize Globe Theme
    case 9: set_theme = true;
      light_tiles='#1D1D1D';
      dark_tiles='#161616';
      shadow='#111111';
      border='#000000';
      key_block_sign_color='#1D1D1D';
      real_top_bar='#111111';
      endscreen_background='#000000'; // True Dark
      sep_color='#212121';
      topbar_color=buttons_color='#000000';
      bg_color=bottom_color='#111111';
    break;
    case 10: set_theme = true;
      light_tiles='#d0b4f9';
      dark_tiles='#c5a3f5';
      shadow='#ba94f0';
      border='#5b27a5';
      key_block_sign_color='#32115f';
      real_top_bar='#451d7c';
      endscreen_background='#a542f0'; // Planeptune
      sep_color='#6b37b5';
      topbar_color=buttons_color='#5b27a5';
      bg_color=bottom_color='#a542f0';
    break;
    case 11: set_theme = true;
      light_tiles='#0050b0';
      dark_tiles='#0059b9';
      shadow='#003478';
      border='#000c30';
      key_block_sign_color='#0050b0';
      real_top_bar='#000220';
      endscreen_background='#000C30'; // Lastation
      sep_color='#101230';
      topbar_color=buttons_color='#01055C';
      bg_color=bottom_color='#000c30';
    break;
    case 12: set_theme = true;
      light_tiles='#010101';
      dark_tiles='#000000';
      shadow='#000000';
      border='#0805c6';
      key_block_sign_color='#000000';
      real_top_bar='#000000';
      endscreen_background='#000C30'; // Pacman
      sep_color='#10104d';
      topbar_color=buttons_color='#111111';
      bg_color=bottom_color='#00003d';
    break;
    case 13: set_theme = true;
      light_tiles='#B25900';
      dark_tiles='#A05000';
      shadow='#333333';
      border='#124f00';
      key_block_sign_color='#0f81d8';
      real_top_bar='#2bb800';
      endscreen_background='#0f81d8'; // Sonic
      sep_color='#1f91e8';
      topbar_color=buttons_color='#124f00';
      bg_color=bottom_color='#0f81d8';
    break;
    case 14: set_theme = true;
      light_tiles='#499D43';
      dark_tiles='#36982F';
      shadow='#336E2B';
      border='#335B36';
      key_block_sign_color='#ffef4f';
      real_top_bar='#476C42';
      endscreen_background='#13867E'; // Jungle
      sep_color='#47724C';
      topbar_color=buttons_color='#133B26';
      bg_color=bottom_color='#37623C';
    break;
    case 15: set_theme = true;
      light_tiles='#ffef4f';
      dark_tiles='#ffdf3f';
      shadow='#dfbf1f';
      border='#a55229';
      key_block_sign_color='#eeeeee';
      real_top_bar='#853209';
      endscreen_background='#853209'; // Pudding
      sep_color='#efcf2f';
      topbar_color=buttons_color='#752209';
      bg_color=bottom_color='#dfbf1f';
    break;
    case 16: set_theme = true;
      light_tiles='#57DDFF';
      dark_tiles='#57D5F4';
      shadow='#57B0C7';
      border='#006080';
      key_block_sign_color='#005C8A';
      real_top_bar='#00495C';
      endscreen_background='#00E1E6'; // Ice
      sep_color='#10C1C6';
      topbar_color=buttons_color='#00293C';
      bg_color=bottom_color='#00B1B6';
    break;
    case 17: set_theme = true; let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {}; // ModLoader
      light_tiles=advancedSettings.themeCol1 ?? '#1D1D1D';
      dark_tiles=advancedSettings.themeCol2 ?? '#161616';
      shadow=advancedSettings.themeCol3 ?? '#111111';
      border=advancedSettings.themeCol4 ?? '#000000';
      key_block_sign_color=advancedSettings.themeCol5 ?? '#1D1D1D';
      real_top_bar=advancedSettings.themeCol6 ?? '#111111';
      endscreen_background=advancedSettings.themeCol7 ?? '#000000';
      sep_color='#7eccfa';
      topbar_color='#3a91bb';
      buttons_color='#1155CC';
      bg_color=bottom_color='#4dc1f9';
    break;
  }
  ${color_code}
  `)
  return code;
}
