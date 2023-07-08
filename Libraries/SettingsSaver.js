window.SettingsSaver = {};

window.SettingsSaver.make = function () {
    window.loadSettings = function () {
        let settings = localStorage.getItem('PuddingSettings');
        if (settings === null) {
            settings = {
                Skull: false,
                SokoGoals: true,
                InputDisplay: false,
                TopBar: true,
                SpeedInfo: false,
                PortalPairs: false
                
            };
        } else {
            settings = JSON.parse(settings);
        }
        
     
        return settings;
    }
    window.settings = window.loadSettings();
    window.saveSettings = function () {
        if (typeof settings !== 'undefined' && typeof settings.Skull !== 'undefined' &&
        typeof settings.SokoGoals !== 'undefined' &&
        typeof settings.InputDisplay !== 'undefined' &&
        typeof settings.TopBar !== 'undefined' &&
        typeof settings.SpeedInfo !== 'undefined' &&
        typeof settings.PortalPairs !== 'undefined' 
        ) {
            localStorage.setItem('PuddingSettings', JSON.stringify(settings));
        }
    }

}

window.SettingsSaver.alterCode = function (code) {
    reset_regex = new RegExp(/;this\.reset\(\)/)

    settings_reset_code = `
    saveSettings();
    this.reset();`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, settings_reset_code);


    stop_regex = new RegExp(/stop=function\(a\){/)
    catchError(stop_regex, code)
    save_settings_code = `stop=function(a){saveSettings();`

    code = code.assertReplace(stop_regex, save_settings_code);
    return code;
}
