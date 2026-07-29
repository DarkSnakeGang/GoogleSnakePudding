window.ResetKey = {}

window.ResetKey.make = function (){
  keybind_settings = document.getElementById("ResetKeybind"); // keybind changer

  // Code for reset key
  let keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
  function setupKeybindPicker(buttonId, keybindType) {
      const button = document.getElementById(buttonId);
      if(!keybinds[keybindType]){
          keybinds[keybindType] = "Shift";
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
  document.addEventListener('keydown', function(e){
    let keybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
    let resetButton = document.getElementById('ResetKeybind');
    let isSettingKeybind = resetButton && resetButton.textContent === "Press any key...";
    if(!(isSettingKeybind || window.timeKeeper.dialogActive || document.getElementById('edit-box'))){
        if(e.key === keybinds["resetKey"]){
            const keydownEvent = new KeyboardEvent('keydown', {
                keyCode: 27
            });
            document.dispatchEvent(keydownEvent);
            document.querySelector('[jsname="NSjDf"]').click();
        }
    }
  });
  return code
}
