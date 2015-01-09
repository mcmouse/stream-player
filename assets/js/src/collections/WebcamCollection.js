/* globals define */

/** 
 * Collection of all webcams in the current room
 * return Backbone.Collection WebcamCollection
 */
define([
  'backbone',
  'models/webcam/DisplayWebcam',
], function (Backbone, DisplayWebcam) {

  'use strict';

  return Backbone.Collection.extend({
    model: DisplayWebcam,
  });
});