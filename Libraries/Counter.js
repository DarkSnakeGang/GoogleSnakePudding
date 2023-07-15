window.Counter = {};

window.Counter.make = function () {
    window.loadStatistics = function () {
        let stats = localStorage.getItem('inputCounterMod');
        if (stats === null) {
            stats = {
                visible: true,
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
        stats.visible = true;

        stats.walls = {
            game: 0
        };

        stats.hide = {
            count: ""
        };

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
                visible: true,
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
        if (stats.statShown === 'hide' || stats.statShown === 'walls') {
            alert(`Not changing stat for "hide" or "walls"`)
            return;
        }
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

    window.getStatIconImageSrc = function () {
        if (stats.statShown === 'hide') {
            return "https://i.postimg.cc/bNFfLPCn/Empty.png"
        }
        if (stats.statShown === 'walls') {
            return "https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_01.png"
        }
        return stats.statShown === 'plays' ? 'https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png' : 'https://www.google.com/logos/fnbx/snake_arcade/keys.svg';
    }

    window.setCounter = function () {
        //stats.visible = !stats.visible;
        if (stats.visible) {
            document.getElementById('stat-icon').style.display = 'inline';
            document.getElementById('counter-num').style.display = 'inherit';
            //document.getElementById('toggle-counter').innerHTML = 'Hide counter';
        }
        else {
            document.getElementById('stat-icon').style.display = 'none';
            document.getElementById('counter-num').style.display = 'none';
            //document.getElementById('toggle-counter').innerHTML = 'Show counter';
        }
        saveStatistics();
    }

}

window.Counter.alterCode = function (code) {

    reset_regex = new RegExp(/;this\.reset\(\)/)

    counter_reset_code = `;stats.inputs.game = 0;
    stats.walls.game = 0;
    window.timeKeeper.playing = false;
    window.BootstrapHide();
    stats.plays.session++;
    stats.plays.lifetime++;
    saveStatistics();
    stats.visible = true;
    if((window.CurrentModeNum != 1 && window.CurrentModeNum != 16) && stats.statShown == "walls"){
        stats.visible = false;
    }
    window.setCounter();
    updateCounterDisplay();this.reset();`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, counter_reset_code);

    window.IncrementCounter = function(){
       
        if(!window.timeKeeper.playing)
            {
              window.timeKeeper.start();
              window.timeKeeper.playing = true;
            }

            stats.inputs.game++;
            stats.inputs.session++;
            stats.inputs.lifetime++;
            stats.statShown === 'inputs' && updateCounterDisplay();
          


    }
    

    document.addEventListener('keydown', (event)=> {
        if(!event.repeat ) 
      {
        if ((event.key === 'ArrowRight') || (event.code === 'KeyD')){
    
          window.IncrementCounter();
        }
        else if (event.key === 'ArrowLeft'|| (event.code === 'KeyA'))
        {
            window.IncrementCounter();
        }
        else if (event.key === 'ArrowDown'|| (event.code === 'KeyS'))
        {
            window.IncrementCounter();
        }
        else if (event.key === 'ArrowUp'|| (event.code === 'KeyW'))
        {
            window.IncrementCounter();
         }
        } 
    }
      );
    



    stop_regex = new RegExp(/stop=function\(a\){/)
    catchError(stop_regex, code)
    save_stats_code = `stop=function(a){saveStatistics();`

    code = code.assertReplace(stop_regex, save_stats_code);

    wall_spawn_regex = new RegExp(/var [a-zA-Z0-9_$]{1,8}=\n?[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},this\.[a-zA-Z0-9_$]{1,8}\(null,5\)\);/gm)
    catchError(wall_spawn_regex, code)

    wall_pos = code.match(wall_spawn_regex)[0].split('=')[0].split(' ')[1]
    wall_counter_code = `${code.match(wall_spawn_regex)[0]}
    if(${wall_pos}){stats.walls.game++;updateCounterDisplay();}
    `

    code = code.assertReplace(wall_spawn_regex, wall_counter_code);

    return code;
}
