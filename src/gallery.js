'use strict';
var galleryElement = document.querySelector('.overlay-gallery');
var galleryNumberCurrent = document.querySelector('.preview-number-current');
var galleryNumberTotal = document.querySelector('.preview-number-total');
var galleryClose = document.querySelector('.overlay-gallery-close');
var galleryControlLeft = document.querySelector('.overlay-gallery-control-left');
var galleryControlRight = document.querySelector('.overlay-gallery-control-right');
var galleryPreview = document.querySelector('.overlay-gallery-preview');
var self;
var picturesCount;
var Gallery = function(dataArray) {
  self = this;
  this.pictures = dataArray;
  picturesCount = dataArray.length;
  this.activePicture = 0;
  //Ссылки на DOM-элементы:
  this.galleryElement = galleryElement;
  this.galleryNumberCurrent = galleryNumberCurrent;
  this.galleryNumberTotal = galleryNumberTotal;
  this.galleryClose = galleryClose;
  this.galleryControlLeft = galleryControlLeft;
  this.galleryControlRight = galleryControlRight;
  this.galleryNumberTotal.innerHTML = picturesCount;
};

Gallery.prototype = {
  show: function(number) {
    self.galleryClose.onclick = function() {
      self.hide();
    };
    self.galleryControlLeft.onclick = function() {
      if(self.activePicture > 0) {
        self.setActivePicture(self.activePicture - 1);
      }
    };
    self.galleryControlRight.onclick = function() {
      if(self.activePicture < picturesCount - 1) {
        self.setActivePicture(self.activePicture + 1);
      }
    };
    self.galleryElement.classList.remove('invisible');
    self.setActivePicture(number);
  },
  hide: function() {
    self.galleryElement.classList.add('invisible');
    //self.galleryElement.onclick = null;
  },
  setActivePicture: function(number) {
    self.activePicture = number;
    var picture = new Image();
    picture.src = self.pictures[number];
    var oldImage = galleryPreview.querySelector('img');
    if(oldImage) {
      galleryPreview.replaceChild(picture, oldImage);
    } else {
      galleryPreview.appendChild(picture);
    }
    self.galleryNumberCurrent.innerHTML = number + 1;
  }
};

define(function() {
  return Gallery;
});
