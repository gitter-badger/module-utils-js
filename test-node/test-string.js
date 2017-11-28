var U = require('../utils/base');
var str = U.strToHTMLText('  Lorem ipsum    dolor sit amet.   ');
U.log('str:', str);
str = 'Lorem sit amet, adipiscing elit, magna aliqua. Ut ad veniam, consequat??? Cil';
var reversed = U.strReverse(str);
console.log('reversed: ' + reversed);
var until = U.strUntil(reversed, /\s+/g);
console.log('until: ' + until);
