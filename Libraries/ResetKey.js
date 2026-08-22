window.ResetKey = {}

window.ResetKey.make = function (){
  // Persist Shift default so alterCode keydown matches UI / docs
  let keybinds = {};
  try {
    keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
  } catch (e) {
    keybinds = {};
  }
  if (!keybinds.resetKey) {
    keybinds.resetKey = "Shift";
    localStorage.setItem("keybinds", JSON.stringify(keybinds));
  }

  function setupKeybindPicker(buttonId, keybindType) {
      const button = document.getElementById(buttonId);
      if (!button) return;
      if(!keybinds[keybindType]){
          keybinds[keybindType] = "Shift";
          localStorage.setItem("keybinds", JSON.stringify(keybinds));
      }
      button.textContent = `Reset Key: ${keybinds[keybindType]}`;

      button.addEventListener("click", () => {
          button.textContent = "Press any key...";
          document.addEventListener("keydown", function handler(e) {
          keybinds[keybindType] = e.key;
          button.textContent = `Reset Key: ${e.key}`;
          localStorage.setItem("keybinds", JSON.stringify(keybinds));
          document.removeEventListener("keydown", handler);
          });
      });
  }

  // Apply to each bind
  setupKeybindPicker("ResetKeybind", "resetKey");
}

window.ResetKey.alterCode = function(code){
  if (window.SpeedrunMod) {
    const keyHandler =
      /([a-zA-Z0-9_$]{1,8})\(a\)\{if\(!this\.closed\)\{var b=\s*a\.VTa\?a\.Qh:void 0/;
    code = code.assertReplace(
      keyHandler,
      "$1(a){if(!this.closed){var _ae=document.activeElement;if(_ae&&(_ae.tagName==='INPUT'||_ae.tagName==='TEXTAREA'||_ae.tagName==='SELECT'||_ae.isContentEditable))return;var b= a.VTa?a.Qh:void 0"
    );
  }

  function isTypingInField() {
    const ae = document.activeElement;
    return !!(
      ae &&
      (ae.tagName === "INPUT" ||
        ae.tagName === "TEXTAREA" ||
        ae.tagName === "SELECT" ||
        ae.isContentEditable)
    );
  }

  document.addEventListener('keydown', function(e){
    let keybinds = {};
    try {
      keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
    } catch (err) {
      keybinds = {};
    }
    const resetKey = keybinds.resetKey || "Shift";
    let resetButton = document.getElementById('ResetKeybind');
    let isSettingKeybind = resetButton && resetButton.textContent === "Press any key...";
    const dialogActive = window.timeKeeper && window.timeKeeper.dialogActive;
    if(!(isSettingKeybind || isTypingInField() || dialogActive || document.getElementById('edit-box'))){
        if(e.key === resetKey){
            const keydownEvent = new KeyboardEvent('keydown', {
                keyCode: 27
            });
            document.dispatchEvent(keydownEvent);
            const playBtn = document.querySelector('[jsname="NSjDf"]');
            if (playBtn) playBtn.click();
        }
    }
  });
  return code
}
