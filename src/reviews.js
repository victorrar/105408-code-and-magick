'use strict';
var callbackName = '_jsonpCallback';
var requestPath = 'http://localhost:1506/api/reviews?callback=' + callbackName;

var reviews;


function initializeReviews() {



  var filter = document.querySelector('.reviews-filter');
  filter.classList.add('invisible');
  filter.classList.remove('invisible');

}

define([
  './review',
  './load'
],
  function(review, load) {
    var save = function(data) {
      reviews = data;
      reviews.forEach(review);
    };
    load(requestPath, save, callbackName);

  }
);

initializeReviews();
