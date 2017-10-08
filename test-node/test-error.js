var ERROR = require('../utils/base.js').ERROR;
var ErrorBuilder = require('../utils/base.js').ErrorBuilder;
var errorBuilder = new ErrorBuilder();

var err = new ERROR('BuggsBunny-name', 'Parameter ...');
// console.log(err.throw());
console.log(err.toString());
errorBuilder.push(new ERROR('BuggsBunny-name', 'Parameter "name" is missing or has incorrect format.'));
errorBuilder.push(new ERROR(new Error('BuggsBunny-carrots'), 'Parameter "carrots" is missing or has incorrect format.'));
console.log('Builder0: ', errorBuilder.toString());
errorBuilder.remove('BuggsBunny-carrots');
console.log('Builder1: ', errorBuilder.toString());
errorBuilder.clear();
console.log('Builder2: ', errorBuilder.toString());
