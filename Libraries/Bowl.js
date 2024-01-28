window.Bowl = {};

window.Bowl.make = function () {
    // Trigger: Button (Add to Bootstrap Menu) <- Add from here? ask ChatGPT

// HTML window identical to timer stuff
// Title: Fruit Bowl Settings / Portal Fruit Settings
// 10 icons per row
// IconsControl radio group: Select all, Default Bowl, Pudding bowl, Custom (auto switched on a click on any fruit)
// BehaviorControl radio group: Random, cycle, stack (Only show on Portal)
//

}

window.Bowl.alterCode = function (code) {

    let bowlFuncOrigin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function(a)$/,
    /if\(22===a\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,6}\){/,
    deleteModDebug);

    let bowlFunc = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function(a)$/,
    /if\(22===a\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,6}\){/,
    deleteModDebug);



    return code;
}
