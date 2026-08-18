window.SettingsSaver = {};

window.SettingsSaver.make = function () {
    const PUDDING_SETTINGS_VERSION = 1;
    const DEFAULT_SELECTED_PAIRS = [0, 1, 2, 3, 4, 5];

    function defaultSettings() {
        return {
            StorageVersion: PUDDING_SETTINGS_VERSION,
            Skull: false,
            SokoGoals: true,
            InputDisplay: false,
            TopBar: true,
            SpeedInfo: false,
            PortalPairs: false,
            SelectedPairs: DEFAULT_SELECTED_PAIRS.slice(),
            DisableRandom: false,
            randomizeThemeApple: false,
            ScrollBar: false,
        };
    }

    function ensureBoolean(settings, key, fallback) {
        if (typeof settings[key] !== "boolean") {
            settings[key] = fallback;
        }
    }

    function migratePuddingSettings(settings) {
        if (!settings || typeof settings !== "object") return settings;

        ensureBoolean(settings, "Skull", false);
        ensureBoolean(settings, "SokoGoals", true);
        ensureBoolean(settings, "InputDisplay", false);
        ensureBoolean(settings, "TopBar", true);
        ensureBoolean(settings, "SpeedInfo", false);
        ensureBoolean(settings, "PortalPairs", false);
        ensureBoolean(settings, "DisableRandom", false);
        ensureBoolean(settings, "randomizeThemeApple", false);
        ensureBoolean(settings, "ScrollBar", false);

        // Keep newer-version fields (SelectedPairsByCount, SavedGameSettings, etc.) as-is.
        if (settings.SelectedPairsByCount && typeof settings.SelectedPairsByCount === "object") {
            if (!Array.isArray(settings.SelectedPairs)) {
                const countZero = settings.SelectedPairsByCount["0"];
                settings.SelectedPairs = Array.isArray(countZero)
                    ? countZero.slice()
                    : DEFAULT_SELECTED_PAIRS.slice();
            }
        } else if (!Array.isArray(settings.SelectedPairs)) {
            settings.SelectedPairs = DEFAULT_SELECTED_PAIRS.slice();
        }

        settings.StorageVersion = PUDDING_SETTINGS_VERSION;
        return settings;
    }

    window.loadSettings = function () {
        let pudding_settings = localStorage.getItem("PuddingSettings");
        if (pudding_settings === null) {
            pudding_settings = defaultSettings();
        } else {
            pudding_settings = JSON.parse(pudding_settings);
            const needsPersist = typeof pudding_settings.StorageVersion !== "number";
            pudding_settings = migratePuddingSettings(pudding_settings);
            if (needsPersist) {
                window._puddingSettingsNeedsPersist = true;
            }
        }

        return pudding_settings;
    };

    window.saveSettings = function () {
        const s = window.pudding_settings;
        if (
            typeof s !== "undefined" &&
            typeof s.Skull !== "undefined" &&
            typeof s.SokoGoals !== "undefined" &&
            typeof s.InputDisplay !== "undefined" &&
            typeof s.TopBar !== "undefined" &&
            typeof s.SpeedInfo !== "undefined" &&
            typeof s.PortalPairs !== "undefined" &&
            typeof s.DisableRandom !== "undefined" &&
            typeof s.randomizeThemeApple !== "undefined"
        ) {
            s.StorageVersion = PUDDING_SETTINGS_VERSION;
            localStorage.setItem("PuddingSettings", JSON.stringify(s));
        }
    };

    window.pudding_settings = window.loadSettings();
    if (window._puddingSettingsNeedsPersist) {
        window.saveSettings();
        window._puddingSettingsNeedsPersist = false;
    }
};

window.SettingsSaver.alterCode = function (code) {

    //window.PopulateOptions();
    //window.PopulateDropdowns();
    //window.PopulateOptions();
    //window.PopulateDropdowns();

    reset_regex = new RegExp(/;this\.reset\(\)\}\}/)

    settings_reset_code = `
    saveSettings();
    $&`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, settings_reset_code);


    stop_regex = new RegExp(/stop\(a\){/)
    catchError(stop_regex, code)
    save_settings_code = `stop\(a\){saveSettings();`

    code = code.assertReplace(stop_regex, save_settings_code);
    return code;
}
