window.CustomPortalPairs = {};

window.CustomPortalPairs.make = function () {

    // Code that runs before anything else here, loading variables, etc.
    // Recommended to use "window." for things
    //window.portal_pairs = false;
    let first_time_portal = true;
    window.toggle_portal_pairs = function toggle_portal_pairs() {
          // this is so that if the input display starts on, it doesnt trigger it to be off, like what normally unchecking the box would do, since I'm using the same function.
          if(first_time_portal){
            first_time_portal=false;
          }
          else
          {window.pudding_settings.PortalPairs = !window.pudding_settings.PortalPairs;}

        for (var i = 1; i <= 6; i++) {
            var selectElement = document.getElementById('fruitSelect' + i.toString());

            selectElement.disabled = !window.pudding_settings.PortalPairs;
        }
        //console.log(window.pudding_settings.PortalPairs)
    }

    window.sortFruit = function (arr) {
        return arr.slice().sort((a, b) => a - b);
    }

    portal_pairs_checkbox = document.getElementById("PortalPairs");
    portal_pairs_checkbox.checked = window.pudding_settings.PortalPairs;
    portal_pairs_checkbox.addEventListener("change", toggle_portal_pairs);
    toggle_portal_pairs();
    // console.log("AAAAAAAAAAAAAAAAAAAA", window.pudding_settings.PortalPairs);

    var fruitToText = {
        0: { name: "Apple", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png" },
        1: { name: "Banana", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_01.png" },
        2: { name: "Pineapple", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_02.png" },
        3: { name: "Purple Grapes", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_03.png" },
        4: { name: "Pumpkin", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_04.png" },
        5: { name: "Onion", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_05.png" },
        6: { name: "Eggplant", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_06.png" },
        7: { name: "Strawberry", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_07.png" },
        8: { name: "Cherry", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_08.png" },
        9: { name: "Carrot", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_09.png" },
        10: { name: "Mushroom", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_10.png" },
        11: { name: "Broccoli", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_11.png" },
        12: { name: "Watermelon", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_12.png" },
        13: { name: "Green Pepper", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_13.png" },
        14: { name: "Kiwi", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_14.png" },
        15: { name: "Lemon", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_15.png" },
        16: { name: "Orange", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_16.png" },
        17: { name: "Peach", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_17.png" },
        18: { name: "Peanut", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_18.png" },
        19: { name: "Raspberries", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_19.png" },
        20: { name: "Tomato", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_20.png" },
        21: { name: "Juniper Berries", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_21.png" },
        22: { name: "Fruit Bowl", image: "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_22.png" },
        23: { name: "Pudding", image: "https://i.postimg.cc/5y7gwwGY/pudding-cr.png" },
        24: { name: "Blue Berries", image: "https://i.postimg.cc/8cmVPfGd/blueberries.png" },
        25: { name: "Red Pepper", image: "https://i.postimg.cc/BQqHMbDc/redpepper.png" },
        26: { name: "Lime", image: "https://i.postimg.cc/k5kWcyFB/lime.png" },
        27: { name: "Black Berries", image: "https://i.postimg.cc/hPTVGdNX/blackberries.png" },
        28: { name: "Green Grapes", image: "https://i.postimg.cc/dQ78zXBm/green-grapes.png" },
        29: { name: "Burger", image: "https://i.postimg.cc/13m2Cr16/burger.png" },
        30: { name: "Cheese", image: "https://i.postimg.cc/zXD1z9d6/trophy-03.png" },
        31: { name: "Fries", image: "https://i.postimg.cc/YCMFFP1Q/french-fries.png" },
        32: { name: "Hotdog", image: "https://i.postimg.cc/BbQf4Vgs/hotdog.png" },
        33: { name: "Pizza", image: "https://i.postimg.cc/rwDXKnPj/pizza.png" },
        34: { name: "Pacman Ghost", image: "https://i.postimg.cc/TP7ZGZGf/pacman-ghost.png" },
        35: { name: "Sonic Ring", image: "https://i.postimg.cc/pX1xYGp9/sonic-ring.png" },
        36: { name: "Steak", image: "https://i.postimg.cc/XYjC4zzf/steak.png" },
        37: { name: "Coconut", image: "https://i.postimg.cc/1XbSVygZ/coconut.png" },
        38: { name: "Poop", image: "https://i.postimg.cc/66719KfJ/poop.png" },
        39: { name: "Egg", image: "https://i.postimg.cc/ZRg1jkrg/egg.png" },
        40: { name: "Mango", image: "https://i.postimg.cc/R0NbYNSH/Mango.png" },
        41: { name: "Melon", image: "https://i.postimg.cc/8knkL3WN/melon.png" },
        42: { name: "Red Banana", image: "https://i.postimg.cc/3JsKcvnq/musa-banana.png" },
        43: { name: "Pear", image: "https://i.postimg.cc/L6Y9DTBf/pear.png" },
        44: { name: "Soccer Ball", image: "https://i.postimg.cc/C1yT8vjL/soccer-ball.png" },
        45: { name: "Jackolantern", image: "https://i.postimg.cc/rwMX5hbg/true-jacko.png" },
        46: { name: "Ice", image: "https://i.postimg.cc/mrL8PJmK/ice.png" },
        47: { name: "Red Pudding", image: "https://i.postimg.cc/15kNH2Y5/pudding-red.png" },
        48: { name: "Dirt Block", image: "https://i.postimg.cc/7ZvhtHKK/mc-dirt-px.png" }
    };


    window.fruit_options = [];
    //debugger
    window.selected_fruit = window.pudding_settings.SelectedPairs;
    window.onscreen_fruit = [];
    window.offscreen_fruit = [];

    // Code to alter snake code here
    if (window.NepDebug) {
        //console.log(document.querySelector('#apple').children)
        console.log(document.querySelector('#apple').children.length);
        //console.log(window.new_fruit)
        //console.log(code)
    }


    window.PopulateOptions = function PopulateOptions() {
        window.fruit_options = [];

        for (let index = 0; index < document.querySelector('#apple').children.length; index++) {
            if (index == 22) {
                index++; // Skip fruit bowl
            }
            window.fruit_options.push(index);
        }

        for (var i = 1; i <= 6; i++) { // Remove selected fruit from new options
            var otherSelectElement = document.getElementById('fruitSelect' + i);
            var selectedFruitIndex = fruit_options.indexOf(parseInt(otherSelectElement.value));
            if (selectedFruitIndex > -1) {
                fruit_options.splice(selectedFruitIndex, 1);
            }
        }

        window.fruit_options = Array.from(new Set(window.fruit_options));
        window.fruit_options = window.sortFruit(window.fruit_options);
    }



    window.PopulateDropdowns = function PopulateDropdowns() {
        // Populate dropdowns

        for (var i = 1; i <= 6; i++) {
            //debugger
            var selectElement = document.getElementById('fruitSelect' + i);

            var dropdown_fruit = selected_fruit[i - 1];
            var option = document.createElement('option');
            option.value = dropdown_fruit;
            if (typeof (dropdown_fruit) === 'undefined') {
                dropdown_fruit = i - 1;
                option.value = dropdown_fruit;
            }

            option.textContent = fruitToText[dropdown_fruit].name;
            option.setAttribute('data-image', fruitToText[dropdown_fruit].image);
            selectElement.innerHTML = '';
            selectElement.appendChild(option);

            for (var j = 0; j < fruit_options.length; j++) {
                if (fruit_options[j] != dropdown_fruit &&
                    fruit_options.indexOf(parseInt(selected_fruit[0])) == -1
                    && fruit_options.indexOf(parseInt(selected_fruit[1])) == -1
                    && fruit_options.indexOf(parseInt(selected_fruit[2])) == -1
                    && fruit_options.indexOf(parseInt(selected_fruit[3])) == -1
                    && fruit_options.indexOf(parseInt(selected_fruit[4])) == -1
                    && fruit_options.indexOf(parseInt(selected_fruit[5])) == -1
                ) {
                    var fruit = fruit_options[j];
                    var option = document.createElement('option');
                    option.value = fruit;
                    option.textContent = fruitToText[fruit].name;
                    option.setAttribute('data-image', fruitToText[fruit].image);
                    selectElement.appendChild(option);
                }
            }
        }
    }



}

window.CustomPortalPairs.alterCode = function (code) {


    // window.PopulateOptions();
    // window.PopulateDropdowns();

    // PopulateOptions();
    // PopulateDropdowns();


    // Function to handle the selection change
    function handleSelection(index) {
        //var selectElement = document.getElementById('fruitSelect' + index);
        //var selectedOption = selectElement.value;
        window.selected_fruit = [];

        // Update Selected Fruit from all dropdowns
        for (var i = 1; i <= 6; i++) {
            var otherSelectElement = document.getElementById('fruitSelect' + i);
            window.selected_fruit.push(otherSelectElement.value)
        }

        PopulateOptions();
        PopulateDropdowns();
    }


    var selectElement = document.getElementById('fruitSelect1');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 1
    });
    var selectElement = document.getElementById('fruitSelect2');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 2
    });
    var selectElement = document.getElementById('fruitSelect3');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 3
    });
    var selectElement = document.getElementById('fruitSelect4');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 4
    });
    var selectElement = document.getElementById('fruitSelect5');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 5
    });
    var selectElement = document.getElementById('fruitSelect6');
    selectElement.addEventListener("click", function () {
        window.fruitSelectID = 6
    });

    for (var i = 1; i <= 6; i++) {
        var selectElement = document.getElementById('fruitSelect' + i);
        selectElement.addEventListener("change", function () {
            handleSelection(window.fruitSelectID)
            if (window.NepDebug) {
                console.log(window.selected_fruit)
                console.log(window.fruit_options)
            }
        });
    }

    window.custom_pair_call_counter = 0; // Reset every new game

    reset_regex = new RegExp(/;this\.reset\(\)/)

    counter_reset_code = `window.custom_pair_call_counter = 0;this.reset();`

    code = code.assertReplace(reset_regex, counter_reset_code);

    portal_pairs_regex = new RegExp(/this\.[a-zA-Z0-9_$]{1,8}\[c\]\.[a-zA-Z0-9_$]{1,8}=[a-zA-Z0-9_$]{1,8}\(this\)/)
    apple_array = code.match(portal_pairs_regex)[0].split('.')[1].split('[')[0]
    give_portal_type_func = code.match(portal_pairs_regex)[0].split('=')[1]
    apple_type = code.match(portal_pairs_regex)[0].split('.')[2].split('=')[0]

    window.give_custom_pair = function () {
        window.custom_pair_call_counter = window.custom_pair_call_counter + 1;
        if (window.NepDebug) {
            console.log("Giving fruit: " + selected_fruit[window.custom_pair_call_counter - 1].toString())
        }
        return selected_fruit[window.custom_pair_call_counter - 1]
    }

    portal_pairs_code = `
    if(window.pudding_settings.PortalPairs){this.${apple_array}[c].${apple_type} = window.give_custom_pair();
    this.${apple_array}[c+1].${apple_type} = this.${apple_array}[c].${apple_type};}
    else this.${apple_array}[c].${apple_type} = ${give_portal_type_func}
    `

    code = code.assertReplace(portal_pairs_regex, portal_pairs_code);

    // Code to alter snake code here
    if (window.NepDebug) {
        //console.log(document.querySelector('#apple').children)
        console.log(document.querySelector('#apple').children.length);
        //console.log(window.new_fruit)
        //console.log(code)
    }

    portal_dice_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},2\)&&0<[a-zA-Z0-9_$]{1,8}\.length\)\{/)
    apple_dice_array = code.match(portal_dice_regex)[0].split('<')[1].split('.')[0];
    portal_dice_full_regex = new RegExp(/if\([a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},2\)&&0<[a-zA-Z0-9_$]{1,8}\.length\)\{[^]*type}/gm)
    portal_pairs_dice_code = code.match(portal_dice_full_regex)[0]

    portal_dice_pairs_code = `
    {

        if(window.pudding_settings.PortalPairs){
            window.custom_pair_call_counter = 0;
            for(var apple_index=0;apple_index<${apple_dice_array}.length;apple_index+=2){
                ${apple_dice_array}[apple_index].${apple_type} = window.give_custom_pair();
                ${apple_dice_array}[apple_index+1].${apple_type} = ${apple_dice_array}[apple_index].${apple_type};
            }
        }
        else {

    `

    portal_pairs_dice_code = portal_pairs_dice_code.assertReplace('type}', 'type}}');
    portal_pairs_dice_code = portal_pairs_dice_code.assertReplace('{', portal_dice_pairs_code);

    code = code.assertReplace(portal_dice_full_regex, portal_pairs_dice_code);

    return code;
}
