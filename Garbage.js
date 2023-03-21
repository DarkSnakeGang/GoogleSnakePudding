
// Unused code, doubt it will ever be handy, but it used to work at one point, maybe.

Bb_replaced_code = code.match(Bb_regex)[0].replaceAll(Bb_to_count2, Replace_BB)

part1 = Bb_replaced_code.split('{')[0];
part2 = Bb_replaced_code.split('{')[1];
Bb_replaced_code = part1 + "{" + check_count_undefined + part2;

// Deprecated code has been replace with a match better version:




    // Get all elements with text content - this will give them all shadows, was help full for dark mode
/*const elements = document.querySelectorAll("*:not(script):not(style):not(meta):not(link)");

// Loop through each element
elements.forEach(element => {
  // Get the computed style of the element
  const style = window.getComputedStyle(element);

  // Get the current color of the text
  const color = style.color;

  // Create a new style with a dark outline and apply it to the element
  element.style.textShadow = `1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000`;
});*/

//previously working stable version of endscreen related fruit change

link_regex = new RegExp(/settings\.[a-zA-Z0-9_$]{1,8}=\"https\:\/\/www\.google\.com\/logos\/fnbx\/\"\+\(1\=\=\=[a-zA-Z0-9_$]{1,8}\.settings\.[a-zA-Z0-9_$]{1,8}\?\"snake_arcade\/pixel\/px_apple_\"\+[a-zA-Z0-9_$]{1,8}\+\"\.png\"\:\"snake_arcade\/v4\/apple\_\"\+[a-zA-Z0-9_$]{1,8}\+\"\.png\"\)/);
link_match = code.match(link_regex)[0]
settings_grab = link_match.split('.')[1].split("=")[0]

  //load_pudding_code = `if\(${select_fruit_numvar}==22\)${settings_var}.settings.${settings_src}="${pudding_src}";`


  ip_grabber = new RegExp(/=new [a-zA-Z0-9_$]{1,8}\(this.settings,\"snake_arcade\/v4\/apple_\"/)
  func_name = code.match(ip_grabber)[0].replace("=new ", "").replace('\(this.settings,\"snake_arcade\/v4\/apple_\"',"")
  ip_grabber2 = new RegExp(/[a-zA-Z0-9_$]{1,8}\(b,c.base,c.target,c.threshold\)/)
  func_name2 = code.match(ip_grabber2)[0].replace('\(b,c.base,c.target,c.threshold\)',"")
  array_grabber = new RegExp(/".png"\),c=[a-zA-Z0-9_$]{1,8}\[a\],/)
  array_name = code.match(array_grabber)[0].replace('".png"\),c=',"").replace('[a],',"")
  add_pudding2 = '$&;b=new '+func_name+'(this.settings,"https://i.postimg.cc/5y7gwwGY/pudding-cr.png",1,this.oa,"https://i.postimg.cc/5y7gwwGY/pudding-cr.png");'+func_name2+'(b,\'#eaca23\',\'#909090\',10);this.wa.push(b);'

  // No Idea why did was ever needed. This probably replaced the topbar fruit with pudding at some point
  //code = code.assertReplace(count_score, add_pudding2);

  add_fruit_array_last_func_regex = new RegExp(/.threshold\),this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)/);
  //add_fruit_before_loop_regex = new RegExp(/for\(a=0;21>a;a\+\+\)/);

  code = code.assertReplace(add_fruit_array_last_func_regex, add_pudding2);

  // else a.ka&&(a.ka.src="https://www.google.com/logos/fnbx/"+a.Qa,_.Tj(a.ka,"load",function(){$dh(a)}))}

  // `(a.${Pr_pa} == "${pudding_src}") ? ${pudding_src} : "https://www.google.com/logos/fnbx/"+a.${Pr_pa}`

  /////////             b = Math.floor(Math.random() * (this.ka.oa.width * this.ka.oa.height - a.size));
// Logic for golden apple here
