var fs = require('fs');
var path = require('path');
exports.compileUtils = function(filePaths, accessVariable, moduleName, keys) {
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
		str += compileUtilsFromFile(fileStat.filePath, fileStat.keyCount, accessVariable, moduleName, lastFile, keys);
    });
    var out = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf8');
    out = out.replace(/ACCESS_VAR/g, accessVariable);
    out = out.replace(/^\s*UTILS/m, str);
    fs.writeFileSync('./utils.min.js', out);
    endLog(start, out);

};
function endLog(start, out) {
    var s = Buffer.byteLength(str, 'utf8');
    s = s / 1000;
    var t = (Date.now() - start);
    console.log('TIME: ' + t + 'ms | SIZE: ' + s + 'kb');
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
function compileUtilsFromFile(filePath, keyCount, accessVariable, moduleName, lastFile, keys) {
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
        temp += '    ' + k + ': ' + compileModuleValue(k, v, accessVariable, moduleName) + ((i === keyCount && lastFile) ? '' : ',\n');
        i++;
	}
	return temp;
}
function compileModuleValue(key, value, accessVariable, moduleName) {
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
		if (key == 'moduleName') {
			value = moduleName;
		}
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
	return ('\n' + input + '\n').replace(/(?:(^|[-+\([{}=,:;!%^&*|?~]|\/(?![/*])|return|throw)(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*(\/(?![/*])(?:\\[^\n]|[^[\n\/\\]|\[(?:\\[^\n]|[^\]])+)+\/)|(^|'(?:\\[\s\S]|[^\n'\\])*'|"(?:\\[\s\S]|[^\n"\\])*"|([0-9A-Za-z_$]+)|([-+]+)|.))(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*/g, function (str, context, regexp, result, word, operator) {
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
			if (regexp) {
				result = context + (context == '/' ? '\n' : '') + regexp;
			}
			last = '';
		}
		return result;
	});
}
