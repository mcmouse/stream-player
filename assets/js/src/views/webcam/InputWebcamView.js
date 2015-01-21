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
    'click @ui.showWebcamButton': 'startWebcam',
    'click @ui.hideWebcamButton': 'stopWebcam',
  },

  modelEvents: {
    'webcamStreamStarted': 'displayWebcam',
    'webcamStreamStopped': 'hideWebcam',
  },

  //Static HTML
  template: InputWebcamTemplate,

  startWebcam: function () {
    this.model.startWebcam();
  },

  stopWebcam: function () {
    this.model.stopWebcam();
  },

  displayWebcam: function () {
    //Only append video once it's loaded
    this.render();

    //Update UI
    this.ui.showWebcamButton.hide();
    this.ui.hideWebcamButton.show();

    //Get a handle on the video
    this.ui.webcam.toggleClass('hidden');

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStarted', this.model.get('feedId'));
  },

  hideWebcam: function () {
    //Reset UI state
    this.render();

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStopped', this.model.get('feedId'));
  },
});