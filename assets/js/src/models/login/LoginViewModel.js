/* jshint node:true */

'use strict';

/**
 * Controls state for the login area
 * @return Backbone.Model LoginViewModel
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette;


module.exports = Backbone.Model.extend({
  defaults: {
    'loggedOut': true,
    'enteringUserName': false,
    'nameInUse': false,
    'loggedIn': false,
  },

  //Set to view to "logged out" state
  showLoggedOut: function () {
    this.set({
      'loggedOut': true,
      'enteringUserName': false,
      'nameInUse': false,
      'loggedIn': false,
    });
  },

  //Set view to "entering user name" state
  showEnterUserName: function () {
    this.set({
      'loggedOut': false,
      'enteringUserName': true,
      'nameInUse': false,
      'loggedIn': false
    });
  },

  //Set view to "name in use" state
  showNameInUse: function () {
    this.set({
      'loggedOut': false,
      'enteringUserName': true,
      'nameInUse': true,
      'loggedIn': false
    });
  },

  //Set view to "logged in" state
  showLoggedIn: function () {
    this.set({
      'loggedOut': false,
      'enteringUserName': false,
      'nameInUse': false,
      'loggedIn': true
    });
  }
});