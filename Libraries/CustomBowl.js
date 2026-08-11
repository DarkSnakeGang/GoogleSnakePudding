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
    window.__portalAppleArrayName = window.__portalAppleArrayName || "ka";
    window.__customBowlCountOverride = null;

    function getCountIndex() {
        if (typeof window.__customBowlCountOverride === "number" && !isNaN(window.__customBowlCountOverride)) {
            return window.__customBowlCountOverride;
        }
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

    function getPoolForCurrentCount(minOverride) {
        ensurePairsByCountStore();
        const count = getCountIndex();
        const key = countKey(count);
        const min = Math.max(window.getPortalPairMinimum(), minOverride || 0);
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

    function getAppleList(appleManager) {
        if (!appleManager) return null;
        const key = window.__portalAppleArrayName || "ka";
        if (Array.isArray(appleManager[key])) return appleManager[key];
        if (Array.isArray(appleManager.ka)) return appleManager.ka;
        return null;
    }

    // Types currently visible on the board (type < 0 = slot being reassigned, not showing).
    function typesOnBoard(appleManager) {
        const showing = new Set();
        const apples = getAppleList(appleManager);
        if (!apples) return showing;
        for (const apple of apples) {
            if (!apple) continue;
            const t = Number(apple.type);
            if (!isNaN(t) && t >= 0) showing.add(t);
        }
        return showing;
    }

    function isCustomBowlActive(settings) {
        if (!(window.pudding_settings && window.pudding_settings.PortalPairs && settings)) return false;
        const prop = window.__fruitBowlSettingProp || "Ka";
        return Number(settings[prop]) === 24;
    }

    function syncCountOverride(settings) {
        if (settings && typeof settings.ka === "number" && !isNaN(settings.ka)) {
            window.__customBowlCountOverride = settings.ka;
        }
    }

    /**
     * Roll a fruit from the custom bowl pool.
     * Unique (pool − showing) when portal OR AlwaysUniqueFruit is on.
     * Portal always uses unique logic; the checkbox enables it for other modes.
     * If allowed is empty, fall back to full pool (re-roll eaten type when board is full).
     */
    window.pickCustomPortalType = function (appleManager, isPortal) {
        syncCountOverride(appleManager && appleManager.settings);
        try {
            const pool = ensurePoolMeetsMinimum();
            if (!pool.length) return 0;
            const useUnique = !!isPortal ||
                !!(window.pudding_settings && window.pudding_settings.AlwaysUniqueFruit);
            if (!useUnique) {
                return pool[Math.floor(Math.random() * pool.length)];
            }
            const showing = typesOnBoard(appleManager);
            const available = pool.filter((t) => !showing.has(t));
            const source = available.length > 0 ? available : pool;
            return source[Math.floor(Math.random() * source.length)];
        } finally {
            window.__customBowlCountOverride = null;
        }
    };

    // Portal-only full board assign: clear slots, then roll with showing-list rules.
    window.assignCustomPortalPairTypes = function (appleManager) {
        if (!appleManager || !isCustomBowlActive(appleManager.settings)) return false;
        const apples = getAppleList(appleManager);
        if (!apples || apples.length < 2) return false;

        for (let i = 0; i < apples.length; i++) apples[i].type = -1;

        for (let i = 0; i < apples.length; i += 2) {
            const t = window.pickCustomPortalType(appleManager, true);
            apples[i].type = t;
            if (apples[i + 1]) apples[i + 1].type = t;
        }
        return true;
    };

    // Portal-only safety: if two pairs share a type, re-roll with showing-list rules.
    window.enforceUniquePortalFruitTypes = function (appleManager) {
        if (!appleManager || !isCustomBowlActive(appleManager.settings)) return;
        const apples = getAppleList(appleManager);
        if (!apples || apples.length < 2) return;

        const seen = new Set();
        for (let i = 0; i < apples.length; i += 2) {
            const a0 = apples[i];
            const a1 = apples[i + 1];
            let t = Number(a0 && a0.type);
            if (isNaN(t) || t < 0 || seen.has(t)) {
                if (a0) a0.type = -1;
                if (a1) a1.type = -1;
                t = window.pickCustomPortalType(appleManager, true);
                if (a0) a0.type = t;
                if (a1) a1.type = t;
            } else if (a1 && Number(a1.type) !== t) {
                a1.type = t;
            }
            seen.add(t);
        }
    };

    window.give_custom_pair = function () {
        return window.pickCustomPortalType(null, true);
    };
    window.startCustomBowlDeal = function () { /* no-op */ };
    window.endCustomBowlDeal = function () { /* no-op */ };

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

        const rowSize = 6;
        for (let i = 0; i < options.length; i += rowSize) {
            const row = document.createElement("div");
            row.style = "display:flex;flex-wrap:nowrap;gap:8px;margin-bottom:8px;justify-content:center;";
            options.slice(i, i + rowSize).forEach((fruitIndex) => {
                const selected = pool.has(fruitIndex);
                const cell = document.createElement("div");
                cell.className = "blender_icon" + (selected ? " blender_icon_on" : "");
                cell.style = "width:52px;height:52px;padding-bottom:0;flex:0 0 52px;display:flex;align-items:center;justify-content:center;cursor:pointer;";
                cell.dataset.fruit = String(fruitIndex);
                cell.title = `Fruit ${fruitIndex}`;

                const img = document.createElement("img");
                img.className = "blender_icon_img" + (selected ? " blender_icon_img_selected" : "");
                img.src = getFruitSrc(fruitIndex);
                img.draggable = false;
                img.style = "width:44px;height:44px;max-width:100%;";
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
        const uniqueToggle = document.getElementById("fruit-bowl-always-unique");
        if (uniqueToggle) uniqueToggle.checked = !!window.pudding_settings.AlwaysUniqueFruit;
        const grid = document.getElementById("fruit-bowl-grid");
        if (grid) {
            grid.style.opacity = window.pudding_settings.PortalPairs ? "1" : "0.45";
            grid.style.pointerEvents = window.pudding_settings.PortalPairs ? "auto" : "none";
        }
    }

    // Theme background is applied separately via applyPanelTheme (Theme.js sets real_topbar_color).
    const PANEL_STYLE =
        "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100000;" +
        "padding:18px 20px 16px;display:none;border-radius:8px;" +
        "width:min(480px,92vw);min-width:280px;height:auto;min-height:320px;max-height:min(720px,88vh);" +
        "overflow-x:hidden;overflow-y:auto;visibility:hidden;box-sizing:border-box;" +
        "box-shadow:0 12px 36px rgba(0,0,0,0.5);border:2px solid rgba(255,255,255,0.18);";

    const BACKDROP_STYLE =
        "position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:99999;" +
        "background:rgba(0,0,0,0.45);display:none;visibility:hidden;";

    function applyPanelTheme(panel) {
        if (!panel) return;
        const color = window.real_topbar_color || "#4a752c";
        panel.style.background = color;
        panel.style.backgroundColor = color;
    }

    function getPanelHost() {
        return document.body;
    }

    function ensureUi() {
        const host = getPanelHost();
        if (!host) return;

        document.querySelectorAll("#fruit-bowl-settings-icon").forEach((el) => el.remove());

        // If an old tiny in-game panel exists, rebuild it.
        const existing = document.getElementById("fruit-bowl-popup-pudding");
        if (existing && existing.parentElement !== host) {
            existing.remove();
            const oldBd = document.getElementById("fruit-bowl-backdrop-pudding");
            if (oldBd) oldBd.remove();
        }

        const legacy = document.getElementById("portal-pairs-popup-pudding");
        if (legacy) legacy.remove();

        let backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "fruit-bowl-backdrop-pudding";
            backdrop.style.cssText = BACKDROP_STYLE;
            backdrop.addEventListener("click", function () {
                window.PortalPairsPanelHide();
            });
            host.appendChild(backdrop);
        } else if (backdrop.parentElement !== host) {
            host.appendChild(backdrop);
        }

        let panel = document.getElementById("fruit-bowl-popup-pudding");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "fruit-bowl-popup-pudding";
            panel.style.cssText = PANEL_STYLE;
            panel.innerHTML = `
                <div style="color:white;font-family:Roboto,Arial,sans-serif;text-align:center;margin-bottom:14px;font-size:22px;font-weight:bold;letter-spacing:0.2px;">Fruit Bowl Settings</div>
                <div style="display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;margin:0 auto 12px;width:100%;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <input class="form-check-input" type="checkbox" role="switch" id="fruit-bowl-enable" style="margin:0;float:none;position:static;">
                        <label class="form-check-label" for="fruit-bowl-enable" style="margin:0;color:white;font-family:Roboto,Arial,sans-serif;font-size:16px;line-height:1.2;">Enable custom fruit bowl</label>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <input class="form-check-input" type="checkbox" role="switch" id="fruit-bowl-always-unique" style="margin:0;float:none;position:static;">
                        <label class="form-check-label" for="fruit-bowl-always-unique" style="margin:0;color:white;font-family:Roboto,Arial,sans-serif;font-size:16px;line-height:1.2;">Always Unique Fruit</label>
                    </div>
                </div>
                <div id="fruit-bowl-status" style="color:#dce8c8;font-family:Roboto,Arial,sans-serif;font-size:15px;margin:0 0 12px 0;text-align:center;"></div>
                <div id="fruit-bowl-grid" style="padding:4px 0 8px;display:flex;flex-direction:column;align-items:center;"></div>
                <button type="button" class="btn" style="margin:8px auto 0;display:block;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="fruit-bowl-close">Close</button>
            `;
            host.appendChild(panel);
            applyPanelTheme(panel);

            document.getElementById("fruit-bowl-enable").addEventListener("change", function () {
                window.pudding_settings.PortalPairs = !!this.checked;
                ensurePoolMeetsMinimum();
                if (typeof window.saveSettings === "function") window.saveSettings();
                syncPanelEnabledState();
                renderFruitGrid();
            });
            document.getElementById("fruit-bowl-always-unique").addEventListener("change", function () {
                window.pudding_settings.AlwaysUniqueFruit = !!this.checked;
                if (typeof window.saveSettings === "function") window.saveSettings();
                syncPanelEnabledState();
            });
            document.getElementById("fruit-bowl-close").addEventListener("click", function () {
                window.PortalPairsPanelHide();
            });
        } else {
            if (panel.parentElement !== host) host.appendChild(panel);
            const shown = !!window.portalPairsPanelVisible;
            panel.style.cssText = PANEL_STYLE + (shown
                ? "display:block;visibility:visible;"
                : "display:none;visibility:hidden;");
            applyPanelTheme(panel);
            backdrop.style.cssText = BACKDROP_STYLE + (shown
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
        const backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (panel) {
            panel.style.display = "block";
            panel.style.visibility = "visible";
            applyPanelTheme(panel);
        }
        if (backdrop) {
            backdrop.style.display = "block";
            backdrop.style.visibility = "visible";
        }
        window.portalPairsPanelVisible = true;
    };

    window.PortalPairsPanelHide = function () {
        const panel = document.getElementById("fruit-bowl-popup-pudding");
        const backdrop = document.getElementById("fruit-bowl-backdrop-pudding");
        if (panel) {
            panel.style.display = "none";
            panel.style.visibility = "hidden";
        }
        if (backdrop) {
            backdrop.style.display = "none";
            backdrop.style.visibility = "hidden";
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
    const baf_name = baf_match[1];
    const portal_check = baf_match[2];
    const apple_array = baf_match[3];
    window.__portalAppleArrayName = apple_array;
    window.__fruitBowlSettingProp = fruit_setting;

    // Portal init: clear + roll from (pool − showing) pair by pair.
    code = code.assertReplace(
        baf_regex,
        `${baf_name}=function(a){` +
        `if(${portal_check}(a.settings,2)&&window.assignCustomPortalPairTypes&&window.assignCustomPortalPairTypes(a))return;` +
        `if(${portal_check}(a.settings,2)){var b=Math.floor(48/a.${apple_array}.length);`
    );

    // Custom bowl pick: portal → showing-list uniqueness; other modes → random from pool.
    code = code.assertReplace(
        aaf_regex,
        `${aaf_name}=function(a){` +
        `if(window.pudding_settings&&window.pudding_settings.PortalPairs&&a.settings.${fruit_setting}===24){` +
        `return window.pickCustomPortalType(a,${portal_check}(a.settings,2));}` +
        `if(a.settings.${fruit_setting}===24){`
    );

    // Before in-place portal retype, drop the eaten pair from "showing" (type=-1).
    const inplace_regex = new RegExp(
        `Ni&&\\(this\\.wa\\.ka\\[vd\\]\\.type=${aaf_name}\\(this\\.wa\\),this\\.wa\\.ka\\[Ok\\]\\.type=this\\.wa\\.ka\\[vd\\]\\.type\\)`
    );
    catchError(inplace_regex, code);
    code = code.assertReplace(
        inplace_regex,
        `Ni&&(this.wa.ka[vd].type=-1,this.wa.ka[Ok].type=-1,this.wa.ka[vd].type=${aaf_name}(this.wa),this.wa.ka[Ok].type=this.wa.ka[vd].type)`
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
        `if(window.pudding_settings&&window.pudding_settings.PortalPairs&&a.settings.${fruit_setting}===24&&window.assignCustomPortalPairTypes){` +
        `window.assignCustomPortalPairTypes(a.${apple_mgr_prop});` +
        `}else for(b[0].type=${aaf_name}(a.${apple_mgr_prop}),b[1].type=b[0].type,a=2;a<b.length;a+=2)b[a].type=(b[a-2].type+1)%24,b[a+1].type=b[a].type;` +
        `window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(a.${apple_mgr_prop})` +
        `}`;

    code = code.assertReplace(refill_regex, refill_replacement);

    // Enforce after baF without breaking if/else (comma expression).
    code = code.assertReplace(
        new RegExp(`${baf_name}\\(this\\)`),
        `(${baf_name}(this),window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(this))`
    );
    const bafArgRegex = new RegExp(`${baf_name}\\(a\\.([a-zA-Z0-9_$]{1,8})\\)`);
    catchError(bafArgRegex, code);
    const bafArgProp = code.match(bafArgRegex)[1];
    code = code.assertReplace(
        bafArgRegex,
        `(${baf_name}(a.${bafArgProp}),window.enforceUniquePortalFruitTypes&&window.enforceUniquePortalFruitTypes(a.${bafArgProp}))`
    );

    return code;
};
