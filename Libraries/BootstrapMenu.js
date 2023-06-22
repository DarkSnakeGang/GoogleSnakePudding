window.BootstrapMenu = {};

window.BootstrapMenu.make = function () {

    window.bootstrapVisible = false;

    window.BootstrapShow = function () {
        const settingsBox = document.getElementById('settings-popup-pudding');
        settingsBox.style.display = 'block';
        window.bootstrapVisible = true;
    }

    window.BootstrapHide = function () {
        const settingsBox = document.getElementById('settings-popup-pudding');
        settingsBox.style.display = 'none';
        window.bootstrapVisible = false;
    }

    window.BootstrapSetup = function () {

        const a = new Image();
        a.src = getStatIconImageSrc();
        a.id = 'stat-icon';
        a.width = a.height = 25;
        a.style = 'position:relative;left:475px;top:70px;';

        window.divList = document.createElement('div');
        divList.class = 'counter-num'
        divList.style = 'width:25px;position:relative;left:505px;top:45px;font-size:14px;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;line-height: normal;'
        divList.id = 'counter-num'

        document.getElementsByClassName('sEOCsb')[0].appendChild(a);
        document.getElementsByClassName('sEOCsb')[0].appendChild(divList);



        /*const c = new Image();
        c.src = 'https://i.postimg.cc/02xshYj1/index.png';
        c.width = c.height = 16;
        c.style = 'cursor:pointer;position:relative;left:-10px;top:30px;';
        c.id = 'input-counter-settings';
*/
        const d = document.createElement('div');
        d.id = 'input-counter-settings-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);
        const settingsElement = document.querySelector('#input-counter-settings-container');

        //settingsElement.appendChild(c);
        css_stripped = 'https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/bootstrap-stripped.css';
        if (window.NepDebug) {
            css_stripped = "http://127.0.0.1:5500/bootstrap-stripped.css"
        }



window.bootstrap_css = '';
const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = xhr.responseText;
        // Use the fetched data as a string
        //console.log(data); // Or do something else with the data
        window.bootstrap_css = data;
        document.getElementsByTagName('style')[0].innerHTML = document.getElementsByTagName('style')[0].innerHTML + window.bootstrap_css;
      } else {
        console.error('An error occurred while fetching Bootstrap: ', xhr.status);
      }
    }
  };

  xhr.open('GET', css_stripped, true);
  xhr.send();


        const settingsBox = document.createElement('div');
        settingsBox.style = 'position:absolute;left:135px;z-index:10000;background-color:#4a752c;padding:8px;display:none;border-radius:3px;width:210px;height:584px;top:-45px;';
        settingsBox.id = 'settings-popup-pudding';
        settingsBox.innerHTML = `

        <script src="https://code.jquery.com/jquery-3.7.0.slim.js" integrity="sha256-7GO+jepT9gJe9LB4XFf8snVOjX3iYNb0FHYr5LI1N5c=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

        <span style="color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center;">Pudding Mod Settings</span>

    <select style="margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: center; align-items: center; text-align: center;" id="stat-chooser" class="form-control">
        <option value="inputGame">Count game inputs</option>
        <option value="inputSession">Count session inputs</option>
        <option value="inputLifetime">Count lifetime inputs</option>
        <option value="playsSession">Count session resets</option>
        <option value="playsLifetime">Count lifetime resets</option>
        <option value="wallsGame">Count walls</option>
        <option value="hideCount">Counter hidden</option>
    </select>

  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="edit-stat">Edit stat</button>
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="reset-stats">Reset stats</button><br>
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="time-keeper" jsname="time-keeper">Show TimeKeeper</button>
  <br>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="SkullPoisonFruit">
    <label class="form-check-label" for="SkullPoisonFruit" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Skull Poison Fruit</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="DistinctSokoGoals" checked>
    <label class="form-check-label" for="DistinctSokoGoals" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Distinct Soko Goals</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="InputDisplay">
    <label class="form-check-label" for="InputDisplay" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Input Display</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="TopBarIcons" checked disabled>
    <label class="form-check-label" for="TopBarIcons" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Top Bar Icons <br>(Coming Soon)</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="AlwaysOnTimeKeeper" disabled>
    <label class="form-check-label" for="AlwaysOnTimeKeeper" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Always On TimeKeeper (Coming Soon)</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" role="switch" id="PortalPairs">
    <label class="form-check-label" for="PortalPairs" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Custom Portal Pairs</label>
    </div>
<select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect1" class="form-control flex-row" disabled>
    <option value="0">Apple</option>
  </select>
  <select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect2" class="form-control flex-row" disabled>
  <option value="1">Banana</option>
</select><br>

  <select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect3" class="form-control flex-row" disabled>
    <option value="2">Pineapple</option>
  </select>
  <select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect4" class="form-control flex-row" disabled>
    <option value="3">Purple Grapes</option>
  </select><br>
  <select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect5" class="form-control flex-row" disabled>
    <option value="4">Pumpkin</option>
  </select>
  <select style="width:97px;margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="fruitSelect6" class="form-control flex-row" disabled>
    <option value="5">Onion</option>
  </select>
  <br>

<select style="margin:3px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display: inline-block; align-items: center; text-align: center;" id="snakePride" class="form-control flex-row">
  <option value="0">Default Rainbow</option>
</select>

  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="settings-close" jsname="settings-close">Close</button>

  `;

        settingsElement.appendChild(settingsBox);

        skull_checkbox = document.getElementById("SkullPoisonFruit");
        skull_checkbox.addEventListener("change", toggle_skull_func, false);
        soko_checkbox = document.getElementById("DistinctSokoGoals");
        soko_checkbox.addEventListener("change", toggle_soko_goal, false);
        Input_checkbox = document.getElementById("InputDisplay");
        Input_checkbox.addEventListener("change", toggle_input_display, false);

        let settingsToValues = {
            inputs: {
                game: 'inputGame',
                session: 'inputSession',
                lifetime: 'inputLifetime'
            },
            plays: {
                session: 'playsSession',
                lifetime: 'playsLifetime'
            },
            walls: {
                game: 'wallsGame'
            },
            hide: {
                count: 'hideCount'
            }
        }

        let valuesToSettings = {
            inputGame: { stat: 'inputs', duration: 'game' },
            inputSession: { stat: 'inputs', duration: 'session' },
            inputLifetime: { stat: 'inputs', duration: 'lifetime' },
            playsSession: { stat: 'plays', duration: 'session' },
            playsLifetime: { stat: 'plays', duration: 'lifetime' },
            wallsGame: { stat: 'walls', duration: 'game' },
            hideCount: { stat: 'hide', duration: 'count' },
        }

        //preselect based on saved settings
        //document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

        document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

        //Listeners to hide/show settings box when clickng the cog, or the X - not anymore! Only back button.
        //document.querySelector('#input-counter-settings').addEventListener('click', showSettingsBox);

        const settingsCloseElements = document.getElementById('settings-close');
        settingsCloseElements.addEventListener('click', window.BootstrapHide);
        //settingsCloseElements[1].addEventListener('click', hideSettingsBox);

        document.getElementById('stat-chooser').onchange = function () {
            stats.statShown = valuesToSettings[this.value].stat;
            stats.statDurationShown = valuesToSettings[this.value].duration;
            document.getElementById('stat-icon').src = getStatIconImageSrc();
            updateCounterDisplay();
        }

        document.getElementById('edit-stat').addEventListener('click', promptToEditStatCount);
        document.getElementById('reset-stats').addEventListener('click', promptToResetStats);
        //document.getElementById('toggle-counter').addEventListener('click', toggleCounter);

        tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
        document.querySelector("button[jsname^=\"" + tempID + "\"]").addEventListener("click", (e) => {
            window.timeKeeper.toggleDialog();
        });
        TimerID = "yddQF"; // Inspect element on Timer and take jsname from it
        document.querySelector("div[jsname^=\"" + TimerID + "\"]").addEventListener("click", (e) => {
            window.timeKeeper.toggleDialog();
        });

        //debugger
    }

    window.BootstrapSetup();

    window.ToggleBootstrap = function () {
        if (!window.bootstrapVisible) {
            // Show it
            window.BootstrapShow();
        }
        else {
            // Hide it
            window.BootstrapHide();
        }
    }

    //Listeners to hide/show settings box
    const settingsButton = 'iyH4Cb';
    document.querySelector("div[jsname^=\"" + settingsButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapShow();
    });

    const backButton = 'p17HVe';
    document.querySelector("img[class^=\"" + backButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapHide();
    });


    const playButton = 'NSjDf';
    document.querySelector("div[jsname^=\"" + playButton + "\"]").addEventListener("click", (e) => {
        window.BootstrapHide();
    });

    window.BootstrapUpdate = function () {
        // Mainly for TimeKeeper, runs when "play" is clicked

    }

}

window.BootstrapMenu.alterCode = function (code) {

    return code;
}
