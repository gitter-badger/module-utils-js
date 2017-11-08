var compiler = require('./compiler');
var keys = null;
if (process.env.KEYS) {
    keys = process.env.KEYS.split(/\s*,\s*/);
}
compiler.compileUtils([
    './utils/base.js',
    './utils/flow.js',
    './utils/ajax.js',
    './utils/dom.js'
], 'U', process.env.MODULE || 'DefaultModule', keys);
