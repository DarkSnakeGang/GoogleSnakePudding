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
        img.width = img.height = 47;
        return img;
    }

    window.skull = i('https://www.google.com/logos/fnbx/snake_arcade/v12/trophy_10.png');
    window.px_skull = i('https://www.google.com/logos/fnbx/snake_arcade/pixel/px_trophy_10.png');
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
    spawn_func_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},\n?2\)\)[a-zA-Z0-9_$]{1,8}=!0;else if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},\n?10\)&&[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=\n?!1;else{var [a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},6\)\|\|[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},7\);[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8},![a-zA-Z0-9_$]{1,8},null\)}/)

    spawn_func_code = code.match(spawn_func_regex)[0]

    is_portal = spawn_func_code.split('(')[1] + "(" + spawn_func_code.split(')')[0].split('(')[2] + ")"
    is_soko = is_portal.replace('2', '9').replace("this", "a");

    // The elegent piece of code that replace the grey pudding with the skull icon
    //console.log("Making soko goals more distinct")
    //console.log("Adding poison trophy as poison apple (click on the trophy at the top bar to toggle)")
    ////console.log(code)
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
    return code;
}
