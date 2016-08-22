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

function initializeReviews() {
  var reviews;
  var elementToClone;
  var container = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  if ('content' in template) {
    elementToClone = template.content.querySelector('.review');
  } else {
    elementToClone = template.querySelector('.review');
  }

  function save(data) {
    reviews = data;

    reviews.forEach(function(reviewObject) {
      var element = elementToClone.cloneNode(true);
      //отзыв
      element.querySelector('.review-text').textContent = reviewObject.description;
      //рейтинг
      var star = element.querySelector('.review-rating');
      var rating = reviewObject.rating;
      var starcount;
      switch (rating) {
        case 2:
          starcount = 'review-rating-two';
          break;
        case 3:
          starcount = 'review-rating-three';
          break;
        case 4:
          starcount = 'review-rating-four';
          break;
        case 5:
          starcount = 'review-rating-five';
          break;
      }
      if (starcount) {
        star.classList.add(starcount);
      }
      //фото
      var photo = new Image(124, 124);
      var templatePhoto = element.querySelector('.review-author');
      photo.onload = function() {
        clearTimeout(photoTimeout);
        templatePhoto.src = photo.src;
        templatePhoto.setAttribute('width', '124px');
        templatePhoto.setAttribute('heigth', '124px');
      };
      photo.onerror = function() {
        element.classList.add('review-load-failure');
      };
      var PHOTO_TIMEOUT = 10000;
      var photoTimeout = setTimeout(function() {
        photo.src = '';
        element.classList.add('review-load-failure');
      }, PHOTO_TIMEOUT);
      photo.src = reviewObject.author.picture;

      container.appendChild(element);
    });
  }

  var requestPath = 'http://localhost:1506/api/reviews?callback=' + callbackName;
  var filter = document.querySelector('.reviews-filter');
  filter.classList.add('invisible');
  requestRewiews(requestPath, save);
  filter.classList.remove('invisible');

}
initializeReviews();
