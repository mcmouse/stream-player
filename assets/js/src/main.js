/* global jwplayer */
(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#video-in');
    var $button = $body.find('#load-video');

    var inputElement = 'video-in';

    var player = (function () {
      var isIE = navigator.appName.indexOf('Microsoft') !== -1;
      return (isIE) ? window[inputElement] : document[inputElement];
    })();

    this.init = function () {
      window.userID = this.generateUserID();

      $button.click(function () {
        this.displayVideo();
      }.bind(this));
    };

    this.displayVideo = function () {
      this.setVideoProperty('url', 'rtmp://ec2-54-149-64-14.us-west-2.compute.amazonaws.com/live/');
      this.setVideoProperty('publish', window.userID);
      this.setVideoProperty('record', true);
      this.setVideoProperty('controls', true);
      $video.show();
    };

    this.setVideoProperty = function (property, value) {
      player.setProperty(property, value);
    };

    //Random number generation
    //From http://slavik.meltser.info/the-efficient-way-to-create-guid-uuid-in-javascript-with-explanation/

    /**
     * Generates a GUID string.
     * @returns {String} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser (slavik@meltser.info).
     * @link http://slavik.meltser.info/?p=142
     */

    this.generateUserID = function () {
      function _p8(s) {
        var p = (Math.random().toString(16) + '000000000').substr(2, 8);
        return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
      }
      return _p8() + _p8(true) + _p8(true) + _p8();
    };
  };

  var VideoOut = function () {

    this.src = 'rtmp://ec2-54-149-64-14.us-west-2.compute.amazonaws.com/live/' + window.userID;

    this.init = function () {
      jwplayer('output-video').setup({
        file: this.src,
        height: 400,
        width: 600
      });
    };

  };

  $(function () {
    var videoIn = videoIn || new VideoIn();
    videoIn.init();

    var videoOut = videoOut || new VideoOut();
    videoOut.init();
  });

})(window, document, jQuery);