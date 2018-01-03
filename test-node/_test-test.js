import { describe } from '../utils/test';

var U = require('../utils.min.js');

U.describe('aaa', function(test, before, after) {
    before(function() {

    });
    test(function(it, describe) {
        describe('aaa.bbb', function(test) {
            test(function(it, end) {
                setTimeout(function() {
                    end();
                });
            });
        });
    });
    after(function() {

    });
});

U.describe('ccc', function(test) {
    test(function(it, end) {
        console.log('--> OK ddd');
        return end();
    });
});

U.runTests();

// U.describe('v1', function(next) {
//     U.describe('v1.aa', function(next) {
//         U.describe('v1.aa.bb', function(next) {
//             it('status should be 100', true);
//             it('status should be 100', false);
//             return next();
//         });
//         U.describe('v1.aa.cc', function(next) {
//             it('status should be 200', true);
//             setTimeout(function(params) {
//                 it('status should be 200', false);
//                 return next();
//             }, 1000);
//         });
//         return next();
//     });
//     U.describe('v1.dd', function(next) {
//         it('status should be 300', true);
//         it('status should be 300', false);
//         return next();
//     });
// });

// U.describe('v2', function(next) {
//     U.describe('v2.aa', function(next) {
//         U.describe('v2.aa.bb', function(next) {
//             it('status should be 400', true);
//             it('status should be 400', false);
//             return next();
//         });
//         U.describe('v2.aa.bb', function(next) {
//             it('status should be 500', true);
//             it('status should be 500', false);
//             return next();
//         });
//         return next();
//     });
//     U.describe('v2.dd', function(next) {
//         it('status should be 600', true);
//         it('status should be 600', false);
//         return next();
//     });
// });
