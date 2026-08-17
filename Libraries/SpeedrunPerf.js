window.SpeedrunPerf = {};

window.SpeedrunPerf.make = function () {
    function inRun() {
        const tk = window.timeKeeper;
        return !!(tk && (tk.playing || tk.runStarted) && !tk._deathHandled);
    }

    function allowFullSpeedInfo() {
        return !!window._speedrunAllowSpeedInfo || !inRun();
    }

    // --- Death latch: original death() is injected at the start of every tick ---
    if (window.timeKeeper && typeof window.timeKeeper.death === "function") {
        const origDeath = window.timeKeeper.death;
        window.timeKeeper.death = function (time, score) {
            if (window.timeKeeper._deathHandled) return;
            window.timeKeeper._deathHandled = true;
            origDeath(time, score);
            if (typeof window.timeKeeper.flushStorage === "function") {
                window.timeKeeper.flushStorage();
            }
        };
    }

    if (window.timeKeeper && typeof window.timeKeeper.start === "function") {
        const origStart = window.timeKeeper.start;
        window.timeKeeper.start = function () {
            window.timeKeeper._deathHandled = false;
            return origStart.apply(this, arguments);
        };
    }

    if (window.timeKeeper && typeof window.timeKeeper.addAttempt === "function") {
        const origAddAttempt = window.timeKeeper.addAttempt;
        window.timeKeeper.addAttempt = function () {
            const result = origAddAttempt.apply(this, arguments);
            window.timeKeeper._deathHandled = false;
            return result;
        };
    }

    // --- gotApple: freeze context first, skip Dragon Fruit, cheap counter ---
    if (window.timeKeeper && typeof window.timeKeeper.gotApple === "function") {
        const origCounter = window.updateCounterDisplay;
        window.timeKeeper.gotApple = function (time, score) {
            window.timeKeeper.ensurePlaying();
            if (typeof stats !== "undefined") {
                stats.apples.session++;
                stats.apples.lifetime++;
                if (stats.statShown === "apples" && typeof origCounter === "function") {
                    origCounter();
                }
            }
            if (!window.timeKeeper.shouldTrack(window.timeKeeper.getSaveContext())) return;

            window.timeKeeper.lastAppleDate = new Date();
            window.timeKeeper.lastAppleTime = time;

            if (score == 25 || score == 50 || score == 100) {
                window.timeKeeper.savePB(time, score);
            }
            window.timeKeeper.updateHighscoreLive(time, score);
        };
    }

    if (window.timeKeeper && typeof window.timeKeeper.gotAll === "function") {
        const origGotAll = window.timeKeeper.gotAll;
        window.timeKeeper.gotAll = function (time, score) {
            window._speedrunAllowSpeedInfo = true;
            try {
                return origGotAll(time, score);
            } finally {
                window._speedrunAllowSpeedInfo = false;
            }
        };
    }

    // --- Speed Info: skip if hidden; no gold/WR work mid-run ---
    function cheapHsPaint() {
        try {
            if (!window.pudding_settings || !window.pudding_settings.SpeedInfo) return;
            const el = document.getElementById("H");
            if (!el || !window.timeKeeper) return;
            const storage = window.timeKeeper.getStorage();
            const ctx = window.timeKeeper.getSaveContext();
            const rec = storage[window.timeKeeper.buildKey("H", ctx)];
            if (rec && rec.high != null) {
                el.textContent = "Highscore: " + rec.high + " Apples";
            }
        } catch (e) {}
    }

    if (typeof window.SpeedInfoUpdate === "function") {
        const origSpeedInfoUpdate = window.SpeedInfoUpdate;
        let debounceTimer = null;
        let debouncePromise = null;
        window.SpeedInfoUpdate = function () {
            if (window.pudding_settings && window.pudding_settings.SpeedInfo === false) {
                return Promise.resolve();
            }
            if (!allowFullSpeedInfo()) {
                cheapHsPaint();
                return Promise.resolve();
            }
            if (debounceTimer) return debouncePromise || Promise.resolve();
            debouncePromise = new Promise(function (resolve, reject) {
                debounceTimer = setTimeout(function () {
                    debounceTimer = null;
                    origSpeedInfoUpdate()
                        .then(resolve, reject)
                        .finally(function () {
                            debouncePromise = null;
                        });
                }, 32);
            });
            return debouncePromise;
        };
    }

    if (typeof window.getAllSrc === "function") {
        const origGetAllSrc = window.getAllSrc;
        window.getAllSrc = function () {
            if (inRun()) return Promise.resolve();
            return origGetAllSrc.apply(this, arguments);
        };
        // Shared SpeedInfo kicks getAllSrc on the first gameplay reset; prefetch idle instead
        window.first_time_call = false;
    }

    // --- saveSettings: skip while a run is in progress (reset injects this first) ---
    if (typeof window.saveSettings === "function") {
        const origSaveSettings = window.saveSettings;
        window.saveSettings = function () {
            if (window.timeKeeper && window.timeKeeper.runStarted) return;
            return origSaveSettings.apply(this, arguments);
        };
    }

    // --- Blender: cache random.png row; never scan every img ---
    if (window.ModeRegistry && typeof window.ModeRegistry._blenderSelectedIds === "function") {
        window.ModeRegistry._blenderSelectedIds = function (modes) {
            if (!window._speedrunBlenderRow) {
                const img =
                    document.querySelector('#trophy img[src*="random.png"]') ||
                    document.querySelector('img[src*="random.png"]');
                if (img) {
                    try {
                        window._speedrunBlenderRow = img.parentElement.parentElement.parentElement;
                    } catch (e) {
                        return [];
                    }
                }
            }
            const row = window._speedrunBlenderRow;
            if (!row) return [];
            try {
                const ids = [];
                let counter = -1;
                const trophyModes = modes.filter(function (m) {
                    return m.id !== "classic" && m.id !== "blender";
                });
                for (const child of row.children) {
                    counter++;
                    if (counter === 0) continue;
                    const selected =
                        child.firstElementChild &&
                        child.firstElementChild.classList.length > 1 &&
                        child.firstElementChild.children.length > 0;
                    if (!selected) continue;
                    const entry = trophyModes[counter - 1];
                    if (entry) ids.push(entry.id);
                }
                return ids;
            } catch (e) {
                return [];
            }
        };
    }

    // --- setTheme: no eval ---
    if (typeof window.setTheme === "function" && Array.isArray(window.themes)) {
        window.setTheme = function (theme_name) {
            const theme = window.themes.find(function (t) {
                return t.name === theme_name;
            });
            if (!theme) return;

            const colorByKey = {
                sep_color: theme.sep_color,
                topbar_color: theme.topbar_color,
                buttons_color: theme.buttons_color,
                bg_color: theme.bg_color,
                bottom_color: theme.bottom_color,
            };
            const loops = [
                { loop_on: window.ui_sep, attribute: "borderBottomColor", color: "sep_color" },
                { loop_on: window.ui_topbar, attribute: "background", color: "topbar_color" },
                { loop_on: window.ui_buttons, attribute: "background", color: "buttons_color" },
                { loop_on: window.input_button, attribute: "background", color: "buttons_color" },
                { loop_on: window.ui_background, attribute: "background", color: "bg_color" },
                { loop_on: window.ui_bottom, attribute: "background", color: "bottom_color" },
                { loop_on: window.boot_button, attribute: "backgroundColor", color: "buttons_color" },
                { loop_on: window.boot_check, attribute: "backgroundColor", color: "buttons_color" },
                { loop_on: window.boot_dropdown, attribute: "backgroundColor", color: "buttons_color" },
            ];
            for (let i = 0; i < loops.length; i++) {
                const spec = loops[i];
                if (!spec.loop_on) continue;
                const value = colorByKey[spec.color];
                for (let h = 0; h < spec.loop_on.length; h++) {
                    const node = spec.loop_on[h];
                    if (node && node.style) node.style[spec.attribute] = value;
                }
            }

            const settingsBox = document.getElementById("settings-popup-pudding");
            if (settingsBox) settingsBox.style.background = theme.real_top_bar;
            const speedinfo = document.getElementById("speedinfo-popup-pudding");
            if (speedinfo) speedinfo.style.background = theme.real_top_bar;
            const splitPanel = document.getElementById("split-panel-pudding");
            if (splitPanel) splitPanel.style.background = theme.real_top_bar;

            window.real_topbar_color = theme.real_top_bar;
            window.button_color = theme.buttons_color;

            if (window.snake) {
                if (theme_name !== "Globe") {
                    window.snake.setCustomTheme(
                        theme.light_tiles,
                        theme.dark_tiles,
                        theme.shadow,
                        theme.border,
                        theme.key_block_sign_color,
                        theme.real_top_bar,
                        theme.endscreen_background
                    );
                } else {
                    window.snake.clearCustomTheme();
                }
            }
        };
    }
};

window.SpeedrunPerf.alterCode = function (code) {
    // Wall spawn: only paint the counter when walls are the selected stat
    code = code.replace(
        /window\.wallCoords\.push\(\[([^\]]+)\]\);\s*updateCounterDisplay\(\);/,
        'window.wallCoords.push([$1]);if(stats.statShown==="walls")updateCounterDisplay();'
    );
    return code;
};
