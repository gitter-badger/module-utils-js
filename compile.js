var compiler = require('./compiler/compiler.js');
var keys = null;
if (process.env.KEYS) {
    keys = process.env.KEYS.split(/\s*,\s*/);
}
compiler.compileUtils([
    'utils/meta.js',
    'utils/_internal.js',
    'utils/core/log.js',
    'utils/core/generators.js',
    'utils/primitives/object.js',
    'utils/primitives/array.js',
    'utils/primitives/string.js',
    'utils/primitives/number.js',
    'utils/core/errors.js',
    'utils/core/schemas.js',
    'utils/core/flow.js',
    'utils/browser/ajax.js',
    'utils/browser/dom.js'
], 'U', process.env.MODULE || 'DefaultModule', keys);
