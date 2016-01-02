var app = (function() {
  "use strict";

  //Bind events to functions
  function bindEvents() {
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('loadpictures', onLoadPictures, false);
  }

  //Handling onLoadPictures event
  function onLoadPictures() {
    receivedEvent('loadpictures');
    pictureList.loadPictures();
  }

  //Handling onDeviceReady event
  function onDeviceReady() {
    console.log('deviceready');

    //Initialize the pictureManager
    pictureManager.initialize();

    // Initially load pictures
    pictureList.loadPictures();
  }

  function receivedEvent(msg) {
    console.log('Received event: ' + msg);
  }

  // Public functions
  return {
    //Initialization of the app
    initialize: function() {
      bindEvents();

      //Trigger loadpictures event every 5 seconds
      setInterval(function() {
        util.trigger('loadpictures');
      }, 5000);
    },
    takePicture: function() {
      console.log('takePicture');

      //What should happen when taking the picture succeeded
      var onPictureDataSuccess = function(newPictureUrl) {
          modalWindow.setPicture(newPictureUrl);
          modalWindow.open();
          pictureManager.currentPictureURI = newPictureUrl;
        },
        //What should happen when taking the picture fails
        onPictureDataFail = function(message) {
          console.log('onPhotoDataFail ' + message);
          alert('Sorry, an error occurred while taking the picture.');
        };

      //call the pictureManager to take the picture
      pictureManager.takePicture(onPictureDataSuccess, onPictureDataFail);
    },
    uploadPicture: function() {
      console.log('uploadPicture');

      modalWindow.enableUploadState();

      //What should happen when taking the picture succeeded
      var onPictureUploadSuccess = function(response) {
          // Log Messages
          console.log("Picture upload succeeded.");
          console.log("Code = " + response.responseCode);
          console.log("Response = " + response.response);
          console.log("Sent = " + response.bytesSent);

          // Close Modal Window
          modalWindow.disableUploadState();
          modalWindow.close();
        },
        //What should happen when taking the picture fails
        onPictureUploadFail = function(message) {
          console.log("Picture upload failed.");
          console.log('error: ');
          console.log(message);
          modalWindow.disableUploadState();
          modalWindow.close();
          alert('Sorry, an error occurred while uploading the picture.');
        };

      //call the pictureManager to upload the picture
      pictureManager.uploadPicture(onPictureUploadSuccess, onPictureUploadFail);
    }
  }
})(pictureManager, pictureList, util, modalWindow);
