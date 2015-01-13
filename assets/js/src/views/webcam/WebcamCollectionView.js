/* jshint node:true */

/**
 * Collection view for listing all messages
 * @return Marionette.CollectionView WebcamCollectionView
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette;

// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'backbone.marionette',
//   'views/webcam/DisplayWebcamView',
// ], function ($, _, Backbone, Marionette, DisplayWebcamView) {
//   'use strict';

//   return Marionette.CollectionView.extend({
//     childView: DisplayWebcamView,
//   });
// });