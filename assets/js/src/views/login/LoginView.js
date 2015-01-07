/* globals define */

/**
 * Controls all markup for the login area, and fires appropriate events to handle logged in state.
 * @return Marionette.ItemView LoginView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/LoginRegion.html',
], function ($, _, Backbone, Marionette, LoginRegionTemplate) {
  'use strict';

  return Marionette.ItemView.extend({
    el: '#login-region',

    //Cache selectors
    ui: {
      'loginButton': '.login-button',
      'enterUserNameInput': '.enter-user-name-input',
      'setNameButton': '.set-name-button',
      'logOutButton': '.log-out-button',
    },

    //Set up UI events
    events: {
      'click @ui.loginButton': 'loadUser',
      'click @ui.setNameButton': 'setName',
      'click @ui.logOutButton': 'logOut',
    },

    currentUser: null,

    initialize: function (options) {
      this.currentUser = options.currentUser;

      if (this.currentUser) {
        this.listenTo(this.currentUser, {
          'noSavedUser': _.bind(this.model.showEnterUserName, this.model),
          'userLoggedIn': _.bind(this.model.showLoggedIn, this.model),
          'userLoggedOut': _.bind(this.model.showLoggedOut, this.model),
        });
      }

      this.on({
        'nameInUse': _.bind(this.model.showNameInUse, this.model),
      });

      this.listenTo(this.model, 'change', this.render);
    },

    //Static HTML
    template: _.template(LoginRegionTemplate),

    templateHelpers: function () {
      return {
        loginClasses: (this.model.get('loggedOut') ? 'visible' : 'hidden'),
        enterUserNameClasses: (this.model.get('enteringUserName') ? 'visible' : 'hidden'),
        nameInUseClasses: (this.model.get('nameInUse') ? 'visible' : 'hidden'),
        loggedInClasses: (this.model.get('loggedIn') ? 'visible' : 'hidden'),
        name: (this.model.get('loggedIn') ? this.currentUser.getName() : ''),
      };
    },

    //On login button click, hide the login area and load the user
    loadUser: function () {
      this.currentUser.loadUser();
    },

    //Get user name and pass up to any listeners
    setName: function () {
      var user = this.ui.enterUserNameInput.val();
      this.trigger('userNameSet', user);
    },

    //Log out, hiding logged in state, clearing user from model, and showing log in button
    logOut: function () {
      this.currentUser.removeUser();
    },
  });
});