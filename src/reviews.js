'use strict';
var callbackName = '_jsonpCallback';
function requestRewiews(src, cb) {
  window[callbackName] = function(data) {
    if(typeof cb === 'function') {
      cb(data);
    }
  };
  var elem = document.createElement('script');
  elem.src = src;
  document.head.appendChild(elem);
}
var reviews;
function save(data) {
  reviews = data;
}
var requestPath = 'http://localhost:1506/api/reviews?callback=' + callbackName;
requestRewiews(requestPath, save);
