/* globals define, chatApp */

/**
 * View for displaying a single webcam.
 * @return Marionette.ItemView DisplayWebcamView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/DisplayWebcam.html',
], function ($, _, Backbone, Marionette, DisplayWebcamTemplate) {
  'use strict';

  return Marionette.ItemView.extend({
    template: _.template(DisplayWebcamTemplate),
    classes: 'display-webcam',
    onRender: function () {
      chatApp.channels.webcamRoom.trigger('webcamRendered', this.model.feedId);
    }
  });
});