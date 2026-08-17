window.ResetKeySpeedrun = {};

window.ResetKeySpeedrun.make = function () {
    window._speedrunKeybinds = JSON.parse(localStorage.getItem("keybinds")) || {};
    if (!window._speedrunKeybinds.resetKey) {
        window._speedrunKeybinds.resetKey = "Shift";
    }

    const button = document.getElementById("ResetKeybind");
    window._speedrunResetKeyButton = button;
    if (button) {
        button.textContent = "Reset Key: " + window._speedrunKeybinds.resetKey;
        button.addEventListener("click", function () {
            button.textContent = "Press any key...";
            document.addEventListener("keydown", function handler(e) {
                window._speedrunKeybinds.resetKey = e.key;
                button.textContent = "Reset Key: " + e.key;
                localStorage.setItem("keybinds", JSON.stringify(window._speedrunKeybinds));
                document.removeEventListener("keydown", handler);
            });
        });
    }
};

window.ResetKeySpeedrun.alterCode = function (code) {
    document.addEventListener("keydown", function (e) {
        if (e.repeat) return;
        const keybinds = window._speedrunKeybinds || {};
        if (e.key !== keybinds.resetKey) return;

        const resetButton = window._speedrunResetKeyButton || document.getElementById("ResetKeybind");
        window._speedrunResetKeyButton = resetButton;
        if (resetButton && resetButton.textContent === "Press any key...") return;
        if (window.timeKeeper && window.timeKeeper.dialogActive) return;
        if (document.getElementById("edit-box")) return;

        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 27 }));
        const play = document.querySelector('[jsname="NSjDf"]');
        if (play) play.click();
    });
    return code;
};
