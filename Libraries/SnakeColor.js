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

    //console.log("Adding new snake colors")

    code = code.assertReplace(snake_colors_regex, colors_build)
    code = code.assertReplace(yinyang_colors_regex, yinyang_colors_build)

    return code;
}
