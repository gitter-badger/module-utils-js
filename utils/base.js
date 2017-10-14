exports.moduleName = 'DefaultModule';
exports.version = '1.0.0';
exports.utilsVersion = '1.0.0';
exports.lan = {
    SK: 'SK',
    CZ: 'CZ',
    EN: 'EN',
    DE: 'DE'
};
exports.SID = function(l) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var len = chars.length;
    var lenID = (l && !isNaN(l)) ? l : 5;
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
};
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
exports.filter = function(arr, fn) {
    var acc = [];
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(null, arr[i], i, arr)) {
            acc.push(arr[i]);
        }
    }
    return acc;
};
exports.find = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(null, arr[i], i, arr)) {
            return arr[i];
        }
    }
    return null;
};
exports.reduce = function(arr, fn, initialVal) {
    var acc = (initialVal === undefined) ? undefined : initialVal;
    for (var i = 0; i < arr.length; i++) {
        if (acc !== undefined)
            acc = fn.call(undefined, acc, arr[i], i, arr);
        else
            acc = arr[i];
    }
    return acc;
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
exports.strFormat = function(str, args) {
    return str.replace(/\{\d+\}/g, function(text) {
        var value = args[+text.substring(1, text.length - 1)];
        return value === null ? '' : value;
    });
};
exports.strHyphenize = function(str) {
    if (typeof(str) !== 'string') {
        return null;
    }
    return str.replace(/\B([A-Z])/g, function (g) {
        return ('-' + g[0]);
    }).toLowerCase();
};
exports.strHtml = function(tag, obj) {
    if (!tag || typeof(tag) != 'string') {
        return '';
    }
    var pairables = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    var str = '<' + tag;
    if (!obj) { // Allow empty elements <p></p>
        obj = {};
    }
    if (obj.id) {
        str += ' id="' + obj.id + '"';
    }
    if (obj.classes && Array.isArray(obj.classes)) {
        str += classesAsStr(obj);
    }
    if (obj.style && typeof(obj.data == 'object')) {
        str += stylesAsStr(obj.style);
    }
    str += attrsAsStr(obj);
    if (obj.data && typeof(obj.data) == 'object') {
        str += dataAttrsAsStr(obj.data);
    }
    if (pairables.indexOf(tag) >= 0) {
        return str + '/>';
    }
    str += '>';
    str += obj.html;
    str += '</' + tag + '>';
    return str;
    function classesAsStr(obj) {
        var arr = obj.classes;
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (v) {
                v = '.' + v;
            }
        }
        str = obj.classes.join(' ');
        return (str.length > 0) ? (' class="' + str) + '"' : '';
    }
    function attrsAsStr(obj) {
        obj = (typeof(obj) == 'object') ? obj : {};
        var str = '';
        for (var k in obj) {
            if (['id', 'classes', 'style', 'data', 'html'].indexOf(k) >= 0) {
                continue;
            }
            var attr = k + '="' + obj[k] + '"';
            str += (str.length > 0) ? (' ' + attr) : attr;
        }
        return (str.length > 0) ? (' ' + str) : '';
    }
    function dataAttrsAsStr(obj) {
        var str = '';
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                var attr = 'data-' + k + '="' + obj[k] + '"';
                str += (str.length > 0) ? (' ' + attr) : attr;
            }
        }
        return (str.length > 0) ? (' ' + str) : '';
    }
    function stylesAsStr(obj) {
        var str = '';
        for (var k in obj) {
            str += exports.strHyphenize(k) + ':' + obj[k] + ';';
        }
        return (str.length > 0) ? (' style="' + str + '"') : '';
    }
};
exports.logDebug = function(/*...args*/) {
	var log = exports.argsToDebugString.apply(this, arguments);
	console.log(exports.moduleName + ': ' + log);
};
exports.log = function(/*...args*/) {
    var args = [].slice.call(arguments);
    args.unshift(exports.moduleName + ': ');
    console.log.apply(null, args);
};
exports.logWarn = function(/*...args*/) {
    var args = [].slice.call(arguments);
    args.unshift(exports.moduleName + ': ');
    console.warn.apply(null, args);
};
/**
 * @param {String|Error} problem
 * @param {String} [message]
 * Error passed: Set error.id = problem.message.
 * String passed: Set error.id = problem.
 */
exports.error = function(problem, message) {
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
    var Co = function(errors) {
        if (errors) {
            if (!Array.isArray(errors)) {
                throw new Error('invalidParameter');
            }
            for (var i = 0; i < errors.length; i++) {
                if (!errors[i] || !errors[i].id) {
                    throw new Error('invalidArrayItem');
                }
            }
        }
        this.errors = errors || [];
    };
    Co.prototype = {
        push: function(err) {
            this.errors.push(err);
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
        hasError: function(id) {
            var arr = this.errors;
            if (id) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] && arr[i].id == id) {
                        return true;
                    }
                }
                return false;
            }
            return arr.length > 0;
        },
        throwFirst: function() {
            if (this.errors.length <= 0) {
                throw new Error('emptyErrorBuilder');
            }
            this.errors[0].throw();
        },
        first: function() {
            return this.errors[0] || null;
        },
        last: function() {
            return this.errors[this.errors.length - 1] || null;
        },
        toString: function() {
            return JSON.stringify(this, null, '    ');
        }
    };
    return new Co(errors);
};
exports.Schema = function(fn) {
    var Co = function(fn) {
        this.rule = {};
        this.__control = null;
        fn.apply(null, [
            attr.bind(this),
            attrError.bind(this),
            attrValidate.bind(this),
            func.bind(this),
            funcError.bind(this)
        ]);
    };
    Co.prototype = {
        validate: function(obj, lan) { // Can be called without normalize.
            var eb = new exports.ErrorBuilder();
            for (var k in this.rule) {
                if (this.rule.hasOwnProperty(k)) {
                    var v = obj[k];
                    var rule = this.rule[k];
                    var mes = rule.message[lan] || rule.message['default'] || ('Invalid property "' + k + '".');
                    if (rule.required) {
                        if (rule.type === '[object Number]') {
                            if (!v && v !== 0) {
                                eb.push(exports.error(k, mes));
                            }
                        }
                        else {
                            if (!v) {
                                eb.push(exports.error(k, mes));
                            }
                        }
                    }
                    if (v && Object.prototype.toString.call(v) !== rule.type) {
                        eb.push(exports.error(k, mes));
                    }
                    if (v && rule.validate && !rule.validate(v)) {
                        eb.push(exports.error(k, mes));
                    }
                }
            }
            return eb;
        },
        /**
         * Does not validates.
         * In case of type missmatch assigns empty value.
         * In case of empty value use normalized empty value.
         *
         * - (nonExisting|typeMissmatch) attr {String|Object|Date|Number} -> null
         * - (nonExisting|typeMissmatch) attr {Array} -> []
         * - (nonExisting|typeMissmatch) func -> function() {}
         */
        normalize: function(obj) {
            var norm = {};
            for (var k in this.rule) {
                if (this.rule.hasOwnProperty(k)) {
                    var rule = this.rule[k];
                    var val = obj[k];
                    var typ = Object.prototype.toString.call(val);
                    if (!val || typ !== rule.type) {
                        if (rule.type === '[object Array]') {
                            norm[k] = [];
                        }
                        else if (rule.type == '[object Function]') {
                            norm[k] = function() {};
                        }
                        else {
                            norm[k] = null;
                        }
                    }
                    else {
                        norm[k] = val;
                    }
                }
            }
            return norm;
        }
    };
    function attr(name, type, required) { // Starts attribute definition
        if (!name || typeof(name) !== 'string') {
            throw new Error('invalidParameter');
        }
        type = strType(type);
        if (!type || typeof(required) !== 'boolean') {
            throw new Error('invalidParameter');
        }
        this.__control = name;
        this.rule[this.__control] = {
            type: type,
            required: required,
            message: {
                default: 'Invalid attribute "' + name + '".'
            }
        };
    }
    function func(name) { // Starts function definition
        if (!name || typeof(name) !== 'string') {
            throw new Error('invalidParameter');
        }
        this.__control = name;
        this.rule[this.__control] = {
            type: '[object Function]',
            required: true,
            message: {
                default: 'Invalid function "' + name + '".'
            }
        };
    }
    var attrError = funcError = function(a, b) { // Sets default or localized error message.
        if (!a || typeof(a) !== 'string') {
            throw new Error('invalidParameter');
        }
        if (b && typeof(b) !== 'string') {
            throw new Error('invalidParameter');
        }
        var lan = (a && b) ? a : 'default';
        var mes = (a && b) ? b : a;
        if (!this.rule[this.__control]) {
            throw new Error('invalidOrder');
        }
        if (!this.rule[this.__control].message) {
            this.rule[this.__control].message = {};
        }
        this.rule[this.__control].message[lan] = mes;
    }
    function attrValidate(fn) {
        if (!fn || typeof(fn) !== 'function') {
            throw new Error('invalidParameter');
        }
        if (!this.rule[this.__control]) {
            throw new Error('invalidOrder');
        }
        this.rule[this.__control].validate = fn;
    }
    function strType(type) {
        if (type === Number) {
            return '[object Number]';
        }
        else if (type === String) {
            return '[object String]';
        }
        else if (type === Array) {
            return '[object Array]';
        }
        else if (type === Date) {
            return '[object Date]';
        }
        else if (type === Object) {
            return '[object Object]';
        }
        else {
            null;
        }
    }
    return new Co(fn);
};
