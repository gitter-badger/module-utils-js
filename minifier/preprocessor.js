var fs = require('fs');
function preprocessFiles(paths, next) {
    ensureTmpDir(function(err) {
        processEachFile(paths, function(err) {
            return next(err);
        });
    });
};
function processEachFile(paths, next) {
    (function loop() {
        var path = paths.pop();
        if (!path) {
            return next();
        }
        readFile(path, function(err, str) {
            if (err) {
                return next(err);
            }
            str = preprocessCode(str);
            var out = 'tmp/' + path.split('/').pop();
            writeFile(out, str, function(err) {
                if (err) {
                    return next(err);
                }
                setImmediate(function() {
                    return loop();
                });
            });
        });
    })();
};
preprocessFiles([
    '../utils/base.js'
], function(err) {
    if (err) {
        console.log('--> ERR :' + err.toString());
    }
    console.log('--> done');
});
function preprocessCode(str) {
    str = replaceSelfInvokingFunctions(str);
    return str;
}
function replaceSelfInvokingFunctions(str) {
    var del = '[[[[[[[[[[';
    var exp = /((\(\s*function.*\()|(!\s*function.*\())/g;
    while ((mat = exp.exec(str)) != null) {
        if (Array.isArray(mat)) {
            var i = mat.index;
            str = str.substring(0, i) + del + str.substring(i + 1); // REPLACE ( OR !
        }
    }
    del = ']]]]]]]]]]';
    exp = /\)\s*\((.*)\)(\s*;+\s*|(?=[^;]))/g;
    var newLineExp = /(\r\n|\r|\n)$/g;
    // to recover step 1 /]{10}[^\]]+?]{10}/g
    // to recover step 2 /]{10}/g
    while ((mat = exp.exec(str)) != null) {
        if (Array.isArray(mat)) {
            var i = mat.index;
            var j = mat.index + mat[0].length;
            var has = newLineExp.test(mat[0]);
            var args = mat[1].trim();
            var end = (args.length > 0) ? (del + args + del) : del;
            if (has) {
                end += '\n';
            }
            str = str.substring(0, i) + end + str.substring(j);
        }
    }
    return str;
}
function readFile(path, next) {
    return fs.readFile(path, 'utf8', function(err, str) {
        if (err) {
            return next(err);
        }
        return next(null, str);
    });
}
function writeFile(path, str, next) {
    return fs.writeFile(path, str, 'utf8', function(err) {
        if (err) {
            return next(err);
        }
        return next();
    });
}
function ensureTmpDir(next) {
    fs.mkdir('tmp', '755', function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
                return next();
            }
            return next(err);
        }
        return next();
    });
};
