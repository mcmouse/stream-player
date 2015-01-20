/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for displaying a single webcam.
 * @return Marionette.ItemView DisplayWebcamView
 */

var Marionette = require('backbone-shim').Marionette,
  DisplayWebcamTemplate = require('DisplayWebcam.html');

module.exports = Marionette.ItemView.extend({
  template: DisplayWebcamTemplate,
  attributes: {
    class: 'display-webcam',
  },
  initialize: function () {},
  onRender: function () {
    chatApp.channels.webcamRoomChannel.trigger('webcamRendered', this.model.feedId);
  },
  onShow: function () {}
});