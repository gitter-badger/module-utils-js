var fs = require('fs');
function compileToOneLiner(input) {
	var last = '';
	return ('\n' + input + '\n').replace(/(?:(^|[-+\([{}=,:;!%^&*|?~]|\/(?![/*])|return|throw)(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*(\/(?![/*])(?:\\[^\n]|[^[\n\/\\]|\[(?:\\[^\n]|[^\]])+)+\/)|(^|'(?:\\[\s\S]|[^\n'\\])*'|"(?:\\[\s\S]|[^\n"\\])*"|([0-9A-Za-z_$]+)|([-+]+)|.))(?:\s|\/\/[^\n]*\n|\/\*(?:[^*]|\*(?!\/))*\*\/)*/g, function (str, context, regexp, result, word, operator) {
		if (word) {
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
compileUtils(' = ');
function compileUtils(separator) {
	str = '';
	str += compileUtilsFromFile('./utils/base.js', separator);
	str += compileUtilsFromFile('./utils/generators.js', separator);
	fs.writeFileSync('./utils.min.js', str);
};
function compileUtilsFromFile(filePath, separator) {
	var temp = '';
	var utils = require(filePath);
	for (var k in utils) {
		if (utils.hasOwnProperty(k)) {
			var v = utils[k];
			temp += k + separator + compileToOneLiner(v) + '\n';
		}
	}
	return temp;
}
