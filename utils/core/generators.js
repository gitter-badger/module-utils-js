exports.SID = function(len) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    len = parseInt(len);
    len = isNaN(len) ? 5 : len;
    if (len < 0) {
        throw new Error('invalidParameter');
    }
    var str = '';
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    var cache = exports.malloc('__GEN');
    var c = cache('SID');
    c = c === undefined ? 0 : (++c % 2);
    c = '' + c;
    cache('SID', c);
    return (str.length > 0) ? (str + '-' + c) : c;
};
exports.UID = function() {
    var d = new Date();
    var mo = twoPlaces(d.getMonth() + 1);
    var day = twoPlaces(d.getDate());
    var h = twoPlaces(d.getHours());
    var min = twoPlaces(d.getMinutes());
    var arr = [d.getFullYear(), mo, day, h, min, exports.IID(2)];
    return arr.join('-');
    function twoPlaces(v) {
        return v < 10 ? ('0' + v) : v;
    }
};
exports.IID = function(len) {
    var c = exports.malloc('__GEN');
    len = parseInt(len);
    len = isNaN(len) ? 3 : len;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var num = chars.length;
    var prefix = 'SID_' + len;
    if (c(prefix)) {
        var l = c(prefix).len;
        var arr = c(prefix).arr;
        var b = '';
        for (i = 0; i < l; i++) {
            b += chars[arr[i]];
        }
        var end = l - 1;
        var pointer = c(prefix).pointer;
        var shifted = false;
        var last = arr[end];
        if (last == (num - 1)) {
            while (arr[pointer] == (num - 1)) {
                arr[pointer] = 0;
                pointer--;
            }
            if (pointer != -1) {
                arr[pointer] = (arr[pointer] + 1) % num;
            }
            pointer = end;
            shifted = true;
        }
        if (!shifted) {
            arr[pointer] = (arr[pointer] + 1) % num;
        }
        c(prefix).arr = arr;
        c(prefix).pointer = pointer;
        return b;
    }
    else {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr[i] = 0;
        }
        c(prefix, {
            len: len,
            arr: arr,
            pointer: len - 1
        });
        return exports.IID(len);
    }
};
