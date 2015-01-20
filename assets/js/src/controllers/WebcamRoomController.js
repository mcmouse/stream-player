/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Manages the webcam section by delegating events between views
 * @return Marionette.Object WebcamRoomController
 */

//Need to require browsernizr tests first for w/e reason

var Marionette = require('backbone-shim').Marionette,
  WebcamView = require('views/webcam/WebcamView'),
  WebcamRoom = require('models/webcam/WebcamRoom'),
  Modernizr = require('browsernizr');

module.exports = Marionette.Object.extend({
  initialize: function () {

    //Front-end for both display and input webcams
    this.webcamView = new WebcamView().render();

    if (this.hasBrowserSupport()) {
      //WebcamRoom is our server that manages adding and removing webcams
      this.webcamRoom = new WebcamRoom();
      this.webcamView.showInitialRegions();
      this.setupEvents();
    } else {
      this.webcamView.showError('Your browser is not supported, peasant! Get a new one!');
    }

  },

  setupEvents: function () {
    chatApp.channels.webcamRoomChannel.on({
      'webcamStarted': this.webcamRoom.addLocalWebcam,
      'webcamStopped': this.webcamRoom.removeLocalWebcam,
    }, this.webcamRoom);
  },

  hasBrowserSupport: function () {
    return Modernizr.websockets && Modernizr.peerconnection && Modernizr.getusermedia;
  },
});