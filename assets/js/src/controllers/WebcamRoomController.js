/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Manages the webcam section by delegating events between views
 * @return Marionette.Object WebcamRoomController
 */

var Marionette = require('backbone-shim').Marionette,
  WebcamView = require('views/webcam/WebcamView'),
  WebcamRoom = require('models/webcam/WebcamRoom');

module.exports = Marionette.Object.extend({
  initialize: function () {

    //WebcamRoom is our server that manages adding and removing webcams
    this.webcamRoom = new WebcamRoom();

    //Front-end for both display and input webcams
    this.webcamView = new WebcamView().render();
    this.webcamView.showInitialRegions();

    this.setupEvents();
  },

  setupEvents: function () {

  },
});