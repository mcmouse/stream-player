/* globals define */

/**
 * Controls state for the login area
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/LoginRegion.html',
], function ($, _, Backbone, Marionette, LoginRegionTemplate) {
  'use strict';

  return Backbone.Model.extend({
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
        'enteringUserName': false,
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

});