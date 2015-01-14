/* globals chatApp */
/* jshint node:true */

'use strict';

var Marionette = require('backbone-shim').Marionette;

/**
 * View for displaying a single webcam.
 * @return Marionette.ItemView DisplayWebcamView
 */

var DisplayWebcamTemplate = require('DisplayWebcam.html');

module.exports = Marionette.ItemView.extend({
  template: DisplayWebcamTemplate,
  classes: 'display-webcam',
  onRender: function () {
    chatApp.channels.webcamRoomChannel.trigger('webcamRendered', this.model.feedId);
  }
});