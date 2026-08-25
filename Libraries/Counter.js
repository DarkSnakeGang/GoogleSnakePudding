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
                },
                apples: {
                    session: 0,
                    lifetime: 0
                }
            };
        } else {
            stats = JSON.parse(stats);
        }

        if (typeof stats.apples === 'undefined') {
            stats.apples = {
                session: 0,
                lifetime: 0
            }
        }

        //Make sure these get reset
        stats.inputs.game = 0;
        stats.inputs.session = 0;
        stats.plays.session = 0;
        stats.apples.session = 0;
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
            typeof stats.apples.session !== 'undefined' &&
            typeof stats.apples.lifetime !== 'undefined' &&
            typeof stats.visible !== 'undefined'
        ) {
            localStorage.setItem('inputCounterMod', JSON.stringify(stats));
        }
    }
    window.updateCounterDisplay = function () {
        if (typeof divList === "undefined" || !divList) return;
        const next = String(stats[stats.statShown][stats.statDurationShown]);
        if (divList.textContent === next) return;
        divList.textContent = next;
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
                },
                apples: {
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
        switch (stats.statShown) {
            case 'hide':
                return "https://i.postimg.cc/bNFfLPCn/Empty.png"
            case 'walls':
                return "https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_01.png"
            case 'apples':
                return "https://www.google.com/logos/fnbx/snake_arcade/v3/apple_00.png"
            case 'plays':
                return "https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png"
            default:
                return "https://www.google.com/logos/fnbx/snake_arcade/keys.svg"
        }
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

    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)
    window.wallCoords = [];

    counter_reset_code = `;stats.inputs.game = 0;
    stats.walls.game = 0;
    window.wallCoords = [];
    window.BootstrapHide();
    stats.plays.session++;
    stats.plays.lifetime++;
    window.timeKeeper.addAttempt();
    saveStatistics();
    stats.visible = true;
    if((window.CurrentModeNum != 1 && window.CurrentModeNum != 19) && stats.statShown == "walls"){
        stats.visible = false;
    }
    window.setCounter();
    updateCounterDisplay();
    $&`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, counter_reset_code);

    window.IncrementCounter = function(){

        if(!window.timeKeeper.runStarted)
        {
            window.timeKeeper.start();
        }

        stats.inputs.game++;
        stats.inputs.session++;
        stats.inputs.lifetime++;
        stats.statShown === 'inputs' && updateCounterDisplay();

    }


    document.addEventListener('keydown', (event)=> {
        const ae = document.activeElement;
        if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT' || ae.isContentEditable)) return;
        if(!event.repeat)
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




    stop_regex = new RegExp(/stop\(a\){/)
    catchError(stop_regex, code)
    save_stats_code = `stop\(a\){saveStatistics();`
    

    code = code.assertReplace(stop_regex, save_stats_code);

    // v12: let Ni=ucF(this.Ca,this.Sb(null,5));
    // v13: (h=p6E(a.Ca,a.Vb(null,5)))&&(...)
    const wall_spawn_let = /(?:let|const|var) ([a-zA-Z0-9_$]{1,8})=\n?[a-zA-Z0-9_$]{1,8}\(this\.[a-zA-Z0-9_$]{1,8},this\.[a-zA-Z0-9_$]{1,8}\(null,5\)\);/
    const wall_spawn_assign = /\(([a-zA-Z0-9_$]{1,8})=[a-zA-Z0-9_$]{1,8}\((?:this|a)\.[a-zA-Z0-9_$]{1,8},(?:this|a)\.[a-zA-Z0-9_$]{1,8}\(null,5\)\)\)/

    const wall_let_match = code.match(wall_spawn_let)
    if (wall_let_match) {
        catchError(wall_spawn_let, code)
        const wall_pos = wall_let_match[1]
        const wall_counter_code = `${wall_let_match[0]}
    if(${wall_pos}){stats.walls.game++;
    window.wallCoords.push([${wall_pos}.x, ${wall_pos}.y]);
    updateCounterDisplay();}
    `
        if (window.NepDebug) {
            console.log("Wall thing: " + wall_pos)
            console.log("Wall thing 2: " + wall_counter_code)
        }
        code = code.assertReplace(wall_spawn_let, wall_counter_code)
    } else {
        catchError(wall_spawn_assign, code)
        const wall_assign_match = code.match(wall_spawn_assign)
        const wall_pos = wall_assign_match[1]
        const inner = wall_assign_match[0].slice(1, -1)
        code = code.assertReplace(
            wall_spawn_assign,
            `(${inner},${wall_pos}&&(stats.walls.game++,window.wallCoords.push([${wall_pos}.x,${wall_pos}.y]),updateCounterDisplay()),${wall_pos})`
        )
    }
    

    // Matches https://darksnakegang.github.io/GoogleSnakeWallSolver/ sizes
    // (Normal/Standard 17×15, Small 10×9, Large 24×21).
    window.WALL_SOLVER_SIZES = {
        0: { width: 17, height: 15, cells: 255 }, // Normal / Standard
        1: { width: 10, height: 9, cells: 90 },   // Small
        2: { width: 24, height: 21, cells: 504 }, // Large
    };
    window.WALL_SOLVER_URL = "https://darksnakegang.github.io/GoogleSnakeWallSolver/";

    /** Canonical 0/1 bits for the Wall Solver (1 = wall, 0 = empty). */
    window.coordinatesToBoardString = function coordinatesToBoardString(coordinates) {
        const sizeIdx = window.timeKeeper && typeof window.timeKeeper.getCurrentSetting === "function"
            ? window.timeKeeper.getCurrentSetting("size")
            : -1;
        const dims = window.WALL_SOLVER_SIZES[sizeIdx];
        if (!dims) return false;

        const board = Array(dims.cells).fill("0");
        (coordinates || []).forEach(function (coord) {
            const x = coord[0];
            const y = coord[1];
            if (x < 0 || y < 0 || x >= dims.width || y >= dims.height) return;
            board[y * dims.width + x] = "1";
        });
        return board.join("");
    };

    window.openWallSolverForPattern = function openWallSolverForPattern(coordinates) {
        const bits = window.coordinatesToBoardString(coordinates);
        if (!bits) return false;
        const url = window.WALL_SOLVER_URL + "?board=" + encodeURIComponent(bits) + "&solve=1";
        window.open(url, "_blank", "noopener,noreferrer");
        return true;
    };

    let death_wall_icon = document.querySelector('[jsname="LpoWPe"]');
    if (death_wall_icon) {
        death_wall_icon.addEventListener("click", function () {
            window.openWallSolverForPattern(window.wallCoords);
        });
    }

    return code;
}
