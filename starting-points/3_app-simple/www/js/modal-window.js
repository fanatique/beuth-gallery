var modalWindow = (function() {
  "use strict";

  var modalWindow = null,
  loaderModalWindow = null;

  function getModalWindow() {
    if (modalWindow === null) {
      modalWindow = document.getElementById('newPictureModal');
    }
    return modalWindow;
  }

  function getLoaderModalWindow() {
    if (loaderModalWindow === null) {
      loaderModalWindow = document.getElementById('loaderModal');
    }
    return loaderModalWindow;
  }

  return {
    open: function() {
      if (!util.hasClass(getModalWindow(), 'active')) {
        util.addClass(getModalWindow(), 'active');
      }
    },
    close: function() {
      if (util.hasClass(getLoaderModalWindow(), 'active')) {
        util.removeClass(getLoaderModalWindow(), 'active');
      }

      if (util.hasClass(getModalWindow(), 'active')) {
        util.removeClass(getModalWindow(), 'active');
      }
    },
    setPicture: function(pictureURI) {
      getModalWindow().querySelector('#theNewPicture').src = pictureURI;
    },
    disableUploadState: function () {
      if (util.hasClass(getLoaderModalWindow(), 'active')) {
        util.removeClass(getLoaderModalWindow(), 'active');
      }
      getModalWindow().querySelector('button').disabled = false;
    },
    enableUploadState: function () {
      if (!util.hasClass(getLoaderModalWindow(), 'active')) {
        util.addClass(getLoaderModalWindow(), 'active');
      }
      getModalWindow().querySelector('button').disabled = true;
    }
  };
})(util);
