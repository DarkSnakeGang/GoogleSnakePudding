window.CustomBowl = {};

window.CustomBowl.make = function () {
    const FRUIT_BOWL_INDEX = 24;
    const COUNT_MINIMA = {
        0: 1,  // 1a
        1: 3,  // 3a
        2: 5,  // 5a
        3: 10, // 10a
        4: 6,  // dice
        5: 24, // bomb
        6: 5   // tally
    };
    const BOWL_SPRITE = "https://www.google.com/logos/fnbx/snake_arcade/v17/apple_22.png";

    window.custom_pair_call_counter = 0;

    function getCountIndex() {
        if (window.timeKeeper && typeof window.timeKeeper.getCurrentSetting === "function") {
            const c = window.timeKeeper.getCurrentSetting("count");
            if (typeof c === "number" && !isNaN(c)) return c;
        }
        if (typeof window.count_var !== "undefined") {
            const c = Number(window.count_var);
            if (!isNaN(c)) return c;
        }
        return 0;
    }

    window.getPortalPairMinimum = function () {
        const count = getCountIndex();
        return COUNT_MINIMA.hasOwnProperty(count) ? COUNT_MINIMA[count] : 1;
    };

    function countKey(count) {
        return String(count);
    }

    function defaultPoolForCount(count) {
        const min = COUNT_MINIMA.hasOwnProperty(count) ? COUNT_MINIMA[count] : 1;
        return normalizePool([], min);
    }

    function normalizePool(pool, min) {
        let next = Array.isArray(pool) ? pool.map(Number).filter((n) => !isNaN(n) && n !== FRUIT_BOWL_INDEX) : [];
        next = Array.from(new Set(next));
        if (next.length < min) {
            for (let i = 0; i < 64 && next.length < min; i++) {
                if (i === FRUIT_BOWL_INDEX) continue;
                if (!next.includes(i)) next.push(i);
            }
        }
        return next;
    }

    function ensurePairsByCountStore() {
        if (!window.pudding_settings.SelectedPairsByCount || typeof window.pudding_settings.SelectedPairsByCount !== "object") {
            window.pudding_settings.SelectedPairsByCount = {};
        }
        for (const c of Object.keys(COUNT_MINIMA)) {
            const key = countKey(c);
            if (!Array.isArray(window.pudding_settings.SelectedPairsByCount[key])) {
                window.pudding_settings.SelectedPairsByCount[key] = defaultPoolForCount(Number(c));
            }
        }
    }

    function getPoolForCurrentCount() {
        ensurePairsByCountStore();
        const count = getCountIndex();
        const key = countKey(count);
        const min = window.getPortalPairMinimum();
        const pool = normalizePool(window.pudding_settings.SelectedPairsByCount[key], min);
        window.pudding_settings.SelectedPairsByCount[key] = pool;
        window.pudding_settings.SelectedPairs = pool;
        return pool;
    }

    function setPoolForCurrentCount(pool) {
        ensurePairsByCountStore();
        const count = getCountIndex();
        const key = countKey(count);
        const min = window.getPortalPairMinimum();
        const next = normalizePool(pool, min);
        window.pudding_settings.SelectedPairsByCount[key] = next;
        window.pudding_settings.SelectedPairs = next;
        return next;
    }

    function ensurePoolMeetsMinimum() {
        return getPoolForCurrentCount();
    }

    window.pickCustomPortalType = function (appleManager) {
        const pool = ensurePoolMeetsMinimum();
        if (!pool.length) return 0;

        const appleArray = appleManager && appleManager[window.__portalAppleArrayName];
        const used = new Set();
        if (appleArray && appleArray.length) {
            for (let i = 0; i < appleArray.length; i++) {
                if (appleArray[i] && typeof appleArray[i].type !== "undefined") {
                    used.add(appleArray[i].type);
                }
            }
        }

        const available = pool.filter((t) => !used.has(t));
        const source = available.length > 0 ? available : pool;
        return source[Math.floor(Math.random() * source.length)];
    };

    window.give_custom_pair = function () {
        const pool = ensurePoolMeetsMinimum();
        if (!pool.length) return 0;
        const idx = window.custom_pair_call_counter % pool.length;
        window.custom_pair_call_counter += 1;
        return pool[idx];
    };

    function getFruitSrc(index) {
        const apple = document.querySelector("#apple");
        if (apple && apple.children[index] && apple.children[index].src) {
            return apple.children[index].src;
        }
        if (index < FRUIT_BOWL_INDEX) {
            const ver = index >= 22 ? "v18" : "v17";
            const num = String(index).padStart(2, "0");
            return `https://www.google.com/logos/fnbx/snake_arcade/${ver}/apple_${num}.png`;
        }
        return BOWL_SPRITE;
    }

    function buildFruitOptions() {
        const apple = document.querySelector("#apple");
        const options = [];
        if (!apple) return options;
        for (let i = 0; i < apple.children.length; i++) {
            if (i === FRUIT_BOWL_INDEX) continue;
            options.push(i);
        }
        return options;
    }

    function updateStatusLabel() {
        const el = document.getElementById("fruit-bowl-status");
        if (!el) return;
        const pool = getPoolForCurrentCount();
        const min = window.getPortalPairMinimum();
        el.textContent = `Selected ${pool.length} / min ${min}`;
    }

    function renderFruitGrid() {
        const grid = document.getElementById("fruit-bowl-grid");
        if (!grid) return;
        const pool = new Set(ensurePoolMeetsMinimum());
        const options = buildFruitOptions();
        const min = window.getPortalPairMinimum();
        grid.innerHTML = "";

        const rowSize = 4;
        for (let i = 0; i < options.length; i += rowSize) {
            const row = document.createElement("div");
            row.style = "display:flex;flex-wrap:nowrap;gap:4px;margin-bottom:4px;justify-content:center;";
            options.slice(i, i + rowSize).forEach((fruitIndex) => {
                const selected = pool.has(fruitIndex);
                const cell = document.createElement("div");
                cell.className = "blender_icon" + (selected ? " blender_icon_on" : "");
                cell.style = "width:44px;height:44px;padding-bottom:0;flex:0 0 44px;display:flex;align-items:center;justify-content:center;";
                cell.dataset.fruit = String(fruitIndex);
                cell.title = `Fruit ${fruitIndex}`;

                const img = document.createElement("img");
                img.className = "blender_icon_img" + (selected ? " blender_icon_img_selected" : "");
                img.src = getFruitSrc(fruitIndex);
                img.draggable = false;
                img.style = "width:36px;height:36px;max-width:100%;";
                cell.appendChild(img);

                cell.addEventListener("click", function () {
                    if (!window.pudding_settings.PortalPairs) return;
                    const current = getPoolForCurrentCount().slice();
                    const idx = current.indexOf(fruitIndex);
                    if (idx >= 0) {
                        if (current.length <= min) return;
                        current.splice(idx, 1);
                    } else {
                        current.push(fruitIndex);
                    }
                    setPoolForCurrentCount(current.sort((a, b) => a - b));
                    if (typeof window.saveSettings === "function") window.saveSettings();
                    renderFruitGrid();
                    updateStatusLabel();
                });

                row.appendChild(cell);
            });
            grid.appendChild(row);
        }
        updateStatusLabel();
    }

    function syncPanelEnabledState() {
        const toggle = document.getElementById("fruit-bowl-enable");
        if (toggle) toggle.checked = !!window.pudding_settings.PortalPairs;
        const grid = document.getElementById("fruit-bowl-grid");
        if (grid) {
            grid.style.opacity = window.pudding_settings.PortalPairs ? "1" : "0.45";
            grid.style.pointerEvents = window.pudding_settings.PortalPairs ? "auto" : "none";
        }
    }

    // Cover Pudding Mod Settings when open.
    const PANEL_STYLE =
        "position:absolute;left:0;top:0;right:0;bottom:0;z-index:10004;background-color:#4a752c;padding:10px;" +
        "display:none;border-radius:3px;width:100%;height:100%;max-height:100%;overflow:auto;" +
        "visibility:hidden;box-sizing:border-box;";

    function getPanelHost() {
        return document.getElementById("settings-popup-pudding") ||
            document.getElementsByClassName("sEOCsb")[0];
    }

    function ensureUi() {
        const host = getPanelHost();
        if (!host) return;

        // Remove abandoned header/fruit-row trigger icons from earlier builds
        document.querySelectorAll("#fruit-bowl-settings-icon").forEach((el) => el.remove());

        const legacy = document.getElementById("portal-pairs-popup-pudding");
        if (legacy) legacy.remove();

        let panel = document.getElementById("fruit-bowl-popup-pudding");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "fruit-bowl-popup-pudding";
            panel.style.cssText = PANEL_STYLE;
            panel.innerHTML = `
                <div style="color:white;font-family:Roboto,Arial,sans-serif;text-align:center;margin-bottom:8px;font-size:15px;">Fruit Bowl Settings</div>
                <div class="form-check form-check-inline" style="margin-bottom:8px;">
                    <input class="form-check-input" type="checkbox" role="switch" id="fruit-bowl-enable">
                    <label class="form-check-label" for="fruit-bowl-enable" style="margin:3px;color:white;font-family:Roboto,Arial,sans-serif;">Enable custom fruit bowl</label>
                </div>
                <div id="fruit-bowl-status" style="color:#dce8c8;font-family:Roboto,Arial,sans-serif;font-size:13px;margin:4px 0 10px 0;text-align:center;"></div>
                <div id="fruit-bowl-grid"></div>
                <button type="button" class="btn" style="margin-top:10px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;width:100%;" id="fruit-bowl-close">Close</button>
            `;
            host.appendChild(panel);

            document.getElementById("fruit-bowl-enable").addEventListener("change", function () {
                window.pudding_settings.PortalPairs = !!this.checked;
                ensurePoolMeetsMinimum();
                if (typeof window.saveSettings === "function") window.saveSettings();
                syncPanelEnabledState();
                renderFruitGrid();
            });
            document.getElementById("fruit-bowl-close").addEventListener("click", function () {
                window.PortalPairsPanelHide();
            });
        } else {
            if (panel.parentElement !== host) host.appendChild(panel);
            panel.style.cssText = PANEL_STYLE + (window.portalPairsPanelVisible
                ? "display:block;visibility:visible;"
                : "display:none;visibility:hidden;");
        }

        syncPanelEnabledState();
        renderFruitGrid();
    }

    window.PortalPairsPanelShow = function () {
        ensureUi();
        try { ensurePoolMeetsMinimum(); } catch (e) { /* settings may still be loading */ }
        syncPanelEnabledState();
        renderFruitGrid();
        const panel = document.getElementById("fruit-bowl-popup-pudding");
        if (panel) {
            panel.style.display = "block";
            panel.style.visibility = "visible";
        }
        window.portalPairsPanelVisible = true;
    };

    window.PortalPairsPanelHide = function () {
        const panel = document.getElementById("fruit-bowl-popup-pudding");
        if (panel) {
            panel.style.display = "none";
            panel.style.visibility = "hidden";
        }
        window.portalPairsPanelVisible = false;
    };

    window.TogglePortalPairsPanel = function () {
        if (window.portalPairsPanelVisible) window.PortalPairsPanelHide();
        else window.PortalPairsPanelShow();
    };

    window.CustomBowlSyncUi = function () {
        if (!window.portalPairsPanelVisible) return;
        ensurePoolMeetsMinimum();
        syncPanelEnabledState();
        renderFruitGrid();
    };

    setTimeout(function () {
        try { ensurePoolMeetsMinimum(); } catch (e) { /* ignore */ }
        ensureUi();
        window.PortalPairsPanelHide();
    }, 0);
};

window.CustomBowl.alterCode = function (code) {
    const reset_regex = new RegExp(/;this\.reset\(\)\}\}/);
    catchError(reset_regex, code);
    code = code.assertReplace(reset_regex, `window.custom_pair_call_counter=0;$&`);

    code = code.assertReplace(
        /case "apple":/,
        `case "apple":setTimeout(function(){window.CustomBowlSyncUi&&window.CustomBowlSyncUi()},0);`
    );
    code = code.assertReplace(
        /case "count":/,
        `case "count":setTimeout(function(){window.CustomBowlSyncUi&&window.CustomBowlSyncUi()},0);`
    );

    const aaf_regex = /([a-zA-Z0-9_$]{1,8})=function\(a\)\{if\(a\.settings\.([a-zA-Z0-9_$]{1,8})===24\)\{/;
    catchError(aaf_regex, code);
    const aaf_match = code.match(aaf_regex);
    const aaf_name = aaf_match[1];
    const fruit_setting = aaf_match[2];

    const baf_regex = /([a-zA-Z0-9_$]{1,8})=function\(a\)\{if\(([a-zA-Z0-9_$]{1,8})\(a\.settings,2\)\)\{var b=\s*Math\.floor\(48\/a\.([a-zA-Z0-9_$]{1,8})\.length\);/;
    catchError(baf_regex, code);
    const baf_match = code.match(baf_regex);
    const apple_array = baf_match[3];
    window.__portalAppleArrayName = apple_array;

    code = code.assertReplace(
        aaf_regex,
        `${aaf_name}=function(a){if(window.pudding_settings&&window.pudding_settings.PortalPairs&&window.fruit_selected===24&&a.settings.${fruit_setting}===24){return window.pickCustomPortalType(a);}if(a.settings.${fruit_setting}===24){`
    );

    const refill_regex = new RegExp(
        `if\\(([a-zA-Z0-9_$]{1,8})\\(a\\.settings,2\\)&&b\\.length>0\\)for\\(b\\[0\\]\\.type=${aaf_name}\\(a\\.([a-zA-Z0-9_$]{1,8})\\),b\\[1\\]\\.type=b\\[0\\]\\.type,a=2;a<b\\.length;a\\+=2\\)b\\[a\\]\\.type=\\(b\\[a-2\\]\\.type\\+1\\)%24,b\\[a\\+1\\]\\.type=b\\[a\\]\\.type`
    );
    catchError(refill_regex, code);
    const refill_match = code.match(refill_regex);
    const mode_check = refill_match[1];
    const apple_mgr_prop = refill_match[2];

    const refill_replacement =
        `if(${mode_check}(a.settings,2)&&b.length>0){` +
        `if(window.pudding_settings&&window.pudding_settings.PortalPairs&&window.fruit_selected===24){` +
        `window.custom_pair_call_counter=0;` +
        `for(let __pi=0;__pi<b.length;__pi+=2){b[__pi].type=${aaf_name}(a.${apple_mgr_prop});b[__pi+1].type=b[__pi].type;}` +
        `}else for(b[0].type=${aaf_name}(a.${apple_mgr_prop}),b[1].type=b[0].type,a=2;a<b.length;a+=2)b[a].type=(b[a-2].type+1)%24,b[a+1].type=b[a].type` +
        `}`;

    code = code.assertReplace(refill_regex, refill_replacement);

    return code;
};
