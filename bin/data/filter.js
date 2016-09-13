'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      return list;

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
      return recentList;

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
      return goodList;

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
      return badList;

    case 'reviews-popular':
      list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      return list;
    default:
  }
  return list;
};
