/* global videojs */
(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#input-video');
    var $videoOut = $body.find('#output-video');
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
      $video.attr('src', window.URL.createObjectURL(userVideoStream));
      $video.on('loadedmetadata', function (e) {
        console.log(e);
      });
    };
  };

  var VideoOut = function () {

    this.src = {
      src: 'rtmp://ec2-54-149-64-14.us-west-2.compute.amazonaws.com/live/test',
      type: 'rtmp/flv'
    };

    this.init = function () {
      // jwplayer('video-out').setup({
      //   file: this.src,
      //   height: 400,
      //   width: 600
      // });'

      var options = {
        autoplay: true,
        sources: [this.src],
        preload: 'auto',
        techOrder: ['flash', 'html5'],
      };

      this.videoplayer = videojs('output-video', options);

      this.videoplayer.ready(function () {
        this.$videoOut.width(601);
      }.bind(this));

    };

  };

  $(function () {
    var videoIn = videoIn || new VideoIn();
    videoIn.init();

    var videoOut = videoOut || new VideoOut();
    videoOut.init();
  });

})(window, document, jQuery);