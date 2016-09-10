'use strict';
define([
  './form',
  './game',
  './reviews',
  './gallery'
], function(form, game, reviews, GalleryModule) {
  var photoGallery = document.querySelector('.photogallery');
  var photos = photoGallery.querySelectorAll('a img');
  var photoLinks = photoGallery.querySelectorAll('a');
  var links = [];
  photos.forEach(function(elem, index) {
    links[index] = elem.src;
  });
  var gallery = new GalleryModule(links);
  photoLinks.forEach(function(elem, index) {
    elem.onclick = function() {
      gallery.show(index);
    };
  });
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
})();
