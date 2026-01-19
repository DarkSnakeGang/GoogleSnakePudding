window.SpeedInfo = {};

window.SpeedInfo.make = function () {

    // First game must be CE, the other is the normal game
    const gameIDs = ["o1y9pyk6", "9dow0go1"];
    window.first_time_call = true;
    window.requestsMade = 0;

    // FastSnakeStats cache configuration
    const FASTSNAKE_CACHE_BASE = "https://raw.githubusercontent.com/DarkSnakeGang/FastSnakeStats/main/time-travel-cache/daily";
    const CACHE_STALE_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    let cacheData = null;
    let lastCacheUpdate = 0;

    function sleepFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // New function to fetch from FastSnakeStats cache
    async function fetchFromFastSnakeCache(date = null) {
        try {
            // If no date specified, use today's date
            if (!date) {
                const today = new Date();
                date = today.toISOString().split('T')[0]; // YYYY-MM-DD format
            }

            // Parse date to get year/month/day
            const [year, month, day] = date.split('-');
            const paddedMonth = month.padStart(2, '0');
            const paddedDay = day.padStart(2, '0');

            // Construct cache URL
            const cacheUrl = `${FASTSNAKE_CACHE_BASE}/${year}/${paddedMonth}/${date}.json`;

            if (window.NepDebug) {
                console.log(`Fetching from FastSnake cache: ${cacheUrl}`);
            }

            const response = await fetch(cacheUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            cacheData = data;
            lastCacheUpdate = Date.now();
            window.requestsMade += 1;

            if (window.NepDebug) {
                console.log(`Successfully fetched cache data for ${date}`);
            }

            return data;
        } catch (error) {
            if (window.NepDebug) {
                console.error(`Failed to fetch from FastSnake cache: ${error.message}`);
            }
            throw error;
        }
    }

    // Check if cache is valid (not stale)
    function isCacheValid() {
        return cacheData && (Date.now() - lastCacheUpdate) < CACHE_STALE_THRESHOLD;
    }

    // Get the most recent available cache data
    async function getLatestCacheData() {
        if (isCacheValid()) {
            return cacheData;
        }

        // Try to get today's data first
        try {
            return await fetchFromFastSnakeCache();
        } catch (error) {
            // If today's data isn't available, try yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            try {
                return await fetchFromFastSnakeCache(yesterdayStr);
            } catch (error2) {
                // If yesterday's data isn't available, try a few days back
                for (let i = 2; i <= 7; i++) {
                    const pastDate = new Date();
                    pastDate.setDate(pastDate.getDate() - i);
                    const pastDateStr = pastDate.toISOString().split('T')[0];
                    
                    try {
                        return await fetchFromFastSnakeCache(pastDateStr);
                    } catch (error3) {
                        continue;
                    }
                }
                throw new Error("No recent cache data available");
            }
        }
    }

    // Legacy function for compatibility (now uses cache)
    window.makeAPIrequest = function (requestURL, callback) {
        // This is now a legacy function - we'll use the cache instead
        if (window.NepDebug) {
            console.log("Legacy API request called, using cache instead");
        }
        
        // For compatibility, we'll still call the callback but with cached data
        getLatestCacheData().then(data => {
            if (callback && typeof callback === "function") {
                callback(data);
            }
        }).catch(error => {
            if (window.NepDebug) {
                console.error("Cache fetch failed:", error);
            }
            // Call callback with empty data to maintain compatibility
            if (callback && typeof callback === "function") {
                callback({ data: { runs: [] } });
            }
        });
    }



    // Legacy function for compatibility
    window.getGameDetails = function () {
        // This function is no longer needed as we're using cached data
        // But we'll keep it for compatibility
        if (window.NepDebug) {
            console.log("getGameDetails called - using cached data instead");
        }
        
        // Initialize cache data if not already done
        getLatestCacheData().catch(error => {
            if (window.NepDebug) {
                console.error("Failed to initialize cache data:", error);
            }
        });
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
        15: { name: "Shield" },
        16: { name: "Arrow" },
        17: { name: "Hotdog" },
        18: { name: "Magnet" },
        19: { name: "Gate" },
        20: { name: "Peaceful" },
        21: { name: "Blender" },
    }

    window.countToTxt = {
        0: { name: "1 Apple" },
        1: { name: "3 Apples" },
        2: { name: "5 Apples" },
        3: { name: "10 Apples" },
        4: { name: "Dice" },
        5: { name: "Bomb" },
    }

    window.sizeToTxt = {
        0: { name: "Standard" },
        1: { name: "Small" },
        2: { name: "Large" },
    }

    window.speedToTxt = {
        0: { name: "Normal" },
        1: { name: "Fast" },
        2: { name: "Slow" },
    }

    daily_button.addEventListener("click", function() {
        SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e))
        EmptyAll()
      });

    window.getRecordSRC = async function (level) {

        if(window.daily_challenge){
            EmptyAll();
            return;
        }

        if (!window.pudding_settings.SpeedInfo) {
            // For those that don't want to see speedrun info, to keep the game stable without api calls
            EmptyAll();
            return;
        }

        // Get cache data
        let cacheData;
        try {
            cacheData = await getLatestCacheData();
        } catch (error) {
            if (window.NepDebug) {
                console.error("Failed to get cache data:", error);
            }
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
        SHIELD = 15
        ARROW = 16
        HOTDOG = 17
        MAGNET = 18
        GATE = 19
        PEACEFUL = 20
        BLENDER = 21

        // Speed list
        DEFAULT_SPEED = 0
        FAST = 1
        SLOW = 2

        // Count settings
        ONE_APPLE = 0;
        THREE_APPLES = 1;
        FIVE_APPLES = 2;
        TEN_APPLES = 3;
        DICE = 4;
        BOMB = 5;


        let count = window.timeKeeper.getCurrentSetting("count");
        let speed = window.timeKeeper.getCurrentSetting("speed");
        let size = window.timeKeeper.getCurrentSetting("size");
        let mode = window.CurrentModeNum;

        const highscore_modes = [WALL, PORTAL, KEY, SOKO, POISON, MINESWEEPER, STATUE, SHIELD, HOTDOG, GATE, CHEESE];

        if (size > 2 || count > 5) {
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

        // Build cache key based on FastSnakeStats format
        const modeName = window.modeToTxt[mode].name;
        const countName = window.countToTxt[count].name;
        const speedName = window.speedToTxt[speed].name;
        const sizeName = window.sizeToTxt[size].name;
        
        // Determine category name
        let categoryName;
        if (level === "H") {
            categoryName = "High Score";
        } else {
            categoryName = level + " Apples";
        }

        // Build the cache key in FastSnakeStats format
        const cacheKey = `${countName}|${speedName}|${sizeName}|${modeName}|${categoryName}`;

        if (window.NepDebug) {
            console.log(`Looking for cache key: ${cacheKey}`);
        }

        // Look up the record in cache data
        if (!cacheData.records) {
            if (window.NepDebug) {
                console.error("Cache data does not have records property:", cacheData);
            }
            EmptyAll();
            return;
        }
        
        const recordData = cacheData.records[cacheKey];

        if (window.NepDebug) {
            console.log(`Record data for key ${cacheKey}:`, recordData);
        }

        if (!recordData) {
            if (window.NepDebug) {
                console.log(`No record found for key: ${cacheKey}`);
            }
            // Handle based on level type
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Check if record exists and has runs
        if (!recordData.success || !recordData.runs || recordData.runs === "" || (Array.isArray(recordData.runs) && recordData.runs.length === 0)) {
            if (window.NepDebug) {
                console.log(`No successful runs found for key: ${cacheKey}`);
            }
            // Handle based on level type
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Check if runs is a string (empty data) or has actual run data
        if (!recordData.runs || recordData.runs.length === 0) {
            if (window.NepDebug) {
                console.log(`No run data available for key: ${cacheKey}`);
            }
            // Handle based on level type with empty data
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Parse PowerShell object strings into JavaScript objects
        let parsedRuns = [];
        for (let i = 0; i < recordData.runs.length; i++) {
            const runString = recordData.runs[i];
            if (typeof runString === "string" && runString.startsWith("@{") && runString.endsWith("}")) {
                // Parse PowerShell object string format: @{times=; date=2024-12-15; id=y2nqwrjy; weblink=...}
                const parsedRun = {};
                const content = runString.slice(2, -1); // Remove @{ and }
                const pairs = content.split(';');
                
                for (const pair of pairs) {
                    const [key, value] = pair.split('=');
                    if (key && value !== undefined) {
                        parsedRun[key.trim()] = value.trim();
                    }
                }
                
                // Convert times string to proper times object
                if (parsedRun.times) {
                    // Parse times like "PT26.595S" into { primary: "PT26.595S" }
                    parsedRun.times = { primary: parsedRun.times };
                }
                
                parsedRuns.push(parsedRun);
            } else if (typeof runString === "object") {
                // Already a proper object
                parsedRuns.push(runString);
            }
        }

        if (parsedRuns.length === 0) {
            if (window.NepDebug) {
                console.log(`No valid runs found after parsing for key: ${cacheKey}`);
            }
            // Handle based on level type
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Get the first (best) run from parsed runs
        const bestRun = parsedRuns[0];

        // Check if bestRun exists and has the expected structure
        if (!bestRun || !bestRun.times || !bestRun.times.primary || !bestRun.weblink) {
            if (window.NepDebug) {
                console.log(`Invalid run data structure for key: ${cacheKey}`, bestRun);
            }
            // Handle based on level type
            if (level === "H") {
                HandleHighscore("Empty");
            } else {
                switch (level) {
                    case "25": Handle25("Empty"); break;
                    case "50": Handle50("Empty"); break;
                    case "100": Handle100("Empty"); break;
                    case "All": HandleAll("Empty"); break;
                    default: break;
                }
            }
            return;
        }

        // Create standardized run data structure
        const runData = {
            data: {
                runs: [{
                    run: {
                        times: { primary: bestRun.times.primary },
                        weblink: bestRun.weblink
                    }
                }]
            }
        };

        // Handle based on level type using switch statement
        switch (level) {
            case "H": HandleHighscore(runData); break;
            case "25": Handle25(runData); break;
            case "50": Handle50(runData); break;
            case "100": Handle100(runData); break;
            case "All": HandleAll(runData); break;
            default:
                if (window.NepDebug) {
                    console.warn(`No handler found for level: ${level}`);
                }
                break;
        }
        



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

    window.getAllSrc = async function () {
        const levels = ["25", "50", "100", "All", "H"];
        for (const element of levels) {
            await getRecordSRC(element);
        }
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
            //console.log("Found 25 apples " + world_record + " " + response["data"]["runs"][0]["run"].weblink)
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

        document.getElementById('Hsrc').innerHTML = `Highscore: <a target="_blank" style="text-decoration: none;color:#ADD8E6 !important;" href="` + response["data"]["runs"][0]["run"].weblink + `">` + world_record + `</a>`
        //document.getElementById('Hsrc').href = response["data"]["runs"][0]["run"].weblink
        if (window.NepDebug) {
            //console.log("Found highscore " + highscore + " " + response["data"]["runs"][0]["run"].weblink)
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

    // Initialize cache data on startup
    getLatestCacheData().catch(error => {
        if (window.NepDebug) {
            console.error("Failed to initialize cache data:", error);
        }
    });

   // window.speedinfoVisible = false;

    window.SpeedInfoShow = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'block';
        speedinfoBox.style.visibility = 'visible';
        window.pudding_settings.SpeedInfo = true;

        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    }

    window.SpeedInfoHide = function () {
        const speedinfoBox = document.getElementById('speedinfo-popup-pudding');
        speedinfoBox.style.display = 'block';
        speedinfoBox.style.visibility = 'hidden';
        window.pudding_settings.SpeedInfo = false;
        document.getElementById('AlwaysOnTimeKeeper').checked = false;
    }

    window.SpeedInfoSetup = function () {

        const d = document.createElement('div');
        d.id = 'speedinfo-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);
        const speedinfoElement = document.querySelector('#speedinfo-container');


        const speedinfoBox = document.createElement('div');
        speedinfoBox.style = 'position:absolute;left:100%;z-index:10000;background-color:#4a752c;padding:8px;display:block;border-radius:3px;width:208px;height:584px;top:0px;';
        speedinfoBox.id = 'speedinfo-popup-pudding';
        speedinfoBox.style.visibility = 'hidden';
        window.speedinfoInput = speedinfoBox;
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

  document.getElementsByClassName('sEOCsb')[0].appendChild(speedinfoBox);

        const speedinfoCloseElements = document.getElementById('speedinfo-close');
        speedinfoCloseElements.addEventListener('click', window.SpeedInfoHide);
        //speedinfoCloseElements[1].addEventListener('click', hideSettingsBox);


        //document.getElementById('toggle-counter').addEventListener('click', toggleCounter);

        tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
        document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
            if(!window.daily_challenge){
                window.timeKeeper.toggleDialog();
            }
        });

        //debugger
    }

    window.SpeedInfoSetup();

    window.ToggleSpeedInfo = function () {

          window.pudding_settings.SpeedInfo = !window.pudding_settings.SpeedInfo;

        if (window.pudding_settings.SpeedInfo) {
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
    document.querySelector("[class^=\"" + backButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    });

    const playButton = 'NSjDf';
    document.querySelector("[jsname^=\"" + playButton + "\"]").addEventListener("click", (e) => {
        window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    });

    window.SpeedInfoUpdate = async function () {
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
                    case 16: gamemode += "Hotdog, "; break;
                    case 17: gamemode += "Magnet, "; break;
                    case 18: gamemode += "Gate, "; break;
                    case 19: gamemode += "Peaceful, "; break;
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
            if(window.daily_challenge) {
                bold.innerHTML = '';
                continue;
            }

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

        if(window.daily_challenge) {
            mode_label.innerHTML = 'Daily Challenge'
            mode_label2.innerHTML = '(TimeKeeper disabled)'
        }

    }

    window.HandleCount = function (count) {
        switch (count) {
            case 0: return "1 Apple, "; break;
            case 1: return "3 Apples, "; break;
            case 2: return "5 Apples, "; break;
            case 3: return "10 Apples, "; break;
            case 4: return "Dice count, "; break;
            case 5: return "Bomb count, "; break;
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
    
    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

    speedinfo_reset = `;window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));
    if(window.first_time_call){window.getAllSrc().catch(e=>console.error('getAllSrc error:',e));window.first_time_call=false;}
    ;$&`


    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, speedinfo_reset);

    switch_regex = new RegExp(/switch\(b\){case "apple"/)
    speedinfo_switch = `window.SpeedInfoUpdate().catch(e=>console.error('SpeedInfoUpdate error:',e));switch(b){case "apple"`
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
