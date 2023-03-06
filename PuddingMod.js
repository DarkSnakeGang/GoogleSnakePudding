window.PuddingMod = {};

/* How it begins:
this._s = this._s || {};
(function(_) {
    var window = this;
    try {
        _.M$b = function(a) {
            this.Fk = a
        }
        ;
    }  
    */

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
        'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
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

/* full zih array data:(  
0: 
{base: '#e7471d', target: '#808080', threshold: 10}
1: 
{base: '#eaca23', target: '#909090', threshold: 10}
2: 
{base: '#ea7f00', target: '#909090', threshold: 10}
3: 
{base: '#9823af', target: '#808080', threshold: 10}
4: 
{base: '#ef8d15', target: '#909090', threshold: 10}
5: 
{base: '#49c527', target: '#7a7a7a', threshold: 360}
6: 
{base: '#9823af', target: '#808080', threshold: 10}
7: 
{base: '#f40000', target: '#808080', threshold: 10}
8: 
{base: '#e7471d', target: '#808080', threshold: 10}
9: 
{base: '#ff9900', target: '#909090', threshold: 10}
10: 
{base: '#f26e4d', target: '#858585', threshold: 10}
11: 
{base: '#009900', target: '#858585', threshold: 10}
12: 
{base: '#e7471d', target: '#909090', threshold: 10}
13: 
{base: '#00a10d', target: '#808080', threshold: 1}
14: 
{base: '#00c919', target: '#858585', threshold: 360}
15: 
{base: '#efce13', target: '#909090', threshold: 10}
16: 
{base: '#fe8a00', target: '#858585', threshold: 10}
17: 
{base: '#ff886c', target: '#909090', threshold: 15}
18: 
{base: '#ca953e', target: '#909090', threshold: 10}
19: 
{base: '#ff4040', target: '#858585', threshold: 10}
20: 
{base: '#fc2d00', target: '#808080', threshold: 10}
length: 21
)
*/

/*
    Code that adds new apples:

                for (a = 0; 21 > a; a++)
                    b = tih(a),
                    b = new TK(this.settings,"snake_arcade/v4/apple_" + b + ".png",1,this.oa,"snake_arcade/pixel/px_apple_" + b + ".png"),
                    c = zih[a],
                    UK(b, c.base, c.target, c.threshold),
                    this.wa.push(b)

        tih - this function makes every number 2 digit, so 4 will become 04 and 10 stays 10
        zih - an array of "base color" and "traget color", not sure what those mean. maybe related to poison?

for(a=0;21>a;a++)b=tih(a),b=new TK(this.settings,"snake_arcade/v4/apple_"+b+".png",1,this.oa,"snake_arcade/pixel/px_apple_"+b+".png"),c=zih[a],UK(b,c.base,c.target,c.threshold),this.wa.push(b)};
regex:
        this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)};
*/  
  add_pudding = 'b=22,b=new TK(this.settings,"https://i.postimg.cc/5y7gwwGY/pudding-cr.png",1,this.oa,"https://i.postimg.cc/5y7gwwGY/pudding-cr.png"),c={base: \'#fc2d00\', target: \'#808080\', threshold: 10},UK(b,c.base,c.target,c.threshold),this.wa.push(b)$&'

  pudding_src = 'https://i.postimg.cc/5y7gwwGY/pudding-cr.png'
  add_fruit_array_last_func_regex = new RegExp("this.[a-zA-Z0-9_$]{1,8}.push\([a-zA-Z0-9_$]{1,8}\)");
  add_fruit_before_loop_regex = new RegExp(/for\(a=0;21>a;a\+\+\)/);
  print_dog = 'console.log("dog");$&';
  //debugger;
  code = code.assertReplace(add_fruit_before_loop_regex, add_pudding);
  //code = code.assertReplace(".66", "0.5");

/*
            UK - PROBABLY the function that probably creates the grey version of the fruit
            need to override it somehow to just make it the skull icon.

            eventually calls:
*/
            /* Oih = function(a, b, c, d, e) {
            a = _.feg(a);
            b = _.feg(b);
            var f = 0 === a[2] ? 1 : b[2] / a[2];
            d = d.getImageData(0, 0, d.canvas.width, d.canvas.height);
            for (var g = d.data, h = 0; h < g.length; h += 4)
                if (0 < g[h + 3]) {
                    var l = _.beg(g[h], g[h + 1], g[h + 2])
                      , r = Math.abs(l[0] - a[0]);
                    180 < r && (r = 360 - r);
                    r = 0 <= c && r >= c;
                    1 > l[2] && !r && (l[0] = b[0],
                    l[1] = b[1],
                    l[2] *= f);
                    l = _.deg(l[0], l[1], l[2]);
                    g[h] = l[0];
                    g[h + 1] = l[1];
                    g[h + 2] = l[2]
                }
            e.putImageData(d, 0, 0)
        };
            */
        
/* Make a regex that just adds the new apple
*/

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.PuddingMod.runCodeAfter = function() {

};