window.Bowl = {};

window.Bowl.make = function () {

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
