/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Controls creating and destroying the input webcam
 * @return Backbone.Model InputWebcam
 */


var Backbone = require('backbone-shim').Backbone,
  Utilities = require('Utilities'),
  rtc = require('webrtc.io-client');

module.exports = Backbone.Model.extend({
  //Set up defaults for localstorage ID and loaded user state.
  defaults: {
    feedId: Utilities.getGUID(),
    src: '',
  },

  startWebcam: function () {
    rtc.createStream({
      'video': true,
      'audio': true,
    }, function (stream) {
      this.set('src', URL.createObjectURL(stream));
      this.trigger('webcamStreamCreated');
    }.bind(this));
  },
});