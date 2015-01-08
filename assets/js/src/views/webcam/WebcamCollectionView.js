/* globals define */

/**
 * Collection view for listing all messages
 * @return Marionette.CollectionView WebcamCollectionView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/webcam/DisplayWebcamView',
], function ($, _, Backbone, Marionette, DisplayWebcamView) {
  'use strict';

  return Marionette.CollectionView.extend({
    childView: DisplayWebcamView,
  });
});