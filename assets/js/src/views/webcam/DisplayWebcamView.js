/* jshint node:true */

'use strict';

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette;

/**
 * View for displaying a single webcam.
 * @return Marionette.ItemView DisplayWebcamView
 */

// var DisplayWebcamTemplate = require('DisplayWebcam.html');

// module.exports = Marionette.ItemView.extend({
//   template: _.template(DisplayWebcamTemplate),
//   classes: 'display-webcam',
//   onRender: function () {
//     chatApp.channels.webcamRoom.trigger('webcamRendered', this.model.feedId);
//   }
// });