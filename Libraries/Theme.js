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
  console.log("Adding new themes")

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
    case 10: window.snake.setCustomTheme('#d0b4f9', '#c5a3f5', '#ba94f0', '#5b27a5', '#32115f', '#451d7c', '#a542f0'); // Planeptune
    sep_color='#6b37b5';
    topbar_color=buttons_color='#5b27a5';
    bg_color=bottom_color='#a542f0';
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
    case 14: window.snake.setCustomTheme('#499D43', '#36982F', '#336E2B', '#335B36', '#ffef4f', '#476C42', '#13867E'); // Jungle
    sep_color='#47724C';
    topbar_color=buttons_color='#335B36';
    bg_color=bottom_color='#37623C';
    break;
    case 15: window.snake.setCustomTheme('#ffef4f', '#ffdf3f', '#dfbf1f', '#a55229', '#eeeeee', '#853209', '#853209'); // Pudding
    sep_color='#efcf2f';
    topbar_color=buttons_color='#752209';
    bg_color=bottom_color='#dfbf1f';
    break;
    case 16: let advancedSettings = JSON.parse(localStorage.getItem('snakeAdvancedSettings')) ?? {}; // ModLoader
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
  }
  ${color_code}
  `)
    return code;
}
