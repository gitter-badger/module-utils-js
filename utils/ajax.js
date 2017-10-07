exports.ajax = function(obj) {
    var xhr = new XMLHttpRequest();
    var res = null;
    var json = 'application/json';
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (obj.header['Accept' === json]) {
                    try {
                        res = JSON.parse(xhr.responseText);
                    } catch (err) {
                        console.warn('Ajax: Unable to parse success server response to JSON.');
                        obj.error(null, xhr);
                    }
                }
                else {
                    res = xhr.responseText;
                }
                obj.success(res, xhr);
            } else {
                if (obj.header['Accept'] === json) {
                    try {
                        res = JSON.parse(xhr.responseText);
                    } catch (err) {
                        console.warn('Ajax: Unable to parse error server response to JSON.');
                        obj.error(null, xhr);
                    }
                }
                else {
                    res = xhr.responseText;
                }
                obj.error(res, xhr);
            }
        }
    };
    xhr.upload.onprogress = function(state) {
        if (state.lengthComputable) {
            var percentage = (state.loaded / state.total) * 100;
            obj.progress(percentage.toFixed(2));
        }
    };
    xhr.onerror = function() {
        console.warn('Ajax: Unexpected ajax error.');
    };
    xhr.open(obj.method, url, true);
    for (var k in obj.header) {
        var v = obj[k];
        xhr.setRequestHeader(k, v);
    }
    xhr.send(obj.data);
}
