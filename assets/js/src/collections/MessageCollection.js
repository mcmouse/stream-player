/* jshint node:true */

/** 
 * Collection of all messages in the current room
 * return Backbone.Collection MessageCollection
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  Message = require('models/chat/Message');

module.exports = (function () {
  'use strict';

  return Backbone.Collection.extend({
    model: Message,
  });
})();