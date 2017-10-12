exports.__domInternal = {
    handler: {}
};
exports.domReady = function(fn) {
    if (document.attachEvent ? (document.readyState === "complete") : (document.readyState !== "loading")) {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
exports.isDomEl = function(el) {
    return (el instanceof Element);
};
/**
 * @param {String} sel
 * @param {Element} el
 * @returns {Array}
 */
exports.domFind = function(sel, el) {
    var list = null;
    if (!sel || typeof(sel) !== 'string') {
        throw new Error('invalidParameter');
    }
    if (el && exports.isDomEl(el)) {
        list = el.querySelectorAll(sel);
    }
    else {
        list = document.querySelectorAll(sel);
    }
    if (list) {
        if (selectingOne(sel)) {
            return list[0] || null;
        }
        else {
            var arr = [];
            var len = list.length;
            arr.length = len;
            for (var i = 0; i < len; i++) {
                if (list[i]) {
                    arr[i] = list[i];
                }
            }
            return arr;
        }
    }
    else {
        if (selectingOne(sel)) {
            return null;
        }
        return [];
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domHasClass = function(el, name) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (el.classList) {
        return el.classList.contains(name);
    }
    else {
        var exp = new RegExp('(^| )' + name + '( |$)', 'gi');
        return exp.test(el.className);
    }
};
exports.domAddClass = function(sel, v) {
    if (!v || typeof(v) !== 'string') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            var clas = v.split(/\s+/);
            var lenlen = clas.length;
            for (var j = 0; j < lenlen; j++) {
                var cla = clas[j];
                addClass(el, cla);
            }
        }
    }
    function addClass(el, v) {
        if (el.classList) {
            el.classList.add(v);
        }
        else {
            el.className += ' ' + v;
        }
    }
};
exports.domRemoveClass = function(sel, v) {
    if (!sel || !v || typeof(v) !== 'string') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            var clas = v.split(/\s+/);
            var lenlen = clas.length;
            for (var j = 0; j < lenlen; j++) {
                var cla = clas[j];
                removeClass(el, cla);
            }
        }
    }
    function removeClass(el, v) {
        if (el.classList) {
            el.classList.remove(v);
        }
        else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
},
exports.domToggleClass = function(sel, v) {
    if (!v || typeof(v) !== 'string') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            var clas = v.split(/\s+/);
            var lenlen = clas.length;
            for (var j = 0; j < lenlen; j++) {
                var cla = clas[j];
                toggleClass(el, cla);
            }
        }
    }
    function toggleClass(el, v) {
        el.classList.toggle(v);
    }
};
exports.domVal = function(sel, v) {
    if (v && typeof(v) !== 'string' && isNaN(v)) {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getVal(el));
            }
            else {
                setVal(el, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getVal(el) {
        return el.value || null;
    }
    function setVal(el, v) {
        if (v === undefined) {
            return el.value;
        }
        else {
            el.value = v;
        }
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domAttr = function(sel, k, v) {
    if (!k || typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    if (v && typeof(v) !== 'string' && isNaN(v) && typeof(v) !== null) {
        throw new Error('invalidParameter')
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getAttr(el, k));
            }
            else {
                setAttr(el, k, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getAttr(el, k) {
        return el.getAttribute(k) || null;
    }
    function setAttr(el, k, v) {
        el.setAttribute(k, v);
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domData = function(sel, k, v) {
    if (!k || typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    try {
        v = normalizeVal(v);
    } catch (err) {
        throw new Error('unableToParse');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getData(el, k));
            }
            else {
                setData(el, k, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getData(el, k) {
        return el.dataset[k] || null;
    }
    function setData(el, k, v) {
        el.dataset[k] = v;
    }
    function normalizeVal(v) {
        if (v === undefined) {
            return undefined;
        }
        else if (typeof(v) === 'string') {
            return v;
        }
        else if (typeof(v) === 'object') {
            if (!v) {
                return null;
            }
            try {
                return JSON.stringify(v);
            } catch (err) {
                throw new Error('invalidParameter');
            }
        }
        else if (v && typeof(v.toString) == 'function') {
            return v.toString();
        }
        else {
            throw new Error('invalidParameter');
        }
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domHtml = function(sel, v) {
    if (v && typeof(v) !== 'string') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getHtml(el));
            }
            else {
                setHtml(el, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getHtml(el) {
        return el.innerHTML || null;
    }
    function setHtml(el, v) {
        el.innerHTML = v;
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domText = function(sel, v) {
    if (v && typeof(v) !== 'string') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getText(el));
            }
            else {
                setText(el, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getText(el) {
        return el.textContent || null;
    }
    function setText(el, v) {
        el.textContent = v;
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domParent = function(sel) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (el) {
                arr.push(getParent(el));
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getParent(el) {
        return el.parentNode || null;
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domChildren = function(sel) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el) {
                arr.push(getChildren(el));
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getChildren(el) {
        var els = el.children || [];
        var arr = [];
        for (var i = 0; i < els.length; i++) {
            arr[i] = els[i];
        }
        return arr;
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domSiblings = function(sel) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (el) {
                arr.push(getSiblings(el));
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getSiblings(el) {
        var els = (el.parentNode && el.parentNode.children) ? el.parentNode.children : [];
        var arr = [];
        for (var i = 0; i < els.length; i++) {
            var ch = els[i];
            if (ch !== el) {
                arr.push(ch);
            }
        }
        return arr;
    }
};
exports.domStyle = function(sel, k, v) {
    if (!k || typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    if (v && typeof(v) !== 'string') {
        throw new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    var arr = [];
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el) {
                continue;
            }
            if (v === undefined) {
                arr.push(getStyle(el, k));
            }
            else {
                setStyle(el, k, v);
            }
        }
    }
    return selectingOne(sel) ? arr[0] : arr;
    function getStyle(el, k) {
        return el.style[k] || null;
    }
    function setStyle(el, k, v) {
        el.style[k] = v;
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domFadeIn = function(sel, t) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el) {
                fadeIn(el, t);
            }
        }
    }
    function fadeIn(el, t) {
        el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 250) + 'ms';
        el.style.opacity = '0';
    }
    function selectingOne(sel) {
        var parts = sel.split(/\s+/);
        return (parts && parts.length == 1 && parts[0][0] == '#');
    }
};
exports.domFadeOut = function(el, t) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
        els = Array.isArray(els) ? els : [els];
    }
    if (Array.isArray(els)) {
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el) {
                fadeOut(el, t);
            }
        }
    }
    function fadeOut(el, t) {
        el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 250) + 'ms';
        el.style.opacity = '1';
    }
};
exports.domFadeTo = function(sel, o, t) {
    if (!o || isNaN(o) || o > 100 || o < 0) {
        throw new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el) {
                fadeTo(el, o, t);
            }
        }
    }
    function fadeTo(el, o, t) {
        el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 250) + 'ms';
        el.style.opacity = o.toString();
    }
};
exports.domFadeToggle = function(sel, t) {
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el) {
                fadeToggle(el);
            }
        }
    }
    function fadeToggle(el) {
        el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 250) + 'ms';
        var s = el.ownerDocument.defaultView.getComputedStyle(el, null);
        var o = (!s) ? null : s.opacity;
        if (o === null) {
            return;
        }
        if (o === '1') {
            el.style.opacity = '0';
        }
        else {
            el.style.opacity = '1';
        }
    }
};
exports.domOn = function(sel, k, fn) {
    if (!k || typeof(k) !== 'string' || typeof(fn) !== 'function') {
        return new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (el) {
                addListener(el, k, fn);
            }
        }
    }
    function addListener(el, k, fn) {
        if (!exports.__domInternal.handler[el]) {
            exports.__domInternal.handler[el] = {};
        }
        if (!exports.__domInternal.handler[el][k]) {
            exports.__domInternal.handler[el][k] = []; // Multiple handlers can be associated to one dom element.
        }
        exports.__domInternal.handler[el][k].push(fn);
        el.addEventListener(k, fn, false);
    }
};
exports.domOff = function(sel, k) { // https://stackoverflow.com/a/4386514
    if (k && typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (el) {
                removeListener(el, k || null);
            }
        }
    }
    function removeListener(el, k) {
        if (!exports.__domInternal.handler[el]) {
            return;
        }
        if (k && exports.__domInternal.handler[el][k]) { // Remove handlers by type.
            var fns = exports.__domInternal.handler[el][k];
            var len = fns.length;
            for (var i = 0; i < len; i++) {
                var fn = fns[i];
                el.removeEventListener(k, fn, false);
            }
        }
        else { // Remove all handlers.
            var sub = el.cloneNode(true);
            el.parentNode.replaceChild(sub, el);
        }
    }
};
exports.domTriggerNativeEvent = function(sel, k) {
    if (!k || typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (el) {
                triggerEvent(el, k);
            }
        }
    }
    function triggerEvent(el, k) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(k, true, false);
        el.dispatchEvent(e);
    }
};
exports.domTriggerEvent = function(sel, k, v) {
    if (!k || typeof(k) !== 'string') {
        throw new Error('invalidParameter');
    }
    var els = null;
    if (Array.isArray(sel)) {
        els = sel;
    }
    else if (exports.isDomEl(sel)) {
        els = [sel];
    }
    else {
        els = exports.domFind(sel);
    }
    if (Array.isArray(els)) {
        var len = els.length;
        for (var i = 0; i < len; i++) {
            var el = els[i];
            if (el) {
                triggerEvent(el, k, v)
            }
        }
    }
    function triggerEvent(el, k, v) {
        var e = null;
        if (window.CustomEvent) {
            e = new CustomEvent(k, {
                detail: v
            });
        } else {
            e = document.createEvent('CustomEvent');
            e.initCustomEvent(k, true, true, v);
        }
        el.dispatchEvent(e);
    }
};
