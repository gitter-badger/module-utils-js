exports.logPrefix = function(str) {
    var c = exports.malloc('__LOG');
    c('prefix', str);
};
exports.logDebug = function(/*...args*/) {
    var c = exports.malloc('__LOG');
    var log = exports.toDebugStr.apply(this, arguments);
    var pre = c('prefix') && args.unshift(c('prefix') + ': ');
    console.log(pre + log);
};
exports.logWarn = function(/*...args*/) {
    var c = exports.malloc('__LOG');
    var args = [].slice.call(arguments);
    var pre = c('prefix') && args.unshift(c('prefix') + ': ');
    console.warn.apply(null, args);
};
exports.log = function(/*...args*/) {
    var c = exports.malloc('__LOG');
    var args = [].slice.call(arguments);
    var pre = c('prefix') && args.unshift(c('prefix') + ': ');
    console.log.apply(null, args);
};
