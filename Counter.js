window.Counter = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.Counter.runCodeBefore = function() {
    windows.loadStatistics = function() {
        let stats = localStorage.getItem('inputCounterMod');
        if(stats === null) {
            stats = {
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
        } else{
            stats = JSON.parse(stats);
        }
        //Make sure these get reset
        stats.inputs.game = 0;
        stats.inputs.session = 0;
        stats.plays.session = 0;

        return stats;
    }
    window.saveStatistics = function() {
        if(typeof stats !== 'undefined' &&
        typeof stats.statShown !== 'undefined' &&
        typeof stats.statDurationShown !== 'undefined' &&
        typeof stats.inputs !== 'undefined' &&
        typeof stats.plays !== 'undefined' &&
        typeof stats.inputs.game !== 'undefined' &&
        typeof stats.inputs.session !== 'undefined' &&
        typeof stats.inputs.lifetime !== 'undefined' &&
        typeof stats.plays.session !== 'undefined' &&
        typeof stats.plays.lifetime !== 'undefined'
        ) {
            localStorage.setItem('inputCounterMod', JSON.stringify(stats));
        }
    }
    window.updateCounterDisplay=function() {
        divList.innerHTML = stats[stats.statShown][stats.statDurationShown];
    }
    window.promptToResetStats=function() {
        let userResponse = prompt('Type DELETE to reset all stats. Cannot be undone');
        if(userResponse === 'DELETE') {
            localStorage.removeItem('inputCounterMod');
            loadStatistics();
            saveStatistics();
            updateCounterDisplay();
            alert('All stats have been reset');
        } else {
            alert('Did not reset all stats');
        }
    }
    window.promptToEditStatCount=function() {
        let userResponse = prompt(`Change the stat count for "${stats.statShown} - ${stats.statDurationShown}"? This won't change any of the other stats. Current value: ${stats[stats.statShown][stats.statDurationShown]}`, stats[stats.statShown][stats.statDurationShown]);
        userResponse = parseInt(userResponse,10);
        if(isNaN(userResponse)) {
          alert('Invalid - did not change stat count');
        } else {
          stats[stats.statShown][stats.statDurationShown] = userResponse;
          saveStatistics();
          updateCounterDisplay();
          alert(`Changed stat count to ${userResponse}`);
        }
    }
    window.showSettingsBox=function() {
        const settingsBox = document.getElementById('settings-popup');
        settingsBox.style.display = 'block';
    }

    window.hideSettingsBox=function() {
        const settingsBox = document.getElementById('settings-popup');
        settingsBox.style.display = 'none';
    }

    window.getStatIconImageSrc=function() {
        return stats.statShown === 'plays' ? 'https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png' : 'https://www.google.com/logos/fnbx/snake_arcade/keys.svg';
    }
    /*
This function will search for a function/method in some code and return this function as a string

code will usually be the snake source code

functionSignature will be regex matching the beginning of the function/method (must end in $),
for example if we are trying to find a function like s_xD = function(a, b, c, d, e) {......}
then put functionSignature = /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/

somethingInsideFunction will be regex matching something in the function
for example if we are trying to find a function like s_xD = function(a, b, c, d, e) {...a.Xa&&10!==a.Qb...}
then put somethingInsideFunction = /a\.[$a-zA-Z0-9_]{0,6}&&10!==a\.[$a-zA-Z0-9_]{0,6}/

levelsToGoUp tells us how many "layers" of curly brackets we need to go up before we get to our function

*/
window.findFunctionInCode = function(code, functionSignature, somethingInsideFunction, logging = false) {
    /*Check functionSignature ends in $*/
    if(functionSignature.toString()[functionSignature.toString().length-2] !== "$") {
      throw new Error("functionSignature regex should end in $");
    }

    /*get the position of somethingInsideFunction*/
    let indexWithinFunction = code.search(somethingInsideFunction);
    if(indexWithinFunction == -1) {
      throw new Error("couldn't find a match for somethingInsideFunction");
    }

    /*expand outwards from somethingInsideFunction until we get to the function signature, then count brackets
    to find the end of the function*/
    startIndex = 0;
    for(let i = indexWithinFunction; i >= 0; i--) {
      let startOfCode = code.substring(0,i);
      startIndex = startOfCode.search(functionSignature);
      if(startIndex !== -1) {
        break;
      }
      if(i == 0) {
        throw new Error("Couldn't find function signature");
      }
    }

    let bracketCount = 0;
    let foundFirstBracket = false;
    let endIndex = 0;
    /*Use bracket counting to find the whole function*/
    let codeLength = code.length;
    for(let i = startIndex; i<=codeLength; i++){
      if(!foundFirstBracket && code[i] == "{") {
        foundFirstBracket = true;
      }

      if(code[i] == "{") {
        bracketCount++;
      }
      if(code[i] == "}") {
        bracketCount--;
      }
      if(foundFirstBracket && bracketCount == 0) {
        endIndex = i;
        break;
      }

      if(i == codeLength) {
        throw new Error("Couldn't pair up brackets");
      }
    }

    let fullFunction = code.substring(startIndex,endIndex + 1);

    /*throw error if fullFunction doesn't contain something inside function - i.e. function signature was wrong*/
    if(fullFunction.search(somethingInsideFunction) === -1) {
      throw new Error("Function signature does not belong to the same function as somethingInsideFunction");
    }

    if(logging) {
      console.log(fullFunction);
    }

    return fullFunction;
  }

  window.setuphtml=function() {
    const a = new Image();
    a.src = getStatIconImageSrc();
    a.id = 'stat-icon';
    a.width = a.height = 25;
    a.style = 'position:relative;left:460px;top:11.5px;';

    window.divList = document.createElement('div');
    divList.class = 'counter-num'
    divList.style = 'width:25px;position:relative;left:490px;top:-24px;font-size:20px;font-family:Roboto,Arial,sans-serif;'

    document.getElementsByClassName('sEOCsb')[0].appendChild(a);
    document.getElementsByClassName('sEOCsb')[0].appendChild(divList);

    const c = new Image();
    c.src = 'https://i.postimg.cc/02xshYj1/index.png';
    c.width = c.height = 16;
    c.style = 'cursor:pointer;z-index:10000';
    c.id = 'input-counter-settings';

    const d = document.createElement('div');
    d.id = 'input-counter-settings-container';
    d.style = 'position:absolute;left:465px;top:45px;z-index:10000';
    document.getElementsByClassName('sEOCsb')[0].appendChild(d);
    const settingsElement = document.querySelector('#input-counter-settings-container');
    settingsElement.appendChild(c);

    const settingsBox = document.createElement('div');
    settingsBox.style = 'position:absolute;left:120%;z-index:10000;background-color:FloralWhite;padding:5px;display:none;border-radius:3px;';
    settingsBox.id = 'settings-popup';
    settingsBox.innerHTML = `
    <span>Settings</span><span class="settings-close" style="float:right;cursor:pointer">&times;</span>
    <select style="margin:3px;" id="stat-chooser">
      <option value="inputGame">inputs - game</option>
      <option value="inputSession">inputs - session</option>
      <option value="inputLifetime">inputs - lifetime</option>
      <option value="playsSession">plays - session</option>
      <option value="playsLifetime">plays - lifetime</option>
    </select>
    <button style="margin:3px;" id="edit-stat">Edit stat count</button>
    <button style="margin:3px;" id="reset-stats">Reset all</button>
    <br>
    <span style="margin:3px;cursor:pointer" class="settings-close">close</span>
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
      inputGame:{stat: 'inputs',duration: 'game'},
      inputSession:{stat: 'inputs',duration: 'session'},
      inputLifetime:{stat: 'inputs',duration: 'lifetime'},
      playsSession:{stat: 'plays',duration: 'session'},
      playsLifetime:{stat: 'plays',duration: 'lifetime'},
    }

    //preselect based on saved settings
    document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

    //Listeners to hide/show settings box when clickng the cog, or the X
    document.querySelector('#input-counter-settings').addEventListener('click',showSettingsBox);
    const settingsCloseElements = document.getElementsByClassName('settings-close');
    settingsCloseElements[0].addEventListener('click',hideSettingsBox);
    settingsCloseElements[1].addEventListener('click',hideSettingsBox);

    document.getElementById('stat-chooser').onchange = function() {
      stats.statShown = valuesToSettings[this.value].stat;
      stats.statDurationShown = valuesToSettings[this.value].duration;
      document.getElementById('stat-icon').src = getStatIconImageSrc();
      updateCounterDisplay();
    }

    document.getElementById('edit-stat').addEventListener('click',promptToEditStatCount);
    document.getElementById('reset-stats').addEventListener('click',promptToResetStats);
  }

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.Counter.alterSnakeCode = function(code) {

    window.setuphtml();

    reset_regex = new RegExp(/;this\.reset\(\)/)
    counter_reset_code = `stats.inputs.game = 0;
    stats.plays.session++;
    stats.plays.lifetime++;
    saveStatistics();
    updateCounterDisplay();this.reset()`

    code = code.assertReplace(reset_regex, counter_reset_code);

    input_counter_regex = new RegExp(/=function\(a,b\){if/)
    input_counter_code =`=function\(a,b\){
        if(b !== a.direction) {
            stats.inputs.game++;
            stats.inputs.session++;
            stats.inputs.lifetime++;
            stats.statShown === 'inputs' && updateCounterDisplay();
          }
    if`
    code = code.assertReplace(input_counter_regex, counter_reset_code);

    stop_regex = new RegExp(/stop=function\(a\){/)
    save_stats_code = `stop=function(a){saveStatistics();`

    code = code.assertReplace(input_counter_regex, counter_reset_code);

    return code;
}


window.Counter.runCodeAfter = function() {

};
