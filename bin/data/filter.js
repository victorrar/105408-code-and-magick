'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      break;

    case 'reviews-recent':
      var recentList = list.filter(function(elem) {
        if(elem.created + 1000 * 60 * 60 * 24 * 3 < Date.now()) {
          return true;
        } else {
          return false;
        }
      });
      recentList.sort(function(a, b) {
        return a.created - b.created;
      });
      list = recentList;
      break;

    case 'reviews-good':
      var goodList = list.filter(function(elem) {
        if(elem.rating >= 3) {
          return true;
        } else {
          return false;
        }
      });
      goodList.sort(function(a, b) {
        return b.rating - a.rating;
      });
      list = goodList;
      break;

    case 'reviews-bad':
      var badList = list.filter(function(elem) {
        if(elem.rating < 3) {
          return true;
        } else {
          return false;
        }
      });
      badList.sort(function(a, b) {
        return a.rating - b.rating;
      });
      list = badList;
      break;

    case 'reviews-popular':
      list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    default:
  }
  return list;
};
