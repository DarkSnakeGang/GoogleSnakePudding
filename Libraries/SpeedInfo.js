window.SpeedInfo = {};

window.SpeedInfo.make = function () {

    const gameIDs = ["o1y9pyk6", "9dow0go1"];

    window.requestsMade = 0;

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
        console.log(url);

        console.log("Getting runs..." + window.requestsMade);
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function () {
            if (request.status == 200) {
                window.requestsMade += 1;
                let response = JSON.parse(request.response);
                console.log(response);
                if (callback && typeof callback === "function") {
                    callback(response);
                }
            }
            else {
                sleepFor(2000);
                makeAPIrequest(requestURL);
            }
        }
        request.send();
    }

    function getCategories(response) {
        if (window.isCE) {
            window.SpeedrunCategoriesJsonCE = response;
        }
        else {
            window.SpeedrunCategoriesJson = response;
        }
    }
    function getVaraibles(response) {
        if (window.isCE) {
            window.SpeedrunVaraiblesJsonCE = response;
        }
        else {
            window.SpeedrunVaraiblesJson = response;
        }
    }
    function getLevels(response) {
        if (window.isCE) {
            window.SpeedrunLevelsJsonCE = response;
        }
        else {
            window.SpeedrunLevelsJson = response;
        }
    }

    window.getGameDetails = function () {
        window.isCE = false;
        for (gameID of gameIDs) {
            makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameID + "/variables", getVaraibles);
            makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameID + "/categories?embed=game", getCategories);
            makeAPIrequest("https://www.speedrun.com/api/v1/games/" + gameID + "/levels", getLevels);
            window.isCE = true;
        }
        window.isCE = false;
        makeAPIrequest("https://www.speedrun.com/api/v1/games/o1y9pyk6/records?top=1", printMe);
    }

    window.getSomethingSRC = function () {
        const maxAPIrequests = 5;
        const max = 200;
        if(typeof(offset) == "undefined"){
            var offset = 0; // I have no idea what is this good for??
        }

        currGameID = window.isCE ? gameIDs[1] : gameIDs[0];


        for (let i = 0; i < maxAPIrequests; i++) {
            makeAPIrequest("https://www.speedrun.com/api/v1/games/o1y9pyk6/records?top=1&category=mke9xe9d", printMe);
            offset += max;
        }
    }

    function printMe(params) {
        console.log(params)
    }




    //window.getGameDetails();
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
        <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="time-keeper" jsname="time-keeper">Show Details</button>
        <br>
        <br>

        <label id="src-title" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;justify-content: center; align-items: center; text-align: center;">SRC Stats (Unimplemetned)</label><br>        <label id="25src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="50src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="100src" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
        <label id="ALLsrc" class="form-check-label" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;"></label><br>
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

    return code;
}
