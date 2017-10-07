var compiler = require('./compiler');
compiler.compileUtils([
    './utils/base.js',
    './utils/flow.js',
    './utils/ajax.js'
], process.env.NAMESPACE || 'YourModuleName');
