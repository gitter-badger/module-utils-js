exports.name = 'your-module-name.js';
exports.version = '1.0.0';
exports.utilsVersion = '1.0.0';
exports.SID = function(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var len = chars.length;
    var lenID = typeof(length) ? length : 5;
    var str = '';
    for (var i = 0; i < lenID; i++) {
        str += chars.charAt(Math.floor(Math.random() * len));
    }
    return str;
};
exports.UID = function() {
    return Math.ceil(Date.now() / 1000) + '-' + exports.SID(3);
};
exports.objectKeys = function(obj) {
    var keys = [];
    var k;
    for (k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            keys.push(k);
        }
    }
    return keys;
}
exports.forIn = function(object, fn) {
    var len = exports.objectKeys(object).length;
    var i = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var first = (i == 0);
            var last = ((i + 1) == len);
            fn(key, object[key], first, last);
            i++;
        }
    }
};
exports.forEach = function(arr, fn) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var first = (i == 0);
        var last = ((i + 1) == len);
        fn(arr[i], i, arr, first, last);
    }
};
exports.map = function(arr, fn) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        temp.push(fn(arr[i], i, arr));
    }
    return temp;
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
exports.contains = function(item, searchValue) {
    if (typeof(item) == 'string') {
        if (item.indexOf(searchValue) !== -1) {
            return true;
        }
    }
    if (Array.isArray(item)) {
        if (item.indexOf(searchValue) !== -1) {
            return true;
        }
    }
    return false;
};
exports.extend = function(target, source, rewrite) {
    if (!target || !source) {
        return target;
    }
    if (typeof(target) !== 'object' || typeof(source) !== 'object') {
        return target;
    }
    if (rewrite === undefined) {
        rewrite = true;
    }
    var keys = Object.keys(source);
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        if (rewrite || target[key] === undefined) {
            target[key] = exports.clone(source[key]);
        }
    }
    return target;
};
exports.toQueryString = function(obj, base) { // FROM MooTools
    var queryString = [];
    Object.each(obj, function(v, k){
        if (base) k = base + '[' + k + ']';
        var result;
        switch (typeOf(v)){
            case 'object': result = Object.toQueryString(v, k); break;
            case 'array':
                var qs = {};
                v.each(function(val, i){
                    qs[i] = val;
                });
                result = Object.toQueryString(qs, k);
                break;
            default: result = k + '=' + encodeURIComponent(v);
        }
        if (v != null) queryString.push(result);
    });
    return queryString.join('&');
};
exports.argsToDebugString = function(args) {
	var logs = '';
	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (arg) {
			if (typeof arg == 'object' || Array.isArray(arg)) {
				if (Array.isArray(arg)) {
					logs += 'Array(' + arg.length + '): \n';
				}
				else if (typeof arg == 'object') {
					logs += 'Object: \n';
				}
				logs += JSON.stringify(arg, null, '\t');
				logs += '\n';
			}
			else {
				logs += arg;
			}
		}
		else {
			logs += ' ' + arg;
		}
	}
	return logs;
};
exports.logDebug = function(/*...args*/) {
	var log = exports.argsToDebugString.apply(this, arguments);
	console.log(exports.name + ': ' + log);
};
exports.logInfo = function(str) {
    console.log(exports.name + ': ' + str);
};
exports.logWarning = function(str) {
    console.warn(exports.name + ': ' + str);
};
exports.camelToHyphen = function(str) {
    return !str ? null : str.replace(/([A-Z])/g, function (g) {
        return ('-' + g[0].toLowerCase());
    }).slice(1);
}
/**
 * @param {String|Error} problem
 * @param {String} [message]
 * Error passed: Set error.id = problem.message.
 * String passed: Set error.id = problem.
 */
exports.ERROR = function(problem, message) {
    var Co = function(problem, message) {
        if (!problem) {
            throw new Error('missingProblem');
        }
        message = message || null;
        if (problem instanceof Error) {
            this.id = problem.message;
            this.message = message;
        }
        else if (typeof(problem) == 'string') {
            this.id = problem;
            this.message = message;
        }
        else {
            throw new Error('invalidProblem');
        }
    };
    Co.prototype = {
        throw: function() {
            throw new Error(this.id);
        },
        toString: function() {
            return JSON.stringify({
                id: this.id,
                message: this.message
            }, null, '    ');
        }
    };
    return new Co(problem, message);
};
exports.ErrorBuilder = function(errors) {
    var Co = function() {
        if (errors) {
            if (!Array.isArray(errors)) {
                throw new Error('invalidParameter');
            }
            for (var i = 0; i < errors.length; i++) {
                if (!errors[i] || !(errors[i] instanceof ErrorPair)) {
                    throw new Error('invalidArrayItem');
                }
            }
        }
        this.errors = errors || [];
    };
    Co.prototype = {
        push: function(errorPair) {
            this.errors.push(errorPair);
        },
        remove: function(id) {
            var arr = this.errors;
            var idx = -1;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    idx = i;
                }
            }
            if (idx > -1) {
                arr.splice(idx, 1);
            }
        },
        clear: function() {
            this.errors = [];
        },
        toString: function() {
            return JSON.stringify(this, null, '    ');
        }
    };
    return new Co(errors);
};
