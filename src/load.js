'use strict';
define(
  function() {
    return requestRewiews;
  }
);

function requestRewiews(src, cb, cbName) {
  window[cbName] = function(data) {
    if(typeof cb === 'function') {
      cb(data);
    }
  };
  var elem = document.createElement('script');
  elem.src = src;
  document.head.appendChild(elem);
}
