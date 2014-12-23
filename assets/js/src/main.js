/* global jwplayer, io */
(function (window, document, $, undefined) {
  'use strict';

  var VideoIn = function () {

    //jQuery selectors
    var $body = $('body');
    var $video = $body.find('#input-video');
    var $showButton = $body.find('#load-video');
    var $hideButton = $body.find('#hide-video');

    var srcUrl = 'rtmp://ec2-54-149-64-14.us-west-2.compute.amazonaws.com/live/';

    this.createPlayer = function () {
      this.template = this.template || $body.find('#player-template')[0].innerHTML;
      this.template = this.template
        .replace('{{id}}', window.userID)
        .replace('{{srcUrl}}', srcUrl);
      $video.append(this.template);
    };

    this.removePlayer = function () {
      $video.children().empty();
    };

    this.init = function () {
      window.userID = this.generateUserID();

      $showButton.click(function () {
        this.displayVideo();
      }.bind(this));

      $hideButton.click(function () {
        this.hideVideo();
      }.bind(this));
    };

    this.displayVideo = function () {
      this.createPlayer();
      $video.show();
    };

    this.hideVideo = function () {
      this.removePlayer();
      $video.hide();
    };


    // this.setVideoProperty = function (property, value) {
    //   player.setProperty(property, value);
    // };

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

  var Broadcast = function () {

    var socket = io.connect('http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', {
        my: 'data'
      });
    });

    var socket2 = io.connect('http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081');

    socket2.on('news', function (data) {
      console.log(data);
      socket.emit('socket2s event', {
        my: 'data2'
      });
    });

  };

  $(function () {
    var broadcast = broadcast || new Broadcast();

    var videoIn = videoIn || new VideoIn();
    videoIn.init();

    var videoOut = videoOut || new VideoOut();
    videoOut.init();
  });

})(window, document, jQuery);