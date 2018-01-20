exports.ajax = function(obj) {
    var xhr = new XMLHttpRequest();
    var res = null;
    var json = 'application/json';
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (obj.header['Accept'] === json) {
                try {
                    res = JSON.parse(xhr.responseText);
                } catch (err) {
                    console.warn('Ajax: Unable to parse server response to JSON.');
                    obj.error(null, xhr);
                }
            }
            else {
                res = xhr.responseText;
            }
            if (xhr.status === 200) {
                obj.success(res, xhr);
            } else {
                obj.error(res, xhr);
            }
            obj.always(res, xhr);
        }
    };
    xhr.upload.onprogress = function(state) {
        if (state.lengthComputable) {
            var percentage = (state.loaded / state.total) * 100;
            obj.progress(percentage.toFixed(0));
        }
    };
    xhr.onerror = function() {
        console.warn('Ajax: Unexpected ajax error.');
    };
    xhr.open(obj.method, url, true);
    for (var k in obj.header) {
        var v = obj.header[k];
        xhr.setRequestHeader(k, v);
    }
    xhr.send(obj.data);
};
