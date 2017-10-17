var fs = require('fs');
var base = require('./utils/base.js');
exports.compileUtils = function(filePaths, accessVariable, moduleName) {
	if (!Array.isArray(filePaths) || filePaths.length == 0) {
		return;
	}
	str = 'var ' + accessVariable + ' = {\n';
	filePaths.forEach(function(path) {
		str += compileUtilsFromFile(path, accessVariable, moduleName);
	});
	str += '};\n';
	fs.writeFileSync('./utils.min.js', str);
};
function compileUtilsFromFile(filePath, accessVariable, moduleName) {
	var temp = '';
	var utils = require(filePath);
	for (var k in utils) {
		if (utils.hasOwnProperty(k)) {
			var v = utils[k];
			temp += '    ' + k + ': ' + compileModuleValue(k, v, accessVariable, moduleName) + ',\n';
		}
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
	base.forIn(obj, function(k, v, first, last) {
		v = compileModuleValue(k, v, accessVariable);
		line += k + ':' + v + (last == true ? '' : ',');
	});
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
