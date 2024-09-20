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
    //document.getElementsByClassName('TO4uAe wSwbef')[1].addEventListener('click', toggle_skull_func, false);

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

    // Attempt to get info on which mode it is
    spawn_func_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},\n?2\)\)[a-zA-Z0-9_$]{1,8}=!0;else if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},\n?10\)&&[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=\n?!1;else{var [a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8}\)\|\|[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},7\);[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8},![a-zA-Z0-9_$]{1,8},null\)}/)

    spawn_func_code = code.match(spawn_func_regex)[0]

    is_portal = spawn_func_code.split('(')[1] + "(" + spawn_func_code.split(')')[0].split('(')[2] + ")"
    is_soko = is_portal.replace('2', '9').replace("this", "a");

    // The elegent piece of code that replace the grey pudding with the skull icon
    //console.log("Making soko goals more distinct")
    //console.log("Adding poison trophy as poison apple (click on the trophy at the top bar to toggle)")
    ////console.log(code)

    realism_draw = new RegExp(/function\(a,b\){switch.*{d/);
    realism_switch = code.match(realism_draw)[0];
    //actual_canvas_regexp = new RegExp(/a.[a-zA-Z0-9_$]{1,8}.canvas,/);
    //actual_canvas = code.match(actual_canvas_regexp)[0]
    realism_path = new RegExp(/function\(a,b\){switch.*}}/);
    last_path = code.match(realism_path)[0].split('.')[9].split('}')[0]

    get_graphics = realism_switch.split(':')[1].split(')')[0];
nothing =` if(window.pudding_settings.SokoGoals && a.${last_path}.path.includes("box")){
    switch (${get_graphics}) {
        default:
        case 0:
            a.oa.xy = window.distinct_soko_goal;
            break;
        case 1:
            a.Ba.xy = window.distinct_soko_goal_px;
            break;
        case 2:
            a.Ea.xy = window.distinct_soko_goal;
            break;
    }
}`

    window.drawing_apple = true;

    get_apple_stuff = new RegExp(/var.*[a-zA-Z0-9_$]{1,8}\.canvas\:.*\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\);/)
    poison_default = code.match(get_apple_stuff)[0]
    b_graphics = poison_default.split('(')[2].split(')')[0]

    get_apple_code = `
    if(window.pudding_settings.Skull){
        b.type = ${poison_default.split('?')[1].split('=')[1]} ? ${poison_default.split('<')[1].split('?')[0]} - 1 : b.type;
    }
    ${poison_default}
    `

    /*get_apple_code = `
    if(window.pudding_settings.Skull){
        switch (window.graphics_selected) {
            default:
            case 0:
                final_skull = window.skull;
                break;
            case 1:
                final_skull = window.px_skull;
                break;
            case 2:
                final_skull = window.real_skull;
                break;
            case 3:
                switch (${b_graphics}) {
                    default:
                    case 0:
                        final_skull = window.skull;
                        break;
                    case 1:
                        final_skull = window.px_skull;
                        break;
                    case 2:
                        final_skull = window.real_skull;
                        break;
                }
                break;
        }
        b.type = ${poison_default.split('?')[1].split('=')[1]} ? ${poison_default.split('<')[2].split('?')[0]} - 1 : b.type;
        //${poison_default.split('?')[0]} ? ${poison_default.split('?')[1]} ? final_skull : ${poison_default.split(':')[2]}
        ${poison_default}

    }
    else {
        ${poison_default}
    }
     `*/
    code = code.assertReplace(get_apple_stuff, get_apple_code)

    disable_real_grey = new RegExp(/\(f=[a-zA-Z0-9_$]{1,8}.[a-zA-Z0-9_$]{1,8}\)==null\|\|[a-zA-Z0-9_$]{1,8}\(f,b,c,-1\)/)
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

    code = code.assertReplace(disable_real_grey,new_grey_code)

    if (window.NepDebug) {
        console.log(code)
    }

    sokondeez = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}=new.*box\..*}/gm)
    sokondeez_code = code.match(sokondeez)[0]

    sokondeez_nuts = `
    window.SokoRef=this;
    window.DefaultSokoGoal=${sokondeez_code.slice(0, -1)}
    window.DistinctSokoFinal=${sokondeez_code.split('=')[1].split('"')[0]} "${window.distinct_soko_goal.src}" ${sokondeez_code.split('"')[2]} "${window.distinct_soko_goal_px.src}" ${sokondeez_code.split('"')[4]}
    `

    code = code.assertReplace(sokondeez, sokondeez_nuts)

    //keep_running = new RegExp(/;if\([a-zA-Z0-9_$]{1,8}\(this.[a-zA-Z0-9_$]{1,8},9\)\)/)
/*
    code = code.assertReplace(keep_running, `;
    if (window.pudding_settings.SokoGoals) {
        window.SokoRef.${sokondeez_code.split('=')[0].split('.')[1]} = window.DistinctSokoFinal;
    }
    else {
        window.SokoRef.${sokondeez_code.split('=')[0].split('.')[1]} = window.DefaultSokoGoal;
    }
    ${code.match(keep_running)[0]}`)
*/
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

    //code = code.assertReplace(/this.Ja.canvas,/, `window.distinct_soko_goal,`)

/*

Generally speaking, there is a "shadow" apple that is just the skull icon
And the code recognizes poison apples and changes their "type" (fruit) to that skull

*/

    //disappear_skull = new RegExp(/this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([a-z],0,\n?0,\n?[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}/)
    //dis_skull = code.match(disappear_skull)[0]
    //code = code.assertReplace(disappear_skull, `false && ` + dis_skull)

/*
    pudding_draw = `

    if(window.drawing_apple && (a.${last_path}.path.includes("apple") || a.${last_path}.path.includes("postimg")) ){
        //a.oa.xy = window.skull;
        //debugger

        if(window.pudding_settings.Skull){
            switch (${get_graphics}) {
                default:
                case 0:
                    a.oa.xy = window.skull;
                    break;
                case 1:
                    a.Ba.xy = window.px_skull;
                    break;
                case 2:
                    a.Ea.xy = window.real_skull;
                    break;
            }
        }
        else if(a.${last_path}.path.includes("ghost")){
            switch (${get_graphics}) {
                default:
                case 0:
                    a.oa.xy = window.ghost_skull;
                    break;
                case 1:
                    a.Ba.xy = window.px_ghost_skull;
                    break;
                case 2:
                    a.Ea.xy = window.ghost_skull;
                    break;
            }
        }
    }

    `
*/
    //actual_canvas = code.match(test_regexp)[0]

    // Still need to take into account realism style.

    //code = code.assertReplace(realism_draw, pudding_draw + `;` + realism_switch)


    /*

    draw_skull_func = new RegExp(/return [a-zA-Z0-9_$]{1,8}\(a.[a-zA-Z0-9_$]{1,8}\)\&\&a\.[a-zA-Z0-9_$]{1,8}\?a\.[a-zA-Z0-9_$]{1,8}\.canvas\:a\.[a-zA-Z0-9_$]{1,8}\.canvas},[a-zA-Z0-9_$]{1,8}=function\(\)/gm)
    new_draw_skull = code.match(draw_skull_func)[0].split("}")[0]
    get_pixel = new_draw_skull.split(' ')[1].split('&')[0]
    pudding_skull_xd = `
if(!a.path.includes("key")){
if(window.pudding_settings.SokoGoals && a.path.includes("box")){if(${get_pixel}){return window.distinct_soko_goal_px;}return window.distinct_soko_goal;}
if(window.pudding_settings.Skull && !a.path.includes("box")){if(${get_pixel}){return window.px_skull;}return window.skull;}
if(a.path.includes("ghost")){if(${get_pixel}){return window.px_ghost_skull;}return window.ghost_skull;}
}
${code.match(draw_skull_func)[0].split("}")[0]};}
${code.match(draw_skull_func)[0].split("}")[1]}`

    code = code.assertReplace(draw_skull_func, pudding_skull_xd)

    */


    return code;
}
