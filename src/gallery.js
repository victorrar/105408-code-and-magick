'use strict';
var galleryElement = document.querySelector('.overlay-gallery');
var galleryNumberCurrent = document.querySelector('.preview-number-current');
var galleryNumberTotal = document.querySelector('.preview-number-total');
var galleryClose = document.querySelector('.overlay-gallery-close');
var galleryControlLeft = document.querySelector('.overlay-gallery-control-left');
var galleryControlRight = document.querySelector('.overlay-gallery-control-right');
var galleryPreview = document.querySelector('.overlay-gallery-preview');
var picturesCount;
var Gallery = function(dataArray) {
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
    this.galleryClose.onclick = (function() {
      this.hide();
    }).bind(this);
    this.galleryControlLeft.onclick = (function() {
      if(this.activePicture > 0) {
        this.setActivePicture(this.activePicture - 1);
      }
    }).bind(this);
    this.galleryControlRight.onclick = (function() {
      if(this.activePicture < picturesCount - 1) {
        this.setActivePicture(this.activePicture + 1);
      }
    }).bind(this);
    this.galleryElement.classList.remove('invisible');
    this.setActivePicture(number);
  },
  hide: function() {
    this.galleryElement.classList.add('invisible');
    this.galleryClose.onclick = null;
    this.galleryControlLeft.onclick = null;
    this.galleryControlRight.onclick = null;
  },
  setActivePicture: function(number) {
    this.activePicture = number;
    var picture = new Image();
    picture.src = this.pictures[number];
    var oldImage = galleryPreview.querySelector('img');
    if(oldImage) {
      galleryPreview.replaceChild(picture, oldImage);
    } else {
      galleryPreview.appendChild(picture);
    }
    this.galleryNumberCurrent.innerHTML = number + 1;
  }
};

define(function() {
  return Gallery;
});
