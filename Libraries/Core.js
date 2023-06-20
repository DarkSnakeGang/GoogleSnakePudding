window.Core = {};

window.Core.make = function () {

    /// Code inspired by fishes, aka copy-pasted
    window.uiImage = function (src) {
        let img = new Image();
        img.src = src;
        img.width = 40;
        img.height = 40;
        img.class = 'DqMRee SsAred'; // Hardcoded, need to figure out what this is and how to make it dynamic or something.
        return img;
    };

    document.body.style.overflow = 'hidden'; // Hide scroll bar


}

window.Code.alterCode = function (code) {

    return code;
}
