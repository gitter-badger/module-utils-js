var U = require('../utils/base');
var str = '  Lorem sit      amet, adipiscing elit,, , ,,, magna aliqua. Ut ad veniam, consequat?!? cillum dolore eu nulla!! Excepteur sint non ctrl.getTasks() proident, anim id laborum.   ';
var html = U.strToHTMLText(str);
U.log('html:' + html);
var reversed = U.strReverse(str);
U.log('reversed:' + reversed);
var until = U.strUntil(reversed, /\s+/g);
U.log('until:' + until);
