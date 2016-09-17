'use strict';

//поиск шаблона

var elementToClone;
var template = document.querySelector('#review-template');
if ('content' in template) {
  elementToClone = template.content.querySelector('.review');
} else {
  elementToClone = template.querySelector('.review');
}

function drawElement(data) {
  var element = elementToClone.cloneNode(true);
    //отзыв
  element.querySelector('.review-text').textContent = data.description;
    //рейтинг
  var star = element.querySelector('.review-rating');
  var rating = data.rating;
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
  photo.src = data.author.picture;
  // обработчики событий
  var reviewQuizAnswer = element.querySelectorAll('.review-quiz-answer');
  var reviewQuizAnswerLength = reviewQuizAnswer.length;
  for(var i = 0; i < reviewQuizAnswerLength; i++) {
    var elem = reviewQuizAnswer[i];
    elem.onclick = function() {
      var oldReviewQuiz = element.querySelector('.review-quiz-answer-active');
      if(oldReviewQuiz) {
        oldReviewQuiz.classList.remove('review-quiz-answer-active');
      }
      this.classList.add('review-quiz-answer-active');
    };
  }

  return element;

}
var Review = function(data) {
  console.log(this);
  this.data = data;
  this.element = drawElement(data);
  this.remove = this.remove.bind(this);
};
Review.prototype = {
  remove: function() {
    var reviewQuizAnswer = this.element.querySelectorAll('.review-quiz-answer');
    var reviewQuizAnswerLength = reviewQuizAnswer.length;
    for(var i = 0; i < reviewQuizAnswerLength; i++) {
      reviewQuizAnswer[i].onclick = null;
    }
  }
};

define(function() {
  return Review;
});
