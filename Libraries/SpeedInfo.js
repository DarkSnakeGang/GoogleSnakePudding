window.SpeedInfo = {};

window.SpeedInfo.make = function () {

    // First game must be CE, the other is the normal game
    const gameIDs = ["o1y9pyk6", "9dow0go1"];

    window.requestsMade = 0;

    function sleepFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    window.makeAPIrequest = function (requestURL, callback) {
        // Add id to solve query isssue
        hasQuery = requestURL.includes("?")
        url = requestURL
        if (hasQuery) {
            url += "&"
        }
        else {
            url += "?"
        }
        url += "id=" + new Date().getTime()
        if (window.NepDebug) {
            console.log(url);
            console.log("Getting runs..." + window.requestsMade);
        }

        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function () {
            if (request.status == 200) {
                window.requestsMade += 1;
                let response = JSON.parse(request.response);
                //console.log(response);
                if (callback && typeof callback === "function") {
                    callback(response);
                }
            }
            else if (request.status == 404) {
                console.error("You used the API wrong!");
            }
            else {
                sleepFor(2000);
                makeAPIrequest(requestURL);
            }
        }
        request.send();
    }



    window.getGameDetails = function () {

        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[0] + "/variables", (x) => { window.SpeedrunVaraiblesJson = x });
        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[0] + "/categories?embed=game", (x) => { window.SpeedrunCategoriesJson = x });
        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[0] + "/levels", (x) => { window.SpeedrunLevelsJson = x });

        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[1] + "/variables", (x) => { window.SpeedrunVaraiblesJsonCE = x });
        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[1] + "/categories?embed=game", (x) => { window.SpeedrunCategoriesJsonCE = x });
        makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameIDs[1] + "/levels", (x) => { window.SpeedrunLevelsJsonCE = x });

        //makeAPIrequest("https://www.speedrun.com/api/v1/games/o1y9pyk6/records?top=1", printMe);


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
        15: { name: "Peaceful" },
        16: { name: "Blender" },
    }

    window.countToTxt = {
        0: { name: "1 Apple" },
        1: { name: "3 Apples" },
        2: { name: "5 Apples" },
        3: { name: "Dice" },
    }

    window.sizeToTxt = {
        0: { name: "Standard" },
        1: { name: "Small" },
        2: { name: "Large" },
    }

    window.speedToTxt = {
        0: { name: "Standard" },
        1: { name: "Fast" },
        2: { name: "Slow" },
    }

    window.getRecordSRC = function (level) {

        if (!window.speedinfoVisible) {
            // For those that don't want to see speedrun info, to keep the game stable without api calls
            EmptyAll();
            return;
        }

        if (typeof window.SpeedrunVaraiblesJson == "undefined" ||
            typeof window.SpeedrunCategoriesJson == "undefined" ||
            typeof window.SpeedrunLevelsJson == "undefined" ||
            typeof window.SpeedrunVaraiblesJsonCE == "undefined" ||
            typeof window.SpeedrunCategoriesJsonCE == "undefined" ||
            typeof window.SpeedrunLevelsJsonCE == "undefined") {
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
        PEACEFUL = 15
        BLENDER = 16

        // Speed list
        DEFAULT_SPEED = 0
        FAST = 1
        SLOW = 2

        // Count settings
        ONE_APPLE = 0;
        THREE_APPLES = 1;
        FIVE_APPLES = 2;
        DICE = 3;


        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let mode = window.CurrentModeNum;
        // Implement new method of getting mod that excludes blender

        const highscore_modes = [WALL, PORTAL, KEY, SOKO, POISON, MINESWEEPER, STATUE];

        if (size > 2 || count > 3) {
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
        if (mode == STATUE && level == "Highscore" && speed == SLOW) {
            HandleHighscore("Empty")
            return; // Statue isn't highscore on slow (yet?)
        }

        gameID = speed == SLOW ? gameIDs[1] : gameIDs[0]; // Set gameID to CE if Slow

        Highscore_ID = "";
        variable_IDs = speed != SLOW ? window.SpeedrunVaraiblesJson : window.SpeedrunVaraiblesJsonCE;
        category_IDs = speed != SLOW ? window.SpeedrunCategoriesJson : window.SpeedrunCategoriesJsonCE;
        speed_var_ID = speed_value_ID = ""
        //debugger
        for (let currentVar = 0; currentVar < variable_IDs["data"].length; currentVar++) {
            if (variable_IDs["data"][currentVar].name.includes("Multi")) {
                multi_var_ID = variable_IDs["data"][currentVar].id;
                for (var currentValue in variable_IDs["data"][currentVar].values.values) {
                    if (variable_IDs["data"][currentVar].values.values[currentValue].label == window.countToTxt[count].name) {
                        multi_value_ID = currentValue;
                        break;
                    }
                }
            }

            if (variable_IDs["data"][currentVar].name.includes("Speed")) {
                speed_var_ID = variable_IDs["data"][currentVar].id;
                for (var currentValue in variable_IDs["data"][currentVar].values.values) {
                    if (variable_IDs["data"][currentVar].values.values[currentValue].label == window.speedToTxt[speed].name) {
                        speed_value_ID = currentValue;
                        break;
                    }
                }
            }

            if (variable_IDs["data"][currentVar].name.includes("Board")) {
                size_var_ID = variable_IDs["data"][currentVar].id;
                for (var currentValue in variable_IDs["data"][currentVar].values.values) {
                    if (variable_IDs["data"][currentVar].values.values[currentValue].label == window.sizeToTxt[size].name) {
                        size_value_ID = currentValue;
                        break;
                    }
                }
            }
        }

        catch_multi = "var-" + multi_var_ID + "=" + multi_value_ID
        catch_speed = "&var-" + speed_var_ID + "=" + speed_value_ID
        catch_size = "&var-" + size_var_ID + "=" + size_value_ID

        if (speed_var_ID = "") { // Slow stuff doesn't have speed value when it's high score
            catch_speed = ""
        }

        if (level == "H") {

            for (let index = 0; index < category_IDs["data"].length; index++) {
                if (category_IDs["data"][index].name.includes(window.modeToTxt[mode].name)) {

                    Highscore_ID = category_IDs["data"][index].id;
                    break;
                }
            }

            if (window.NepDebug) {
                console.log("https://www.speedrun.com/api/v1/leaderboards/" + gameID +
                    "/category/" + Highscore_ID + "?top=1&" + catch_multi + catch_speed + catch_size)
            }

            makeAPIrequest("https://www.speedrun.com/api/v1/leaderboards/" + gameID +
                "/category/" + Highscore_ID + "?top=1&" + catch_multi + catch_speed + catch_size, HandleHighscore);

            return;
            //makeAPIrequest("https://www.speedrun.com/api/v1/categories/"+Highscore_ID+"/records?top=1&x=7kj63r42-0nwovxdl.mlnmj661-0nwomwdl.xqkkj49q-p854j77l.z19gp0jl", printMe);
        }

        level_IDs = speed != SLOW ? window.SpeedrunLevelsJson : window.SpeedrunLevelsJsonCE;

        for (let index = 0; index < level_IDs["data"].length; index++) {
            if (level_IDs["data"][index].name.includes(window.modeToTxt[mode].name) &&
                level_IDs["data"][index].name.includes(window.speedToTxt[speed].name)) {
                level_ID = level_IDs["data"][index].id;
                break;
            }
        }

        for (let index = 0; index < category_IDs["data"].length; index++) {
            if (category_IDs["data"][index].name.includes(level + " Apples")) {

                category_ID = category_IDs["data"][index].id;
                break;
            }
        }

        src_link_stuff = "https://www.speedrun.com/api/v1/leaderboards/" + gameID + "/level/"

        if (window.NepDebug) {
            console.log(src_link_stuff + level_ID + "/" + category_ID + "?top=1&" + catch_multi + catch_size)
        }
        switch (level) {
            case "25":
                makeAPIrequest(src_link_stuff + level_ID + "/" + category_ID + "?top=1&" + catch_multi + catch_size, Handle25)
                break;
            case "50":
                if (size == 1 && mode == YINYANG) {
                    Handle50("Empty")
                    break;
                }
                makeAPIrequest(src_link_stuff + level_ID + "/" + category_ID + "?top=1&" + catch_multi + catch_size, Handle50)
                break;
            case "100":
                if (size != 1) {
                    makeAPIrequest(src_link_stuff + level_ID + "/" + category_ID + "?top=1&" + catch_multi + catch_size, Handle100)
                    break;
                }
                Handle100("Empty");
                break;
            case "All":
                makeAPIrequest(src_link_stuff + level_ID + "/" + category_ID + "?top=1&" + catch_multi + catch_size, HandleAll)
                break;
            default:
                break;
        }


    }

    function printMe(response) {
        console.log(response);
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

    window.getAllSrc = function () {
        ["25", "50", "100", "All", "H"].forEach(element => {
            getRecordSRC(element);
        });
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
            console.log("Found 25 apples " + world_record + " " + response["data"]["runs"][0]["run"].weblink)
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

        document.getElementById('Hsrc').innerHTML = `Highscore: <a target="_blank" style="text-decoration: none;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
        //document.getElementById('Hsrc').href = response["data"]["runs"][0]["run"].weblink
        if (window.NepDebug) {
            console.log("Found highscore " + highscore + " " + response["data"]["runs"][0]["run"].weblink)
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

            const milliseconds = Math.round((seconds - wholeSeconds) * 1000);

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

    window.getGameDetails();
    //window.getSomethingSRC();

    window.speedinfoVisible = false;

    window.SpeedInfoShow = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'block';
        window.speedinfoVisible = true;
        window.SpeedInfoUpdate();
    }

    window.SpeedInfoHide = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'none';
        window.speedinfoVisible = false;
        document.getElementById('AlwaysOnTimeKeeper').checked = false;
    }

    window.SpeedInfoSetup = function () {

        const d = document.createElement('div');
        d.id = 'speedinfo-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);
        const speedinfoElement = document.querySelector('#speedinfo-container');

        const speedinfoBox = document.createElement('div');
        speedinfoBox.style = 'position:absolute;left:135px;z-index:10000;background-color:#4a752c;padding:8px;display:none;border-radius:3px;width:208px;height:584px;top:-45px;';
        speedinfoBox.id = 'speedinfo-popup-pudding';
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

        speedinfoElement.appendChild(speedinfoBox);

        const speedinfoCloseElements = document.getElementById('speedinfo-close');
        speedinfoCloseElements.addEventListener('click', window.SpeedInfoHide);
        //speedinfoCloseElements[1].addEventListener('click', hideSettingsBox);


        //document.getElementById('toggle-counter').addEventListener('click', toggleCounter);

        tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
        document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
            window.timeKeeper.toggleDialog();
        });

        //debugger
    }

    window.SpeedInfoSetup();

    window.ToggleSpeedInfo = function () {

        window.speedinfoVisible = !window.speedinfoVisible;
        if (window.speedinfoVisible) {
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
    document.querySelector("img[class^=\"" + backButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate();
    });

    const playButton = 'NSjDf';
    document.querySelector("div[jsname^=\"" + playButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate();
    });

    window.SpeedInfoUpdate = function () {
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

                switch (counter) {
                    case 0: gamemode += "Wall, "; break;
                    case 1: gamemode += "Portal, "; break;
                    case 2: gamemode += "Cheese, "; break;
                    case 3: gamemode += "Infinity, "; break;
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
                    case 14: gamemode += "Peaceful, "; break;
                    default: gamemode += "Unknown, "; break;
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

                minutes = Math.floor(storage[name].time / 60000);
                seconds = Math.floor((storage[name].time - minutes * 60000) / 1000);
                mseconds = storage[name].time - minutes * 60000 - seconds * 1000;
                if (minutes.toString().length < 2) { minutes = "0" + minutes.toString() }
                if (seconds.toString().length < 2) { seconds = "0" + seconds.toString() }
                while (mseconds.toString().length < 3) { mseconds = "0" + mseconds.toString() }
                score_label = "ALL" === score ? "All" : score;
                bold.innerHTML = score_label + " Apples: " + minutes + "m" + seconds + "s" + mseconds + "ms";

            }
            else {
                bold.innerHTML = "";
            }
        }

    }

    window.HandleCount = function (count) {
        switch (count) {
            case 0: return "1 Apple, "; break;
            case 1: return "3 Apples, "; break;
            case 2: return "5 Apples, "; break;
            case 3: return "Dice count, "; break;
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
    reset_regex = new RegExp(/;this\.reset\(\)/)

    speedinfo_reset = `;window.SpeedInfoUpdate();this.reset();`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, speedinfo_reset);

    switch_regex = new RegExp(/switch\(b\){case "apple"/)
    speedinfo_switch = `window.SpeedInfoUpdate();switch(b){case "apple"`
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
