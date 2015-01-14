/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Controls all markup for the login area, and fires appropriate events to handle logged in state.
 * @return Marionette.ItemView LoginView
 */

var Marionette = require('backbone-shim').Marionette,
  InputWebcamTemplate = require('InputWebcam.html'),
  VideoInTemplate = require('VideoInTemplate.html');

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

  videoInTemplate: VideoInTemplate,

  //Static HTML
  template: InputWebcamTemplate,

  showWebcam: function () {
    //Update UI
    this.ui.showWebcamButton.hide();
    this.ui.hideWebcamButton.show();
    this.ui.webcam.append(this.videoInTemplate(this.model.toJSON()));
    this.ui.webcam.show();

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStarted', this.model.get('feedId'));
  },

  hideWebcam: function () {
    //Update UI
    this.ui.showWebcamButton.show();
    this.ui.hideWebcamButton.hide();
    this.ui.webcam.hide();
    this.ui.webcam.empty();

    //Trigger event
    chatApp.channels.webcamRoomChannel.trigger('webcamStopped', this.model.get('feedId'));
  },
});