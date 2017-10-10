var error = require('../utils/base.js').error;
var ErrorBuilder = require('../utils/base.js').ErrorBuilder;
var logInfo = require('../utils/base.js').logInfo;
var errorBuilder = new ErrorBuilder();

var err = error('BuggsBunny-name', 'Parameter ...');
// logInfo(err.throw());
logInfo(err.toString());
errorBuilder.push(error('BuggsBunny-name', 'Parameter "name" is missing or has incorrect format.'));
errorBuilder.push(error(new Error('BuggsBunny-carrots'), 'Parameter "carrots" is missing or has incorrect format.'));
logInfo('Builder0: ', errorBuilder.toString());
errorBuilder.remove('BuggsBunny-carrots');
logInfo('Builder1: ', errorBuilder.toString());
errorBuilder.clear();
logInfo('Builder2: ', errorBuilder.toString());
