exports.TID = (function(places) { // GENERATE UNIQUE IDS WITHIN ONE APP RUN (https://stackoverflow.com/a/6249043)
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var num = chars.length;
    var len = 3;
    var end = len - 1;
    var arr = [];
    var pointer = end;
    var i;
    for (i = 0; i < len; i++) {
        arr[i] = 0;
    }
    return function() {
        var shifted = false;
        var last = arr[end];
        var id = '';
        for (i = 0; i < len; i++) {
            id += chars[arr[i]];
        }
        if (last == (num - 1)) {
            while (arr[pointer] == (num - 1)) {
                arr[pointer] = 0;
                pointer--;
            }
            if (pointer != -1) {
                arr[pointer] = (arr[pointer] + 1) % num
            }
            pointer = end;
            shifted = true;
        }
        if (!shifted) {
            arr[pointer] = (arr[pointer] + 1) % num
        }
        return id;
    };
})();
exports.UID = function() {
    return Math.ceil(Date.now() / 1000) + '-' + U.TID();
};
