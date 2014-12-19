(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#input_video');
    var $button = $body.find('#load_video');

    this.getUserMedia = navigator.getUserMedia().bind(navigator) || navigator.webkitGetUserMedia().bind(navigator) || navigator.mozGetUserMedia().bind(navigator) || navigator.oGetUserMedia().bind(navigator) || navigator.msGetUserMedia().bind(navigator);

    this.hasUserMedia = function () {
      return !!this.getUserMedia;
    };

    this.errorCallback = function (e) {
      console.log('Error: ', e);
    };

    this.init = function () {
      if (this.hasUserMedia) {
        $button.click(function () {
          this.loadUserMedia();
        }.bind(this));
      } else {
        console.log('getUserMedia() is not supported in your browser');
      }
    };

    this.loadUserMedia = function () {
      var settings = {
        video: true,
        audio: true,
      };

      this.getUserMedia(settings, this.displayVideo, this.errorCallback);

    };

    this.displayVideo = function (userVideoStream) {
      $video.src = window.URL.createObjectURL(userVideoStream);
      $video.onloadedmetadata = function (e) {
        console.log(e);
      };
    };
  };

  $(function () {
    var videoIn = videoIn || new VideoIn();
    videoIn.init();
  });

})(window, document, jQuery);