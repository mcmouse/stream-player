/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for displaying webcam regions. Contains regions for display (output) and personal
 * webcam (input)
 * @return Marionette.Application ChatApp
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  WebcamRoomView = require('views/webcam/WebcamRoomView'),
  InputWebcamView = require('views/webcam/InputWebcamView'),
  ErrorView = require('views/error/ErrorView'),
  InputWebcam = require('models/webcam/InputWebcam'),
  WebcamRoomTemplate = require('WebcamRoom.html');

module.exports = Marionette.LayoutView.extend({
  el: '#webcam-region',
  attributes: {
    class: 'webcam-layout',
  },
  template: WebcamRoomTemplate,
  regions: {
    displayWebcams: '#display-webcams',
    inputWebcam: '#input-webcam',
    errors: '.errors',
  },

  initialize: function () {
    chatApp.channels.localUserChannel.on({
      'userLoggedIn': this.showInputWebcamView,
      'userLoggedOut': this.hideInputWebcamView,
    }, this);
  },

  showError: function (message) {
    this.getRegion('errors').show(new ErrorView({
      model: new Backbone.Model({
        message: message
      }),
    }));
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