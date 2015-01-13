/* jshint node:true */

/**
 * Display webcam model
 * @return Backbone.Model DisplayWebcam
 */

var Backbone = require('backbone-shim').Backbone,
  Utilities = require('Utilities');

module.exports = (function () {
  'use strict';

  return Backbone.Model.extend({
    defaults: {
      feedId: Utilities.getGUID(),
    }
  });
})();