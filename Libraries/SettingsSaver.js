window.SettingsSaver = {};

window.SettingsSaver.make = function () {
    window.loadSettings = function () {
        let pudding_settings = localStorage.getItem('PuddingSettings');
        if (pudding_settings === null) {
            pudding_settings = {
                Skull: false,
                SokoGoals: true,
                InputDisplay: false,
                TopBar: true,
                SpeedInfo: false,
                PortalPairs: false,
                SelectedPairs: [0, 1, 2, 3, 4, 5]
            };
                
            }
         else {
            pudding_settings = JSON.parse(pudding_settings);
        }
        
        
        return pudding_settings;
    }
    window.pudding_settings = window.loadSettings();
    

    window.saveSettings = function () {
        if (typeof pudding_settings !== 'undefined' && typeof pudding_settings.Skull !== 'undefined' &&
        typeof pudding_settings.SokoGoals !== 'undefined' &&
        typeof pudding_settings.InputDisplay !== 'undefined' &&
        typeof pudding_settings.TopBar !== 'undefined' &&
        typeof pudding_settings.SpeedInfo !== 'undefined' &&
        typeof pudding_settings.PortalPairs !== 'undefined' 
        ) {
            localStorage.setItem('PuddingSettings', JSON.stringify(pudding_settings));
        }
    }

}

window.SettingsSaver.alterCode = function (code) {
    window.PopulateOptions();
    window.PopulateDropdowns();
    reset_regex = new RegExp(/;this\.reset\(\)/)

    settings_reset_code = `
    saveSettings();this.reset();`

    catchError(reset_regex, code)
    code = code.assertReplace(reset_regex, settings_reset_code);


    stop_regex = new RegExp(/stop=function\(a\){/)
    catchError(stop_regex, code)
    save_settings_code = `stop=function(a){saveSettings();`

    code = code.assertReplace(stop_regex, save_settings_code);
    return code;
}
