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
 * @param {String} selector
 * @param {Element} [parent]
 */
exports.domFind = function(selector, parent) { // SaltJS
    var el = (parent && exports.isDomEl(parent)) ? parent : document;
    var op = null;
    var type = selector[0];
    var map = {
        '#': 'getElementById',
        '.': 'getElementsByClassName',
        '=': 'getElementsByTagName',
        '*': 'querySelectorAll'
    };
    var op = map[type];
    if (!op) {
        return [];
    }
    var arr = document[op](selector.slice(1));
    if (type == '#') {
        return arr || null;
    }
    return Array.isArray(arr) ? arr : [];
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
exports.domAddClass = function(el, name) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (el.classList) {
        el.classList.add(name);
    }
    else {
        el.className += ' ' + name;
    }
};
exports.domRemoveClass = function(el, name) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (el.classList) {
        el.classList.remove(name);
    }
    else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
},
exports.domToggleClass = function(el, name) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    el.classList.toggle(className);
};
exports.domAttr = function(el, k, v) {
    if (!el || !exports.isDomEl(el) || !k) {
        throw new Error('invalidParameter');
    }
    if (v === undefined) {
        return el.getAttribute(k);
    }
    else {
        el.setAttribute(k, v);
    }
};
exports.domData = function(el, k, v) {
    if (!el || !exports.isDomEl(el) || !k) {
        throw new Error('invalidParameter');
    }
    if (v === undefined) {
        return el.dataset[k];
    }
    else {
        el.dataset[k] = v;
    }
};
exports.domHtml = function(el, str) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (typeof(str) == 'string') {
        el.innerHTML = str;
    }
    else {
        return el.innerHTML;
    }
};
exports.domText = function(el, str) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (typeof(str) == 'string') {
        el.textContent = str;
    }
    else {
        return el.textContent;
    }
};
exports.domParent = function(el) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    return el.parentNode || null;
};
exports.domChildren = function(el) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    return Array.isArray(el.children) ? el.children : [];
};
exports.domSiblings = function(el) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    var arr = (el.parentNode && Array.isArray(el.parentNode.children)) ? el.parentNode.children : [];
    var acc = [];
    for (var i = 0; i < arr.length; i++) {
        var ch = arr[i];
        if (ch !== el) {
            acc.push(ch);
        }
    }
    return acc;
};
exports.domFadeIn = function(el, t) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 1000);
    el.style.opacity = '0';
};
exports.domFadeOut = function(el, t) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 1000);
    el.style.opacity = '1';
};
exports.domFadeTo = function(el, o, t) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    if (!o || isNaN(o) || o > 100 || o < 0) {
        throw new Error('invalidParameter');
    }
    el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 1000);
    el.style.opacity = o.toString();
};
exports.domFadeToggle = function(el, t) {
    if (!el || !exports.isDomEl(el)) {
        throw new Error('invalidParameter');
    }
    el.style.transition = 'opacity ' + (t && !isNaN(t) && t > 0 ? t : 1000);
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
// exports.domOn = function(selector, eventName, eventHandler) {
//     el.addEventListener(eventName, eventHandler); // FIND ELEMENTS AND ADD
// };
// exports.domOff = function(selector, eventName, eventHandler) {
//     el.removeEventListener(eventName, eventHandler); // FIND ELEMENTS AND REMOVE
// };
// exports.domTrigger = function(slug, data) {
//     var e = null;
//     if (window.CustomEvent) {
//         var e = new CustomEvent(slug, {detail: data});
//     };
//     if (!e) {
//         e = document.createEvent('CustomEvent');
//         e.initCustomEvent(slug, true, true, data);
//     }
//     el.dispatchEvent(event);
// }
// exports.domTriggerNativeEvent = function(slug, data) {
//     var event = document.createEvent('HTMLEvents');
//     event.initEvent('change', true, false);
//     el.dispatchEvent(event);
// }
