/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Controls all markup for the login area, and fires appropriate events to handle logged in state.
 * @return Marionette.ItemView LoginView
 */

var Marionette = require('backbone-shim').Marionette,
  InputWebcamTemplate = require('InputWebcam.html');

module.exports = Marionette.ItemView.extend({
  //Cache selectors
  ui: {
    'showWebcamButton': '.show-webcam',
    'hideWebcamButton': '.hide-webcam',
    'webcam': '#video-in',
  },

  //Set up UI events
  events: {
    'click @ui.showWebcamButton': 'showWebcam',
    'click @ui.hideWebcamButton': 'hideWebcam',
  },

  modelEvents: {
    'webcamStreamCreated': 'displayWebcam',
  },

  //Static HTML
  template: InputWebcamTemplate,

  showWebcam: function () {
    this.model.startWebcam();
  },

  displayWebcam: function () {
    //Only append video once it's loaded
    this.render();

    //Update UI
    this.ui.showWebcamButton.hide();
    this.ui.hideWebcamButton.show();

    //Get a handle on the video
    this.video = this.ui.webcam[0];
    this.ui.webcam.toggleClass('hidden');

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStarted', this.model.get('feedId'));
  },

  hideWebcam: function () {
    //Update UI
    this.ui.showWebcamButton.show();
    this.ui.hideWebcamButton.hide();
    this.video.stop();
    this.ui.webcam.toggleClass('hidden');

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStopped', this.model.get('feedId'));
  },
});