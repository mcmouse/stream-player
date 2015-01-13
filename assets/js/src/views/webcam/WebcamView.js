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
  WebcamRoomTemplate = require('WebcamRoom.html');

module.exports = Marionette.LayoutView.extend({
  el: '#webcam-region',
  template: WebcamRoomTemplate,
  regions: {
    displayWebcams: '#display-webcams',
    inputWebcam: '#input-webcam',
  },

  showInitialRegions: function () {
    this.showDisplayWebcamsView();
    this.showInputWebcamsView();
  },

  showDisplayWebcamsView: function () {
    this.getRegion('displayWebcams').show(new WebcamRoomView({
      collection: chatApp.collections.WebcamCollection,
    }));
  },

  showInputWebcamsView: function () {
    this.getRegion('inputWebcam').show(new InputWebcamView());
  },
});