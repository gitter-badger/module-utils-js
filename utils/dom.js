// exports.HTMLElementAsString = function(selector, data, attributes, inner) {

// };
// exports.domReady = function(fn) {
//     if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
//         fn();
//     } else {
//         document.addEventListener('DOMContentLoaded', fn);
//     }
// };
// exports.domQuery = function(selector) {

// };
// exports.domAddClass = function(selector, classesAsString) {

// },
// exports.domRemoveClass = function(selector, classesAsString) {

// },
// exports.domAddEventListener = function(selector, eventName, eventHandler) {
//     el.addEventListener(eventName, eventHandler); // FIND ELEMENTS AND ADD
// };
// exports.domRemoveEventListener = function(selector, eventName, eventHandler) {
//     el.removeEventListener(eventName, eventHandler); // FIND ELEMENTS AND REMOVE
// };
// exports.domTriggerCustomEvent = function(slug, data) {
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
