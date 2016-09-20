'use strict';
var optimizeThrottle;
define([
  './form',
  './game',
  './reviews',
  './gallery',
  './throttle'
], function(form, game, reviews, GalleryModule, throttle) {
  optimizeThrottle = throttle;
  var photoGallery = document.querySelector('.photogallery');
  var photos = photoGallery.querySelectorAll('a img');
  var photoLinks = photoGallery.querySelectorAll('a');
  var links = [];
  var photosLength = photos.length;
  for(var i = 0; i < photosLength; i++) {
    links[i] = photos[i].src;
  }
  var gallery = new GalleryModule(links);
  var photolinksLength = photoLinks.length;
  for(var index = 0; index < photolinksLength; index++) {
    (function(currentPhoto) {
      photoLinks[index].onclick = function() {
        gallery.show(currentPhoto);
      };
    })(index);
  }
}
);

(function() {
  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };


  var demoVisibilityFlag = true;
  var demo = document.querySelector('.demo');
  function demoVisiblityCheck() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //demo
    if(scrollTop > (demo.offsetTop + demo.offsetHeight) && demoVisibilityFlag) {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      demoVisibilityFlag = false;
    }
    if(scrollTop < (demo.offsetTop + demo.offsetHeight) && !demoVisibilityFlag) {
      demoVisibilityFlag = true;
    }
  }
  var optimizedDemoVisibilityCheck = optimizeThrottle(demoVisiblityCheck, 100);

  window.addEventListener('scroll', optimizedDemoVisibilityCheck);
})();
