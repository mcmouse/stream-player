/* global jwplayer,DetectFlashVer,AC_FL_RunContent */
(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#video-in');
    var $button = $body.find('#load-video');

    var inputElement = 'video-in';
    var srcUrl = 'rtmp://ec2-54-149-64-14.us-west-2.compute.amazonaws.com/live/';
    var isIE = navigator.appName.indexOf('Microsoft') !== -1;

    var player = (function () {
      return (isIE) ? window[inputElement] : document[inputElement];
    })();

    this.init = function () {
      window.userID = this.generateUserID();

      $button.click(function () {
        this.displayVideo();
      }.bind(this));
    };

    this.displayVideo = function () {
      var flashVersion = this.detectFlash();
      if (flashVersion.hasProductInstall && !flashVersion.hasVersion10) {
        this.updateFlash();
      } else if (flashVersion.hasVersion10) {
        AC_FL_RunContent(
          'src', '/stream-player/assets/libs/js/' + (flashVersion.hasVersion11 ? 'VideoIO11' : (flashVersion.hasVersion10_3 ? 'VideoIO45' : 'VideoIO')),
          'width', '320',
          'height', '240',
          'align', 'middle',
          'id', inputElement,
          'quality', 'high',
          'bgcolor', '#000000',
          'name', inputElement,
          'allowScriptAccess', 'always',
          'allowFullScreen', 'true',
          'type', 'application/x-shockwave-flash',
          'pluginspage', 'http://www.adobe.com/go/getflashplayer',
          'url', srcUrl,
          'publish', this.userID,
          'record', 'true'
        );
      } else {
        this.installFlash();
      }
      this.setVideoProperty('publish', window.userID);
      $video.show();
    };

    this.updateFlash = function () {
      var MMPlayerType = (isIE === true) ? 'ActiveX' : 'PlugIn';
      var MMredirectURL = window.location;
      document.title = document.title.slice(0, 47) + '- Flash Player Installation';
      var MMdoctitle = document.title;

      AC_FL_RunContent(
        'src', 'playerProductInstall',
        'FlashVars', 'MMredirectURL=' + MMredirectURL + '&MMplayerType=' + MMPlayerType + '&MMdoctitle=' + MMdoctitle + '',
        'width', '320',
        'height', '240',
        'align', 'middle',
        'id', 'video1',
        'quality', 'high',
        'bgcolor', '#000000',
        'name', 'video1',
        'allowScriptAccess', 'always',
        'type', 'application/x-shockwave-flash',
        'pluginspage', 'http://www.adobe.com/go/getflashplayer'
      );
    };

    this.installFlash = function () {
      alert('go get flash');
    };

    this.setVideoProperty = function (property, value) {
      player.setProperty(property, value);
    };

    this.detectFlash = function () {
      return {
        hasFlash: DetectFlashVer(6, 0, 65),
        hasVersion10: DetectFlashVer(10, 0, 0),
        hasVersion10_3: DetectFlashVer(10, 3, 0),
        hasVersion11: DetectFlashVer(11, 0, 0)
      };
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