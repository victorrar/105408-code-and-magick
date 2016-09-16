'use strict';
define(function() {
  return trottle;
});

function trottle(func, delay) {
  var lastDate = 0;
  var optimizedFunc = function() {
    if(Date.now() - lastDate >= delay) {
      func();
    lastDate = Date.now();
    }
  };
  return optimizedFunc;
}
