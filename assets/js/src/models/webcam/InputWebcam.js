/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Controls creating and destroying the input webcam
 * @return Backbone.Model InputWebcam
 */


var Backbone = require('backbone-shim').Backbone,
  Utilities = require('Utilities');

module.exports = Backbone.Model.extend({
  //Set up defaults for localstorage ID and loaded user state.
  defaults: {
    feedId: Utilities.getGUID(),
  },

  initialize: function () {
    this.set('baseUrl', chatApp.options.rtmpServerAddress);
  }
});