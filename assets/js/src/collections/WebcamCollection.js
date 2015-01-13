/* jshint node:true */

/** 
 * Collection of all webcams in the current room
 * return Backbone.Collection WebcamCollection
 */

var Backbone = require('backbone-shim').Backbone,
  DisplayWebcam = require('models/webcam/DisplayWebcam');

module.exports = (function () {
  'use strict';

  return Backbone.Collection.extend({
    model: DisplayWebcam,
  });
})();