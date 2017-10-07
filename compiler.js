var fs = require('fs');
var base = require('./utils/base.js');
exports.compileUtils = function(filePaths, namespace) {
	if (!Array.isArray(filePaths) || filePaths.length == 0) {
		return;
	}
	str = 'var ' + namespace + ' = {\n';
	filePaths.forEach(function(path) {
		str += compileUtilsFromFile(path, namespace);
	});
	str += '}\n';
	fs.writeFileSync('./utils.min.js', str);
};
function compileUtilsFromFile(filePath, namespace) {
	var temp = '';
	var utils = require(filePath);
	for (var k in utils) {
		if (utils.hasOwnProperty(k)) {
			var v = utils[k];
			temp += '    ' + k + ': ' + compileModuleValue(k, v, namespace) + ',\n';
		}
	}
	return temp;
}
function compileModuleValue(key, value, namespace) {
	if (!value) {
		return value;
	}
	if (typeof(value) == 'function') {
		return stringifyScript(value.toString(), namespace);
	}
	else if (typeof(value) == 'object') {
		return compileModuleObjectValue(value);
	}
	else if (typeof(value) == 'string') {
		if (key == 'name') {
			// value = base.camelToHyphen(namespace) + '.js';
			value = namespace;
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
function compileModuleObjectValue(obj, namespace) { // REKURZIA
	if (obj instanceof Date) {
		return obj.getTime();
	}
	var line = '{';
	base.forIn(obj, function(k, v, first, last) {
		v = compileModuleValue(k, v, namespace);
		line += k + ':' + v + (last == true ? '' : ',');
	});
	return line + '}';
}
function stringifyScript(input, namespace) {
    var last = '';
	return ('\n' + input + '\n').replace(/(?:(^|[-+\([{}=,:;!%^&*|?~]|\/(?![/*])|return|throw)(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*(\/(?![/*])(?:\\[^\n]|[^[\n\/\\]|\[(?:\\[^\n]|[^\]])+)+\/)|(^|'(?:\\[\s\S]|[^\n'\\])*'|"(?:\\[\s\S]|[^\n"\\])*"|([0-9A-Za-z_$]+)|([-+]+)|.))(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*/g, function (str, context, regexp, result, word, operator) {
		if (word) {
			if (namespace && word == 'exports') {
				result = namespace;
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
