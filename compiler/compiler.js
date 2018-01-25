var fs = require('fs');
var path = require('path');
var KEYS = [];
exports.compileUtils = function(filePaths, accessVariable, keys) {
    keys = KEYS = unique(keys);
    var start = Date.now();
    if (!Array.isArray(filePaths) || filePaths.length == 0) {
        return;
    }
    filePaths = filePaths.map(function(str) {
        return path.resolve(str);
    });
    fileStats = getFileStatsWithAtLeastOneKey(filePaths, keys);
    str = '';
    fileStats.forEach(function(fileStat, fileIndex) {
        var lastFile = (fileStats.length === fileIndex + 1);
        str += compileUtilsFromFile(fileStat.filePath, fileStat.keyCount, accessVariable, lastFile, keys);
    });
    var out = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf8');
    out = out.replace(/ACCESS_VAR/g, accessVariable);
    out = out.replace(/^\s*UTILS/m, str);
    fs.writeFileSync('./utils.min.js', out);
    endLog(start, out);
};
function endLog(start, out) {
    var s = Buffer.byteLength(str, 'utf8');
    s = (s / 1000).toFixed(1);
    var t = (Date.now() - start);
    console.log(s + 'kB at ' + t + 'ms');
}
function getFileStatsWithAtLeastOneKey(filePaths, keys) {
    var arr = [];
    filePaths.forEach(function(path) {
        var utils = require(path);
        var len = Array.isArray(keys) ? Object.keys(utils).filter(function(k) {
            return (keys.indexOf(k) >= 0);
        }).length : Object.keys(utils).length;
        if (len > 0) {
            arr.push({
                filePath: path,
                keyCount: len
            });
        }
    });
    return arr;
}
function compileUtilsFromFile(filePath, keyCount, accessVariable, lastFile, keys) {
    var temp = '';
    var utils = require(filePath);
    var i = 1;
    for (var k in utils) {
        if (!utils.hasOwnProperty(k)) {
            continue;
        }
        if (Array.isArray(keys) && keys.indexOf(k) < 0) {
            continue;
        }
        var v = utils[k];
        temp += '    ' + k + ': ' + compileModuleValue(k, v, accessVariable) + ((i === keyCount && lastFile) ? '' : ',\n');
        i++;
    }
    return temp;
}
function isSpecialProperty(key) {
    return process.env[key] || ['utilsCompileCMD'].indexOf(key) >= 0;
}
function getSpecialProperty(key) {
    var v = '';
    if (key == 'utilsCompileCMD') {
        v = composeCMD();
    }
    else {
        v = process.env[key] || '';
    }
    return v ? ("'" + v + "'") : "''";
}
function composeCMD() {
    var arr = [];
    KEYS.forEach(function(key) {
        var v = process.env[key];
        if (v) {
            arr.push(key + '=' + v);
        }
    });
    if (process.env.KEYS) {
        arr.push('KEYS=' + unique(process.env.KEYS.split(/\s*,\s*/)).join(','));
    }
    arr.push('node compile');
    return arr.join(' ');
}
function compileModuleValue(key, value, accessVariable) {
    if (isSpecialProperty(key)) {
        return getSpecialProperty(key);
    }
    if (!value) {
        return value;
    }
    if (typeof(value) == 'function') {
        return stringifyScript(value.toString(), accessVariable);
    }
    else if (typeof(value) == 'object') {
        return compileModuleObjectValue(value);
    }
    else if (typeof(value) == 'string') {
        return "'" + value + "'";
    }
    else if (typeof(value.toString) == 'function') {
        return '"' + value.toString() + '"';
    }
    else {
        return value;
    }
}
function compileModuleObjectValue(obj, accessVariable) { // REKURZIA
    if (obj instanceof Date) {
        return obj.getTime();
    }
    var line = '{';
    var len = Object.keys(obj).length;
    var i = 0;
    for (var k in obj) {
        i++;
        var v = obj[k];
        v = compileModuleValue(k, v, accessVariable);
        line += k + ':' + v + (i == len ? '' : ',');
    }
    return line + '}';
}
function stringifyScript(input, accessVariable) {
    var last = '';
    return ('\n' + input + '\n').replace(/(?:(^|[-+\([{}=,:;!%^&*|?~]|\/(?![/*])|return|throw)(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*(\/(?![/*])(?:\\[^\n]|[^[\n\/\\]|\[(?:\\[^\n]|[^\]])+)+\/)|(^|'(?:\\[\s\S]|[^\n'\\])*'|"(?:\\[\s\S]|[^\n"\\])*"|([0-9A-Za-z_$]+)|([-+]+)|.))(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*/g, function (str, context, exp, result, word, operator) {
        if (word) {
            if (accessVariable && word == 'exports') {
                result = accessVariable;
            }
            result = (last == 'word' ? ' ' : (last == 'return' ? ' ' : '')) + result;
            last = (word == 'return' || word == 'throw' || word == 'break' ? 'return' : 'word');
        } else if (operator) {
            result = (last == operator.charAt(0) ? '\n' : '') + result;
            last = operator.charAt(0);
        } else {
            if (exp) {
                result = context + (context == '/' ? '\n' : '') + exp;
            }
            last = '';
        }
        return result;
    });
}
function unique(arr) {
    var unique = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var v = arr[i];
        if (unique.indexOf(v) === -1) {
            unique.push(v);
        }
    }
    return unique;
}
