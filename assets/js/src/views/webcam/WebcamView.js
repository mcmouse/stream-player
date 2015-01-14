/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for displaying webcam regions. Contains regions for display (output) and personal
 * webcam (input)
 * @return Marionette.Application ChatApp
 */

var Marionette = require('backbone-shim').Marionette,
  WebcamRoomView = require('views/webcam/WebcamRoomView'),
  InputWebcamView = require('views/webcam/InputWebcamView'),
  InputWebcam = require('models/webcam/InputWebcam'),
  WebcamRoomTemplate = require('WebcamRoom.html');

module.exports = Marionette.LayoutView.extend({
  el: '#webcam-region',
  template: WebcamRoomTemplate,
  regions: {
    displayWebcams: '#display-webcams',
    inputWebcam: '#input-webcam',
  },

  initialize: function () {
    chatApp.channels.localUserChannel.on({
      'userLoggedIn': this.showInputWebcamView,
      'userLoggedOut': this.hideInputWebcamView,
    }, this);
  },

  showInitialRegions: function () {
    this.showDisplayWebcamsView();
  },

  showDisplayWebcamsView: function () {
    this.getRegion('displayWebcams').show(new WebcamRoomView({
      collection: chatApp.collections.WebcamCollection,
    }));
  },

  showInputWebcamView: function () {
    this.getRegion('inputWebcam').show(new InputWebcamView({
      model: new InputWebcam()
    }));
  },

  hideInputWebcamView: function () {
    this.getRegion('inputWebcam').empty();
  }
});