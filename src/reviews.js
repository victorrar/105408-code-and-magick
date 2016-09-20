'use strict';
var requestPath = '/api/reviews';
var container = document.querySelector('.reviews-list');

var reviews;


define([
  './review',
  './load'
],
  function(Review, load) {
    //отображение отзывов
    var reviewsDelete = [];
    var save = function(data) {
      if(data.length < PAGE_SIZE) {
        moreReviews.classList.add('invisible');
      }
      reviews = data;
      reviews.forEach(function(elem, index) {
        var reviewObj = new Review(elem);
        reviewsDelete[index] = reviewObj.remove;
        container.appendChild(reviewObj.element);
      });
    };

    var moreReviews = document.querySelector('.reviews-controls-more');
    moreReviews.classList.remove('invisible');
    var filterBlock = document.querySelector('.reviews-filter');
    var PAGE_SIZE = 3;
    var filterFromStorage = localStorage.getItem('filter') || 'reviews-all';
    document.getElementById(filterFromStorage).checked = true;
    var requestSettings = {
      from: 0,
      to: PAGE_SIZE,
      filter: filterFromStorage
    };

    var loadMore = function() {
      requestSettings.from += PAGE_SIZE;
      requestSettings.to += PAGE_SIZE;

      load(requestPath, requestSettings, save);
    };
    var changeFilter = function(evt) {
      moreReviews.classList.remove('invisible');
      requestSettings = {
        from: 0,
        to: PAGE_SIZE,
        filter: evt.target.id,
      };
      localStorage.setItem('filter', evt.target.id);
      container.innerHTML = '';
      reviewsDelete.forEach(function(elem) {
        elem();
      });
      load(requestPath, requestSettings, save);
    };
    moreReviews.addEventListener('click', loadMore);
    filterBlock.addEventListener('change', changeFilter, true);

    load(requestPath, requestSettings, save);

  }
);
