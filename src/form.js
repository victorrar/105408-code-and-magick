'use strict';
var browserCookies = require('browser-cookies');

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var rate = document.querySelector('.review-form-group-mark');
  var recall = document.querySelector('textarea[name="review-text"]');
  var recallLabel = document.querySelector('.review-fields-label.review-fields-text');
  var name = document.querySelector('input[name="review-name"]');
  var nameLabel = document.querySelector('.review-fields-label.review-fields-name');
  var submit = document.querySelector('.review-submit');
  var thisForm = document.querySelector('.review-form');
  var rateValue;
  var rateChecked;

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      getFormCookies();
      name.oninput();
      rate.onchange();
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      setFormCookies();
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };


  rate.onchange = function() {
    rateChecked = document.querySelector('input[name="review-mark"]:checked');
    rateValue = rateChecked.value;
    checkLabel(rateValue < 3 && !recall.value, recallLabel);
  };
  recall.oninput = function() {
    checkLabel(rateValue < 3 && !recall.value, recallLabel);
  };
  name.oninput = function() {
    name.value = name.value.trim();
    checkLabel(!name.value, nameLabel);
  };
  thisForm.onsubmit = function() {
    setFormCookies();
  };

  function checkLabel(stat, label) {
    if(stat) {
      label.classList.remove('invisible');
    } else{
      label.classList.add('invisible');
    }
    var reviewFields = document.querySelector('.review-fields');
    var reviewFieldsLabels = document.querySelectorAll('.review-fields-label');
    var reviewFieldsInvisble = document.querySelectorAll('.review-fields-label.invisible');
    if(reviewFieldsLabels.length === reviewFieldsInvisble.length) {
      reviewFields.classList.add('invisible');
      submit.removeAttribute('disabled');
    } else {
      reviewFields.classList.remove('invisible');
      submit.setAttribute('disabled', '');
    }
  }

  function setFormCookies() {
    var expiresDate;
    var now = new Date();
    var birthday = new Date(now.getFullYear(), 11, 9);
    if(now < birthday) {
      birthday = new Date(now.getFullYear() - 1, 11, 9);
    }
    expiresDate = new Date(2 * now - birthday);
    browserCookies.set('review-name', name.value, {expires: expiresDate});
    browserCookies.set('review-mark', rateChecked.value, {expires: expiresDate});
  }
  function getFormCookies() {
    name.value = browserCookies.get('review-name');
    var mark = browserCookies.get('review-mark') || 3;
    document.querySelector('#review-mark-' + mark ).checked = true;

  }

  rate.onchange();
  name.oninput();
  return form;
})();
