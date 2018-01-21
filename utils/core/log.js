exports.logDebug = function(/*...args*/) {
	var log = exports.toDebugStr.apply(this, arguments);
    console.log(exports.moduleName + ': ' + log);
};
exports.logWarn = function(/*...args*/) {
    var args = [].slice.call(arguments);
    args.unshift(exports.moduleName + ':');
    console.warn.apply(null, args);
};
exports.log = function(/*...args*/) {
    var args = [].slice.call(arguments);
    args.unshift(exports.moduleName + ':');
    console.log.apply(null, args);
};
