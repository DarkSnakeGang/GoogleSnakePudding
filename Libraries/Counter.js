window.Counter = {};

window.Counter.make = function () {


    window.loadStatistics = function () {
        let stats = localStorage.getItem('inputCounterMod');
        if (stats === null) {
            stats = {
                visible: false,
                statShown: 'inputs',
                statDurationShown: 'game',
                inputs: {
                    game: 0,
                    session: 0,
                    lifetime: 0
                },
                plays: {
                    session: 0,
                    lifetime: 0
                }
            };
        } else {
            stats = JSON.parse(stats);
        }
        //Make sure these get reset
        stats.inputs.game = 0;
        stats.inputs.session = 0;
        stats.plays.session = 0;
        if (stats.visible === null) {
            stats.visible = true;
        }
        return stats;
    }
    window.stats = window.loadStatistics();
    window.saveStatistics = function () {
        if (typeof stats !== 'undefined' &&
            typeof stats.statShown !== 'undefined' &&
            typeof stats.statDurationShown !== 'undefined' &&
            typeof stats.inputs !== 'undefined' &&
            typeof stats.plays !== 'undefined' &&
            typeof stats.inputs.game !== 'undefined' &&
            typeof stats.inputs.session !== 'undefined' &&
            typeof stats.inputs.lifetime !== 'undefined' &&
            typeof stats.plays.session !== 'undefined' &&
            typeof stats.plays.lifetime !== 'undefined' &&
            typeof stats.visible !== 'undefined'
        ) {
            localStorage.setItem('inputCounterMod', JSON.stringify(stats));
        }
    }
    window.updateCounterDisplay = function () {
        divList.innerHTML = stats[stats.statShown][stats.statDurationShown];
    }
    window.promptToResetStats = function () {
        let userResponse = prompt('Type DELETE to reset all stats. Cannot be undone');
        if (userResponse === 'DELETE') {
            localStorage.removeItem('inputCounterMod');
            stats = {
                visible: false,
                statShown: 'inputs',
                statDurationShown: 'game',
                inputs: {
                    game: 0,
                    session: 0,
                    lifetime: 0
                },
                plays: {
                    session: 0,
                    lifetime: 0
                }
            };
            saveStatistics();
            updateCounterDisplay();
            alert('All stats have been reset');
        } else {
            alert('Did not reset all stats');
        }
    }
    window.promptToEditStatCount = function () {
        let userResponse = prompt(`Change the stat count for "${stats.statShown} - ${stats.statDurationShown}"? This won't change any of the other stats. Current value: ${stats[stats.statShown][stats.statDurationShown]}`, stats[stats.statShown][stats.statDurationShown]);
        userResponse = parseInt(userResponse, 10);
        if (isNaN(userResponse)) {
            alert('Invalid - did not change stat count');
        } else {
            stats[stats.statShown][stats.statDurationShown] = userResponse;
            saveStatistics();
            updateCounterDisplay();
            alert(`Changed stat count to ${userResponse}`);
        }
    }
    window.showSettingsBox = function () {
        const settingsBox = document.getElementById('settings-popup');
        settingsBox.style.display = 'block';
        window.cogOff();
    }

    window.hideSettingsBox = function () {
        const settingsBox = document.getElementById('settings-popup');
        settingsBox.style.display = 'none';
        window.cogOn();
    }

    window.getStatIconImageSrc = function () {
        return stats.statShown === 'plays' ? 'https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png' : 'https://www.google.com/logos/fnbx/snake_arcade/keys.svg';
    }
    window.setuphtml = function () {
        const a = new Image();
        a.src = getStatIconImageSrc();
        a.id = 'stat-icon';
        a.width = a.height = 25;
        a.style = 'position:relative;left:475px;top:70px;';

        window.divList = document.createElement('div');
        divList.class = 'counter-num'
        divList.style = 'width:25px;position:relative;left:505px;top:45px;font-size:14px;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;'
        divList.id = 'counter-num'

        document.getElementsByClassName('sEOCsb')[0].appendChild(a);
        document.getElementsByClassName('sEOCsb')[0].appendChild(divList);

        const c = new Image();
        c.src = 'https://i.postimg.cc/02xshYj1/index.png';
        c.width = c.height = 16;
        c.style = 'cursor:pointer;position:relative;left:-10px;top:30px;';
        c.id = 'input-counter-settings';

        const d = document.createElement('div');
        d.id = 'input-counter-settings-container';
        d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
        document.getElementsByClassName('sEOCsb')[0].appendChild(d);
        const settingsElement = document.querySelector('#input-counter-settings-container');
        settingsElement.appendChild(c);

        const settingsBox = document.createElement('div');
        settingsBox.style = 'position:absolute;left:135px;z-index:10000;background-color:#111111;padding:8px;display:none;border-radius:3px;width:200px;';
        settingsBox.id = 'settings-popup';
        settingsBox.innerHTML = `
  <span style="color:white;font-family:Roboto,Arial,sans-serif;">Counter Settings</span><span class="settings-close" style="float:right;cursor:pointer">&times;</span><br>
  <select style="margin:3px;background-color:#111111;color:white;font-family:Roboto,Arial,sans-serif;" id="stat-chooser">
    <option value="inputGame">Game inputs</option>
    <option value="inputSession">Session inputs</option>
    <option value="inputLifetime">Lifetime inputs</option>
    <option value="playsSession">Session resets</option>
    <option value="playsLifetime">Lifetime resets</option>
  </select><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="edit-stat">Edit stat count</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="reset-stats">Reset all stats</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="toggle-counter">Toggle Counter</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="time-keeper" jsname="time-keeper">Show TimeKeeper</button>
  <br>
  <span style="margin:3px;color:white;cursor:pointer;font-family:Roboto,Arial,sans-serif;" class="settings-close">Close</span>
  `;

        settingsElement.appendChild(settingsBox);

        let settingsToValues = {
            inputs: {
                game: 'inputGame',
                session: 'inputSession',
                lifetime: 'inputLifetime'
            },
            plays: {
                session: 'playsSession',
                lifetime: 'playsLifetime'
            }
        }

        let valuesToSettings = {
            inputGame: { stat: 'inputs', duration: 'game' },
            inputSession: { stat: 'inputs', duration: 'session' },
            inputLifetime: { stat: 'inputs', duration: 'lifetime' },
            playsSession: { stat: 'plays', duration: 'session' },
            playsLifetime: { stat: 'plays', duration: 'lifetime' },
        }

        //preselect based on saved settings
        document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

        //Listeners to hide/show settings box when clickng the cog, or the X
        document.querySelector('#input-counter-settings').addEventListener('click', showSettingsBox);
        const settingsCloseElements = document.getElementsByClassName('settings-close');
        settingsCloseElements[0].addEventListener('click', hideSettingsBox);
        settingsCloseElements[1].addEventListener('click', hideSettingsBox);

        document.getElementById('stat-chooser').onchange = function () {
            stats.statShown = valuesToSettings[this.value].stat;
            stats.statDurationShown = valuesToSettings[this.value].duration;
            document.getElementById('stat-icon').src = getStatIconImageSrc();
            updateCounterDisplay();
        }

        document.getElementById('edit-stat').addEventListener('click', promptToEditStatCount);
        document.getElementById('reset-stats').addEventListener('click', promptToResetStats);
        document.getElementById('toggle-counter').addEventListener('click', toggleCounter);
    }

    window.cogOff = function () {
        document.getElementById('input-counter-settings').style.display = 'none';
    }

    window.cogOn = function () {
        if (document.getElementById('settings-popup').style.display == 'none') {
            document.getElementById('input-counter-settings').style.display = 'inline';
        }
    }

    window.toggleCounter = function () {
        stats.visible = !stats.visible;
        if (stats.visible) {
            document.getElementById('stat-icon').style.display = 'inline';
            document.getElementById('counter-num').style.display = 'inherit';
            document.getElementById('toggle-counter').innerHTML = 'Hide counter';
        }
        else {
            document.getElementById('stat-icon').style.display = 'none';
            document.getElementById('counter-num').style.display = 'none';
            document.getElementById('toggle-counter').innerHTML = 'Show counter';
        }
        saveStatistics();
    }

    window.setuphtml();

    if (stats.visible) {
        document.getElementById('stat-icon').style.display = 'inline';
        document.getElementById('counter-num').style.display = 'inherit';
        document.getElementById('toggle-counter').innerHTML = 'Hide counter';
    }
    else {
        document.getElementById('stat-icon').style.display = 'none';
        document.getElementById('counter-num').style.display = 'none';
        document.getElementById('toggle-counter').innerHTML = 'Show counter';
    }

}

window.Counter.alterCode = function (code) {


    return code;
}
