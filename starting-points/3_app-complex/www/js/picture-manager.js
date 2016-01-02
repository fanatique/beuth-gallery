var pictureManager = (function() {
  "use strict";

  var pictureSource = null,
    destinationType = null;

  function clearCache() {
    navigator.camera.cleanup();
  }

  return {
    currentPictureURI: null,
    initialize: function () {
      pictureSource = navigator.camera.PictureSourceType;
      destinationType = navigator.camera.DestinationType;
    },
    takePicture: function(onPictureDataSuccess, onPictureDataFail) {
      navigator.camera.getPicture(onPictureDataSuccess, onPictureDataFail, {
        quality: 30,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        sourceType: Camera.PictureSourceType.CAMERA
        // destinationType: destinationType.FILE_URI
      });
    },
    uploadPicture: function(onPictureUploadSuccess, onPictureUploadFail) {
      var pictureURI = pictureManager.currentPictureURI;
      console.log(config);
      modalWindow.enableUploadState();

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = pictureURI.substr(pictureURI.lastIndexOf('/') + 1);
      options.httpMethod = 'POST';
      options.mimeType = "image/jpeg";
      options.params = {
        'apiKey': config.apiKey
      };

      var ft = new FileTransfer();
      ft.upload(
        pictureURI,
        encodeURI(config.apiEndpoint + '/upload/'),
        onPictureUploadSuccess,
        onPictureUploadFail,
        options
      );
    }
  };
})(modalWindow, config);
