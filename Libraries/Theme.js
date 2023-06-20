window.Theme = {};

window.Theme.make = function () {

    for (let src of [
        'https://i.postimg.cc/R0R1ZMNx/dark-night.png',
        'https://i.postimg.cc/t4bxfYzt/planeptune.png',
        'https://i.postimg.cc/T2rc2X5Y/Lastation-Logo.png',
        'https://i.postimg.cc/C53WfD61/pacman.png',
        'https://i.postimg.cc/8PLc5bjq/sonic-theme.png',
        'https://i.postimg.cc/6Q2DyGbK/jungle.png',
        'https://i.postimg.cc/5y7gwwGY/pudding-cr.png',
        'https://i.postimg.cc/HLr5YJmb/modloader-icon.png',
    ]) document.querySelector('#theme').appendChild(uiImage(src));

}

window.Theme.alterCode = function (code) {

    return code;
}
