var pictureList = (function () {
  "use strict";

  var pictureList = null,
      picturesLoaded = [];

  function getPictureList() {
    if (pictureList == null) {
      pictureList = document.querySelector('ul.pictures');
    }

    return pictureList;
  }

  function cleanup() {
    var pictureList = getPictureList(),
    pictures = pictureList.querySelector('li');

    if (pictures.length > 30) {
      for (var i = pictures.length; i > 30; i--) {
        pictureList.removeChild(pictures[i]);
      }
    }
  }

  function addToPictureList(pictures) {

    var pictureList = getPictureList();

    for (var i = 0; i < pictures.length; i++) {

      //Check if picture is already part of the picture list
      if (picturesLoaded.indexOf(pictures[i]) === -1) {

        //Create new list item and add it to the list of pictures
        var li = createListItem(pictures[i]);
        pictureList.insertBefore(li, pictureList.firstChild);

        //Add picture to the list of loaded pictures
        picturesLoaded.push(pictures[i]);
      }
    }
  }

  function createListItem(picture) {
    var li = document.createElement('li');
    li.style.opacity = 0;
    li.innerHTML = '<img src="' + config.apiEndpoint + '/' + picture + '" >';

    setTimeout(function () {
      util.fadeIn(li);
    }, 1000);

    return li;
  }


  return {
    loadPictures: function() {
      var request = new XMLHttpRequest();

      request.open('GET', config.apiEndpoint + '/pictures/', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var pictures = JSON.parse(request.responseText);
          addToPictureList(pictures);
          cleanupPictureList();
        } else {
          // We reached our target server, but it returned an error
          alert('Sorry. Wasn\'t able to load pictures.');
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        alert('Sorry. Wasn\'t able to load pictures. There was an error talking to the server.');
      };

      request.send();
    }
  };
})(config, util);
