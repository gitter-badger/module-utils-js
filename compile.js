var compiler = require('./compiler');
compiler.compileUtils([
    './utils/base.js',
    './utils/flow.js',
    './utils/ajax.js',
    './utils/dom.js'
], 'U', process.env.MODULE || 'DefaultModule');
