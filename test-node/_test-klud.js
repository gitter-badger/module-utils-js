// SEE ALSO QUNIT AND https://github.com/MithrilJS/mithril.js/tree/rewrite/ospec FOR INSPIRATION
require("../utils/klud");
require("../utils/klud-report");
function highlight(message) {
    return process ? "\x1b[31m" + message + "\x1b[0m" : "%c" + message + "%c "
}
test(function(e, test, msg) {
    if (e == 'pass') {
        console.log('\033[32m\u2714\033[0m ' + test + ': ' + msg);
    } else if (e == 'fail' || e == 'except') {
        console.log('\033[31m\u2718\033[0m ' + test + ': ' + msg);
    }
});

test('It is 1984 now', function() {
    ok(2*2 == 5, '2x2 equals five');
    test('Nested test', function() {
        ok(2*2 == 4, '2x2 should be 4');
    });
});

test('but setTimeout still works', function(next) {
	ok(typeof setTimeout === 'function', 'setTimeout is a function');
	var time = Date.now();
	setTimeout(function() {
		var delta = Date.now() - time;
		ok(delta >= 990, 'setTimeout took ' + delta + ' ms');
		next();
	}, 1000);
}, true); // this is an async test

test('compare empty arrays', function() {
	ok([] == [], 'should fail');
	ok(eq([], []), 'should pass');
});

test('check exception', function() {
	throw new Error("boom!");
});
