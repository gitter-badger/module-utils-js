exports.forIn = function(object, fn) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            fn(key, object[key]);
        }
    }
};
exports.forEach = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i, arr);
    }
};
exports.map = function(arr, fn) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        temp.push(fn(arr[i], i, arr));
    }
    return temp;
};
exports.isArray = function(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
},
exports.isObject = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
},
exports.isString = function(str) {
    return Object.prototype.toString.call(obj) == '[object String]';
};
exports.isDate = function(date) {
    return Object.prototype.toString.call(obj) == '[object Date]';
};
exports.isNumber = function(num) {
    return Object.prototype.toString.call(obj) == '[object Number]';
};
exports.formatString = function(str, args) {
    return str.replace(/\{\d+\}/g, function(text) {
        var value = args[+text.substring(1, text.length - 1)];
        return value === null ? '' : value;
    });
};
exports.clone = function(obj, skip, skipFunctions) {
    if (!obj) {
        return obj;
    }
    var type = typeof(obj);
    if (type !== 'object' || obj instanceof Date) {
        return obj;
    }
    var length;
    var o;
    if (obj instanceof Array) {
        length = obj.length;
        o = new Array(length);
        for (var i = 0; i < length; i++) {
            type = typeof(obj[i]);
            if (type !== 'object' || obj[i] instanceof Date) {
                if (skipFunctions && type === 'function') {
                    continue;
                }
                o[i] = obj[i];
                continue;
            }
            o[i] = exports.clone(obj[i], skip, skipFunctions);
        }
        return o;
    }
    o = {};
    for (var m in obj) {
        if (skip && skip[m]) {
            continue;
        }
        var val = obj[m];
        var type = typeof(val);
        if (type !== 'object' || val instanceof Date) {
            if (skipFunctions && type === 'function') {
                continue;
            }
            o[m] = val;
            continue;
        }
        o[m] = exports.clone(obj[m], skip, skipFunctions);
    }
    return o;
};