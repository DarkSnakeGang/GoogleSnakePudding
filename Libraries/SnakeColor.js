window.SnakeColor = {};

window.SnakeColor.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things

}

window.SnakeColor.alterCode = function (code) {

    // Code to alter snake code here
    snake_colors_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}[^]?=[^]?\[\["#4E7CF6","#17439F"\][^]*?\]\]/);
    yinyang_colors_regex = new RegExp(/\[5,4,7,7,1,2,0,3,9,8,0,14,15,15,11,12,17,16\]/)

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
    code = code.assertReplace(color_regex, color_get_code);

    rainbow_usage_regex = new RegExp(`{var [a-zA-Z0-9_$]{1,6}\\\=[a-zA-Z0-9_$]{1,6}\\\?[a-zA-Z0-9_$]{1,6}\\:${default_rainbow_array}\\\;`)

    if (window.NepDebug) {
        console.log(code.match(rainbow_usage_regex)[0])
    }

    window.snakeRainbowOverride = 0;

    rainbow_code = `{
    ${default_rainbow_array} = window.rainbowAlts[window.snakeRainbowOverride].set;
    ${yinyang_rainbow_array} = window.rainbowAlts[window.rainbowAlts[window.snakeRainbowOverride].yinyang].set;
    ${code.match(rainbow_usage_regex)[0].split('{')[1]}
    `

    // https://www.google.com/logos/fnbx/snake_arcade/v5/color_10.png



    snake_face_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,6}\)[a-zA-Z0-9_$]{1,6}\.[a-zA-Z0-9_$]{1,6}=[a-zA-Z0-9_$]{1,6}\[0\]\[0\]/)
    snake_face_code = code.match(snake_face_regex)[0]
    snake_face_code = `${code.match(snake_face_regex)[0].split('=')[0]}=10===${code.match(snake_face_regex)[0].split(')')[0]}? window.rainbowAlts[window.snakeRainbowOverride].set[0] : ${code.match(snake_face_regex)[0].split('=')[1]}`

    //console.log(snake_face_code)
    code = code.assertReplace(rainbow_usage_regex, rainbow_code)
    code = code.assertReplace(snake_face_regex, snake_face_code)
    //code = code.assertReplace(/a\.Yd=qN\[0\]\[1\];/, `a.Yd=10 === a.settings.Aa ? window.rainbowAlts[window.snakeRainbowOverride].set[0] : qN[0][1];`)
    //code = code.assertReplace(code.match(`${default_rainbow_array}\\\[0\\\]`)[0], `window.rainbowAlts[window.snakeRainbowOverride].set[0]`)
    //console.log(code)
    // ["#4E7CF6","#17439F"]
    //code = code.assertReplace(/0===a\.settings\.Aa\|\|/, "")
    //code = code.assertReplace(/0===a\.settings\.Aa\|\|/, "")
    //code = code.assertReplace(/\["#4E7CF6","#17439F"\]/, `["#FFFFFF","#FFFFFF"]`)

    snake_face2_reg = new RegExp(/\|\|10===[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\)[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/gm)
    snakeface2code = '&&!window.randomColor&&!window.isRainbow)' + code.match(snake_face2_reg)[0].split(')')[1]
    code = code.assertReplace(snake_face2_reg, snakeface2code)

    rainbow_bool_regex = new RegExp(/10===[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/g)

    is_rainbow_matches = code.match(rainbow_bool_regex).length;
    for (let index = 0; index < is_rainbow_matches; index++) {
        const element = code.match(rainbow_bool_regex)[0];
        snake_color_num = element.split('=')[3]
        make_me_different = `10==` + element.split('=')[3]
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


    //code = code.assertReplace(/this\.zd=qN\[0\]\[0\];/,`this.zd=qN[0][0];debugger;`)

    return code;
}
