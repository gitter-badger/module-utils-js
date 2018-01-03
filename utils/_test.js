// var editables = {};
exports.describe = function(subject, bodyFn) {
    console.log('--> subject:', subject);
    if (typeof(window) === 'undefined' && (typeof(process) !== 'object' && typeof(global) !== 'object')) {
        throw new Error('unrecognizedEnviroment');
    }
    var cache = new exports.Cache().prefix('__test-');
    if (!Array.isArray(cache.get('arr'))) {
        cache.set('arr', []);
    }
    function runNextTest() {
        var arr = cache.get('arr');
        console.log('--> OK arr:', arr);
        var len = arr.length;
        if (len > 0) {
            var test = arr.shift();
            cache.set('arr', arr);
            test.bodyFn(next);
        }
    }
    var next = function() {
        console.log('--> OK next');
        return runNextTest();
    };
    var test = composeTest(subject, bodyFn, next);
    var arr = cache.get('arr').concat([test]);
    cache.set('arr', arr);
    function log(typ, subject, msg) {
        var node = typeof(process) === 'object';
        if (node) {
            if (typ == 'pass') {
                console.log('\033[32m\u2714\033[0m ' + subject + ': ' + msg);
            }
            else if (typ == 'fail' || typ == 'unhandled') {
                console.log('\033[31m\u2718\033[0m ' + subject + ': ' + msg);
            }
        }
    }
    function composeTest(subject, bodyFn, next) {
        return {
            subject: subject,
            bodyFn: bodyFn,
            next: next
        }
    }
    // var arr = [];
    // var runNextTestFromGroup = function() {
    //     var len = arr.length;
    //     if (len > 0) {
    //         var fn = arr[0];
    //         fn(runNextTestFromGroup);
    //     }
    // };
    // var fn = function(next) {
    //     var self = this;
    //     self.subject = subject;
    //     var prev = {
    //         it: g.it
    //     };
    //     var restore = function() {
    //         g.it = prev.it;
    //         arr.shift();
    //         if (next) {
    //             next();
    //         }
    //     };
    //     g.it = function(msg, condition) {
    //         var self = this;
    //         var typ = !!condition ? 'pass' : 'fail';
    //         log(typ, self.subject, msg);
    //     };
    //     try {
    //         bodyFn(restore);
    //     } catch (err) {
    //         log('unhandled', self.subject, err.message);
    //     }
    // };
    // arr.push(fn);
    // if (arr.length == 1) {
    //     runNextTestFromGroup();
    // }
};
exports.runTests = function() {

};
// exports.test = function(subject, fn/*next, should, before, after*/) {
//     if (typeof(subject) !== 'string' || typeof(fn) !== 'function') {
//         throw new Error('invalidParameter');
//     }
//     var test = {};

//     if (test.hasOwnProperty(subject)) {

//     };

//     fn();

//     var runNextTest = function() {
//         if (pendingTests.length > 0) {
//             var test = pendingTests[0];
//             test(runNextTest);
//         }
//     }
//     function logResults() {

//     }

//     // function logOk(msg) {

//     // }
//     // function logErr(msg) {

//     // }
//     function hook(name) {
// 		return function(fn) {
// 			if (test[name]) {
//                 throw new Error("This hook should be defined outside of a loop or inside a nested test group:\n" + fn);
//             }
// 			test[name] = fn;
// 		}
// 	}
//     function unique(subject) {
// 		if (test.hasOwnProperty(subject)) {
// 			console.warn("A test `" + subject + "` was already defined.");
// 			// while (test.hasOwnProperty(subject)) {
//             //     subject += '*';
//             // }
// 		}
// 		return subject;
// 	}
// };
// exports.testAsync


// U.test(function(type) {

// }, function() {

// });
// //
// // API
// U.describe('api', function(next, it, before, after) {
//     U.describe('api.addModification', function(next, it, before, after) {
//         before(function() {

//         });
//         editables.addModification({});
//         it("should have one modification", editables.modifications.length == 1);
//         U.ajax({}, function(res) {
//             it("should have status 200", res.status === 200);
//             return next();
//         });
//         after(function() {
//             return next();
//         });
//     });
//     U.describe('api.setData', function(next) {
//         editables.setData({a: {b: 'b'}});
//         ok(U.objEq(editables.data, {a: {b: 'b'}}));
//         return next();
//     });
// });
