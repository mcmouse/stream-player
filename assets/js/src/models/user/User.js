/* jshint node:true */

'use strict';

/**
 * User model containing defaults and methods for all users. Will be saved to
 * the server at some point.
 * @return Backbone.Model User
 */

var Backbone = require('backbone-shim').Backbone,
  Utilities = require('Utilities');

module.exports = Backbone.Model.extend({
  //Generate unique ID for each user model generated.
  defaults: {
    id: Utilities.getGUID()
  },
});