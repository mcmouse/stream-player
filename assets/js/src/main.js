(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#input-video');
    var $button = $body.find('#load-video');

    this.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;

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

      this.getUserMedia.call(navigator, settings, this.displayVideo, this.errorCallback);

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