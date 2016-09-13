'use strict';
define(
  function() {
    return requestRewiews;
  }
);

function requestRewiews(src, dataObject, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', src +
  '?from=' + dataObject.from +
  '&to=' + dataObject.to +
  '&filter=' + dataObject.filter);
  xhr.onload = function() {
    if(typeof cb === 'function') {
      cb(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();

}
