window.TimeKeeper = {};

window.TimeKeeper.make = function () {

    /*
    storage:
    att-modeStr-count-speed-size : number of attempts of this mode
    25-modeStr-count-speed-size: {time: time of 25 score, date: date of 25 score, att: number of attempts that reached 25 score, sum: total time of all attempts that reached 25 score}
    50, 100 and ALL idem.
    H-modeStr-count-speed-size: {high: highscore of this mode, time: time of the highscore run, date: date of the highscore run, sum: total score of all attempts}
*/
    window.timeKeeper = {};
    window.timeKeeper.debug = false;
    //called on every apple
    window.timeKeeper.gotApple = function (time, score) {
        stats.apples.session++;
        stats.apples.lifetime++;
        updateCounterDisplay();
        if (window.pudding_settings.randomizeThemeApple) {
            window.setTheme(window.getRandomThemeName());
        }
        if (window.timeKeeper.debug) {
            //console.log("got Apple %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        window.timeKeeper.lastAppleDate = new Date();
        window.timeKeeper.lastAppleTime = time;
        //save time
        if (score == 25 || score == 50 || score == 100) {
            if (window.timeKeeper.debug) {
                //console.log("Saving PB for %s Ticks, %s Apples", time, score);
            }
            window.timeKeeper.savePB(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
        }
    }

    //called when you get all apples
    window.timeKeeper.gotAll = function (time, score) {
        if (window.timeKeeper.debug) {
            //console.log("got All %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        window.timeKeeper.savePB(time, "ALL", window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
    }

    //called when you're dead, every time.
    window.timeKeeper.death = function (time, score) {
        if (window.timeKeeper.debug) {
            //console.log("death %s, %s", time, score);
        }
        if (localStorage.getItem('snakeChosenMod') != "PuddingMod"){
            return;
        }
        if (window.timeKeeper.playing) {
            window.timeKeeper.playing = false;
            window.timeKeeper.saveScore(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
        }
    }

    //called when you start gamed d
    window.timeKeeper.start = function () {
        if (window.timeKeeper.debug) {
            //console.log("start");
        }
        window.timeKeeper.playing = true;
        //save current settings
        window.timeKeeper.mode = window.timeKeeper.getCurrentMode();
        window.timeKeeper.count = window.timeKeeper.getCurrentSetting("count");
        window.timeKeeper.speed = window.timeKeeper.getCurrentSetting("speed");
        window.timeKeeper.size = window.timeKeeper.getCurrentSetting("size");
    }

    window.timeKeeper.getCurrentMode = function () {
        element = "";
        for (i of document.querySelectorAll('img')) {
            if (i.src.includes('random.png')) {
                element = i;
            }
        }
        counter = -1;
        modeStr = "";
        for (child of element.parentElement.parentElement.parentElement.children) {
            counter++;
            if (counter == 0) { continue; };
            if (child.firstElementChild.classList.length > 1 && child.firstElementChild.children.length > 0) {
                modeStr += "1";
            }
            else {
                modeStr += "0";
            }
        }

        let mode = window.timeKeeper.getCurrentSetting("trophy");
        if (mode != document.getElementById("trophy").children.length - 1) {	//not on blender mode
            modeStr = "";
            for (t = 1; t <= 17; t++) {
                if (t == mode) {
                    modeStr += "1";
                }
                else {
                    modeStr += "0";
                }
            }
        }
        return modeStr
    }

    //get the current setting, name = 'count', 'speed', 'size' or 'trophy'
    window.timeKeeper.getCurrentSetting = function (name) {
        let getSelectedIndex = function (name) {
            let elementList = document.getElementById(name);
            let number = 0;
            let classNames = [];
            let notUnique = "";
            for (element of elementList.children) {
                if (classNames.indexOf(element.className) == -1) {
                    classNames.push(element.className);
                }
                else {
                    notUnique = element.className;
                    break;
                }
            }
            for (element of elementList.children) {
                if (element.className != notUnique) {
                    return number;
                }
                number++;
            }
            return 0;
        }
        return getSelectedIndex(name);
    }

    //save highscore
    window.timeKeeper.saveScore = function (time, score, mode, count, speed, size) {
        if (count > 3 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined') {
            // More Menu, or Dice, or MouseMode or Level Editor
            return;
        }
        if (typeof (window.timeKeeper.lastAppleDate) == "undefined") {
            window.timeKeeper.lastAppleDate = new Date();
        }
        if (typeof (window.timeKeeper.lastAppleTime) == "undefined") {
            window.timeKeeper.lastAppleTime = time;
        }

        time = Math.floor(time);
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = "H" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        //if undefined, save new high
        if (typeof (storage[name]) == "undefined") {
            storage[name] = { "high": score, "time": window.timeKeeper.lastAppleTime, "date": window.timeKeeper.lastAppleDate, "sum": score };
        }
        else {
            //increase sum
            storage[name].sum += score;
            if (score > storage[name].high || (score == storage[name].high && time < storage[name].time)) {
                //save new pb
                storage[name].high = score;
                storage[name].time = window.timeKeeper.lastAppleTime;
                storage[name].date = window.timeKeeper.lastAppleDate;
            }
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //save 25, 50, 100 or 'ALL' score
    window.timeKeeper.savePB = function (time, score, mode, count, speed, size) {

        if (count > 3 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined') {
            // More Menu, or MouseMode or Level Editor
            return;
        }

        time = Math.floor(time);
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = score.toString() + "-" + mode + "-" + count + "-" + speed + "-" + size;

        //if undefined, save new pb
        if (typeof (storage[name]) == "undefined") {
            storage[name] = { "time": time, "date": new Date(), "att": 1, "sum": time };
        }
        else {
            //increase attempt
            if (typeof (storage[name].att) == "undefined") { storage[name].att = 0 };
            storage[name].att += 1;
            //increase sum
            if (typeof (storage[name].sum) == "undefined") { storage[name].sum = 0 };
            storage[name].sum += time;
            if (time < storage[name].time) {		//only pb when lower time then stored
                storage[name] = { "time": time, "date": new Date(), "att": storage[name].att, "sum": storage[name].sum };
            }
        }

        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //function to add attempt to localStorage
    window.timeKeeper.addAttempt = function (mode, count, speed, size) {
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        let name = "att" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        if (typeof (storage[name]) == "undefined") {
            storage[name] = 1;
        }
        else {
            storage[name] += 1;
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setAttempts = function (attempts) {
        if (isNaN(attempts)) {
            //console.log(attempts.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = "att" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name] = attempts;
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setPB = function (time, score, attempts, average) {
        if (isNaN(time)) {
            //console.log(time.toString() + " is not a number!");
            return;
        }
        if (score != 25 && score != 50 && score != 100 && score != "ALL") {
            //console.log(score + " has to be 25, 50, 100 or \"ALL\"!");
            return;
        }
        if (isNaN(attempts)) {
            //console.log(attempts.toString() + " is not a number!");
            return;
        }
        if (isNaN(average)) {
            //console.log(average.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = score.toString() + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name].time = time;
        storage[name].date = new Date();
        storage[name].att = attempts;
        storage[name].sum = Math.round(average * attempts);
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.setScore = function (highscore, time, average) {
        if (isNaN(highscore)) {
            //console.log(highscore.toString() + " is not a number!");
            return;
        }
        if (isNaN(time)) {
            //console.log(time.toString() + " is not a number!");
            return;
        }
        if (isNaN(average)) {
            //console.log(average.toString() + " is not a number!");
            return;
        }
        let storage = localStorage.getItem("snake_timeKeeper");
        storage = JSON.parse(storage);
        mode = window.timeKeeper.getCurrentMode()
        count = window.timeKeeper.getCurrentSetting("count");
        speed = window.timeKeeper.getCurrentSetting("speed");
        size = window.timeKeeper.getCurrentSetting("size");
        let name = "H" + "-" + mode + "-" + count + "-" + speed + "-" + size;
        storage[name] = {};
        storage[name].high = highscore;
        storage[name].time = time;
        storage[name].date = new Date();
        storage[name].sum = average * storage["att" + "-" + mode + "-" + count + "-" + speed + "-" + size];
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    //generate storage if it doesn't exist, or import from old file format.
    window.timeKeeper.makeStorage = function () {
        let storage = localStorage.getItem("snake_timeKeeper");
        if (storage == null) {
            storage = {};
            storage["version"] = 2;

            //try to read version 1 to new storage type
            old_pbs = localStorage.getItem("snake_pbs");
            if (old_pbs != null) {
                old_pbs = JSON.parse(old_pbs);
                //console.log("Converting local storage to new storage type");
                for (mode = 0; mode < 16; mode++) {
                    modeStr = "0000000000000000".split("");
                    if (mode != 0) {
                        modeStr[mode - 1] = '1';
                    }
                    modeStr = modeStr.join('');

                    for (count = 0; count < 3; count++) {
                        for (speed = 0; speed < 3; speed++) {
                            for (size = 0; size < 3; size++) {
                                for (let score of ["25", "50", "100", "ALL", "att"]) {
                                    let name = score + "-" + mode + "-" + count + "-" + speed + "-" + size;
                                    if (typeof (old_pbs[name]) != "undefined") {
                                        //console.log(name, old_pbs[name]);
                                        newName = score + "-" + modeStr + "-" + count + "-" + speed + "-" + size;
                                        storage[newName] = old_pbs[name];
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            storage = JSON.parse(storage);
        }
        if (storage["version"] != 2) {
            alert("Something went wrong with you localStorage!");
        }
        localStorage.setItem("snake_timeKeeper", JSON.stringify(storage));
    }

    window.timeKeeper.dialogActive = false;

    //generate and show the dialog
    window.timeKeeper.showDialog = function () {
        //make dialog
        window.timeKeeper.dialogActive = true;
        document.getElementById('time-keeper').innerHTML = 'Hide Details';

        //dialog = document.createElement("dialog");
        dialog = document.createElement("div");

        dialog.setAttribute("open", "");
        dialog.setAttribute("id", "timeKeeperDialog");

        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let modeStr = window.timeKeeper.getCurrentMode("size");
        //change modeStr to gamemode
        counter = 0
        var gamemode = "";
        for (t of modeStr) {
            if (t == 1) {

                switch (counter) {
                    case 0: gamemode += "Wall, "; break;
                    case 1: gamemode += "Portal, "; break;
                    case 2: gamemode += "Cheese, "; break;
                    case 3: gamemode += "Borderless, "; break;
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
                    case 14: gamemode += "Shield, "; break;
                    case 15: gamemode += "Arrow, "; break;
                    case 16: gamemode += "Peaceful, "; break;
                    default: gamemode += "Unknown, "; break;
                }
            }
            counter++;
        }
        if (gamemode == "") {
            gamemode = "Classic, ";
        }
        gamemode = gamemode.substring(0, gamemode.lastIndexOf(","));

        //add level information
        bold = document.createElement('u');
        textnode = document.createTextNode("Speed Info Details");
        bold.style = 'color:white;font-family:Roboto,Arial;'
        //textnode.style = 'color:white;font-family:Arial;'
        bold.appendChild(textnode);
        //buttonClose.style = 'color:white;background:black'; font-family:roboto;
        dialog.appendChild(bold);
        dialog.appendChild(document.createElement("br"));
        dialog.appendChild(document.createTextNode("Mode: " + gamemode));
        dialog.appendChild(document.createElement("br"));
        switch (count) {
            case 0: dialog.appendChild(document.createTextNode("1 Apple, ")); break;
            case 1: dialog.appendChild(document.createTextNode("3 Apples, ")); break;
            case 2: dialog.appendChild(document.createTextNode("5 Apples, ")); break;
            case 3: dialog.appendChild(document.createTextNode("Dice count, ")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu Apples, ")); break;
        }
        switch (speed) {
            case 0: dialog.appendChild(document.createTextNode("Normal speed, ")); break;
            case 1: dialog.appendChild(document.createTextNode("Fast speed, ")); break;
            case 2: dialog.appendChild(document.createTextNode("Slow speed, ")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu speed, ")); break;

        }
        switch (size) {
            case 0: dialog.appendChild(document.createTextNode("Normal size")); break;
            case 1: dialog.appendChild(document.createTextNode("Small size")); break;
            case 2: dialog.appendChild(document.createTextNode("Large size")); break;
            default: dialog.appendChild(document.createTextNode("MoreMenu size")); break;
        }
        //dialog.style = 'border-radius: 10px;'

        //add stats
        dialog.appendChild(document.createElement("br"));
        dialog.appendChild(document.createElement("br"));
        storage = JSON.parse(localStorage["snake_timeKeeper"]);
        let totalAttempts = 0;

        for (let score of ["att", "25", "50", "100", "ALL", "H"]) {
            let name = score + "-" + modeStr + "-" + count + "-" + speed + "-" + size;
            if (typeof (storage[name]) != "undefined") {

                bold = document.createElement('span');
                switch (score) {
                    case "25": bold.appendChild(document.createTextNode("25 Apples:")); break;
                    case "50": bold.appendChild(document.createTextNode("50 Apples:")); break;
                    case "100": bold.appendChild(document.createTextNode("100 Apples:")); break;
                    case "ALL": bold.appendChild(document.createTextNode("All Apples:")); break;
                    case "att": bold.appendChild(document.createTextNode("Total Attempts: ")); break;
                    case "H": bold.appendChild(document.createTextNode("Highscore: ")); break;
                    default: break;
                }
                dialog.appendChild(bold);

                if (score == "att") {
                    totalAttempts = storage[name];
                    dialog.appendChild(document.createTextNode(totalAttempts));
                    dialog.appendChild(document.createElement("br"));
                }
                else if (score == "H") {
                    dialog.appendChild(document.createTextNode(storage[name].high));
                }

                dialog.appendChild(document.createElement("br"));

                if (score == "att")
                    continue;

                minutes = Math.floor(storage[name].time / 60000);
                seconds = Math.floor((storage[name].time - minutes * 60000) / 1000);
                mseconds = storage[name].time - minutes * 60000 - seconds * 1000;
                if (minutes.toString().length < 2) { minutes = "0" + minutes.toString() }
                if (seconds.toString().length < 2) { seconds = "0" + seconds.toString() }
                while (mseconds.toString().length < 3) { mseconds = "0" + mseconds.toString() }
                if (score != "H") {
                    dialog.appendChild(document.createTextNode("Best Time: " + minutes + ":" + seconds + ":" + mseconds));
                    dialog.appendChild(document.createElement("br"));
                    dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                    dialog.appendChild(document.createElement("br"));
                }
                else {
                    dialog.appendChild(document.createTextNode("Duration: " + minutes + ":" + seconds + ":" + mseconds));
                    dialog.appendChild(document.createElement("br"));
                    dialog.appendChild(document.createTextNode("Achieved on: " + new Date(storage[name].date).toString()));
                    dialog.appendChild(document.createElement("br"));
                    dialog.appendChild(document.createTextNode("Average score: " + (Math.round(100 * (storage[name].sum / totalAttempts)) / 100).toString()));
                    dialog.appendChild(document.createElement("br"));
                }
                if (storage[name].att != undefined && storage[name].sum != undefined) {
                    let time = Math.floor(storage[name].sum / storage[name].att);
                    minutes = Math.floor(time / 60000);
                    seconds = Math.floor((time - minutes * 60000) / 1000);
                    mseconds = time - minutes * 60000 - seconds * 1000;
                    if (minutes.toString().length < 2) { minutes = "0" + minutes.toString() }
                    if (seconds.toString().length < 2) { seconds = "0" + seconds.toString() }
                    while (mseconds.toString().length < 3) { mseconds = "0" + mseconds.toString() }
                    dialog.appendChild(document.createTextNode("Attempts to this point: " + storage[name].att));
                    dialog.appendChild(document.createElement("br"));
                    dialog.appendChild(document.createTextNode("Average: " + minutes + ":" + seconds + ":" + mseconds));
                    dialog.appendChild(document.createElement("br"));
                }
                dialog.appendChild(document.createElement("br"));
            }
        }

        //buttonClose
        //dialog.appendChild(document.createElement("br"));
        buttonClose = document.createElement("button");
        buttonClose.appendChild(document.createTextNode("Close"));
        buttonClose.addEventListener("click", (e) => {
            window.timeKeeper.toggleDialog();
        });

        buttonClose.style = 'color:white;background-color:' + window.button_color+';';
        buttonClose.className = 'btn';
        dialog.appendChild(buttonClose);

        //buttonExport
        buttonExport = document.createElement("button");
        buttonExport.appendChild(document.createTextNode("Export"));
        buttonExport.addEventListener("click", function () {
            download("timeKeeper - " + new Date().toString() + ".txt", "To import: open snake -> open console -> paste the following:\nlocalStorage[\"snake_timeKeeper\"]='" + localStorage["snake_timeKeeper"] + "'");
        });
        //dialog.appendChild(buttonExport); // Disabled export button, I don't want this.

        //add dialog
        div = document.querySelector("body");
        dialog.setAttribute("style", "outline: none;border-radius: 10px;z-index:10100;background:"+window.real_topbar_color+";color:white;font-family:Roboto,Arial;");
        dialog.style.outline = "none";
        dialog.classList.add("custom-dialog");

        div.insertBefore(dialog, div.firstChild)
    };



    //Function to find the snake code, and apply changes.
    window.timeKeeper.setup = function () {
        //just make storage, this used to also alter snake code
        window.timeKeeper.makeStorage();
        return;
    }

    //console.log("Enabling TimeKeeper")
    window.timeKeeper.setup();

    window.timeKeeper.hideDialog = function () {
        //remove dialog when click on ok
        child = document.getElementById("timeKeeperDialog");
        child.parentElement.removeChild(child);
        window.timeKeeper.dialogActive = false;
        document.getElementById('time-keeper').innerHTML = 'Show Details';

    }

    window.timeKeeper.toggleDialog = function () {
        if (window.timeKeeper.dialogActive) {
            window.timeKeeper.hideDialog();
        }
        else {
            window.timeKeeper.showDialog();
        }
    }

    /*
    tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
    document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
        window.timeKeeper.toggleDialog();
    });
    TimerID = "yddQF"; // Inspect element on Timer and take jsname from it
    document.querySelector("div[jsname^=\"" + TimerID + "\"]").addEventListener("click", (e) => {
        window.timeKeeper.toggleDialog();
    });
    */
}

window.TimeKeeper.alterCode = function (code) {
    // TimeKeeper stuff start
    //change stepfunction to run gotApple(), gotAll() and death()

    func_regex = new RegExp(/[a-zA-Z0-9_$.]{1,40}=function\(\)[^\\]{1,1000}RIGHT":0[\s\S]*?=function/)
    window.catchError(func_regex, code)
    let func = code.match(/[a-zA-Z0-9_$.]{1,40}=function\(\)[^\\]{1,1000}RIGHT":0[\s\S]*?=function/)[0];
    StartOfNext = func.substring(func.lastIndexOf(";"), func.length);
    func = func.substring(0, func.lastIndexOf(";"));
    if (window.NepDebug) {
        console.log(func);
    }
    //let modeFunc = func.match(/1}\);[^%]{0,10}/)[0];
    //let modeFunc = func.match(/[a-zA-Z0-9$]{1,4}\([a-zA-Z0-9$]{1,4}.[a-zA-Z0-9$]{1,8},11\)&&/)[0];

    //modeFunc = modeFunc.substring(modeFunc.indexOf("(") + 1, modeFunc.lastIndexOf("("));
    //modeFunc = modeFunc.split('(')[0];
    //scoreFunc = func.match(/25\!\=\=this.[a-zA-Z0-9$]{1,4}/)[0]; // Need to figure this out
    scoreFuncVar = func.match(/25\=\=\=\n?[a-zA-Z0-9$]{1,4}/)[0].split('=')[3]; // Assuming he wanted just the "this.score"
    scoreFunc = func.match(`${window.escapeRegex(scoreFuncVar.replace('\n', ''))}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1]
    ////console.log(scoreFunc)
    //scoreFunc = scoreFunc.substring(scoreFunc.indexOf("this."),scoreFunc.size);
    //timeFunc = func.match(/this.[a-zA-Z0-9$]{1,6}\*this.[a-zA-Z0-9$]{1,6}/)[0];
    // Now has weird vars that obfuscate, it's "this.ticks" * "this.{1,4}"
    timeFunc = func.match(/\([a-zA-Z0-9$]{1,6}\*[a-zA-Z0-9$]{1,6}\)/)[0];
    ticksVar = timeFunc.split('(')[1].split("*")[0];
    tickLengthVar = timeFunc.split("*")[1].split(')')[0];
    realTicks = func.match(`${escapeRegex(ticksVar)}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
    realTickLength = func.match(`${escapeRegex(tickLengthVar)}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
    realTimeFunc = `${realTicks}*${realTickLength}`;
    timeFunc = realTimeFunc;
    ////console.log(timeFunc)
    //ownFuncIndex = func.indexOf(func.match(/!1}\);\([^%]{0,10}/)[0])+5; // No idea how this ever worked
    ownFunc = "window.timeKeeper.gotApple(Math.floor(" + timeFunc + ")," + scoreFunc + ");"
    //func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex); // Cool but no, just going to insert before the if 25 50 100 instead
    if25_regex = new RegExp(/if\(25===/)
    ownFuncIndex = func.indexOf(func.match(if25_regex)[0]);
    func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex);
    ////console.log(func);



    //change all apples to run gotAll()
    func = func.slice(0, func.indexOf("WIN.play()") + 11) + "window.timeKeeper.gotAll(Math.floor(" + timeFunc + ")," + scoreFunc + ")," + func.slice(func.indexOf("WIN.play()") + 11);

    death = func.match(/if\(this.[a-zA-Z0-9$]{1,4}\|\|this.[a-zA-Z0-9$]{1,4}\)/)[0];
    death = death.slice(death.indexOf("(") + 1, death.indexOf("|"));
    func = func.slice(0, func.indexOf("{") + 1) + "if(" + death + "){window.timeKeeper.death(Math.floor(" + timeFunc + ")," + scoreFunc + ");}" + func.slice(func.indexOf("{") + 1)
    //eval(func)

    code = code.assertReplace(func_regex, func + StartOfNext);

    ////console.log(code)

    //change start function to run gameStart() - The "start" here fails, but this section is required for the code to work -- not anymore, fixed it earlier.

    //func_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)
    //func = code.match(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)[0];
    //StartOfNext = func.substring(func.lastIndexOf(";"), func.length);
    //func = func.substring(0, func.lastIndexOf(";"));
    //step = timeFunc.substring(0, timeFunc.indexOf("*"));
    //step = "a" + step.slice(step.indexOf("."));

    //func = func.slice(0, func.indexOf("{") + 1) + "if(" + step + "==0){window.timeKeeper.start();}" + func.slice(func.indexOf("{") + 1);
    //eval(func)
    //code = code.assertReplace(func_regex, func + StartOfNext);

    //add eventhandler to click on time
    //let id = code.match(/function\(a\){if\(\!a.[a-zA-Z0-9]{1,4}&&[^"]*?"[^"]*?"/)[0];
    //id = id.substring(id.indexOf("\"")+1, id.lastIndexOf("\""));
    //let id = code.match(/"[^"]{1,9}"[^"]{1,200}"00:00:000/)[0]; // Whatever this crap gives is the wrong thing sadly
    //window.TimerID = id.substring(1, id.indexOf("\"",2));
    //document.querySelector("div[jsname^=\""+id+"\"]").addEventListener("click",(e)=>{
    //	window.timeKeeper.showDialog();
    //});

    // TimeKeeper stuff end
    ////console.log(code)
    // Counter stuff
    return code;
}
