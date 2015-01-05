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
], function ($, _, Backbone, Marionette) {
  'use strict';

  return Marionette.ItemView.extend({
    el: '#login-region',

    //Static HTML
    template: false,

    //Initialize events
    initialize: function () {
      this.on('nameInUse', this.showNameInUse);
      this.on('loggedIn', this.setLoggedIn);
    },

    //Cache selectors
    ui: {
      'loginRegion': '.login',
      'loginButton': '.login-button',
      'enterUserNameRegion': '.enter-user-name',
      'enterUserNameInput': '.enter-user-name-input',
      'setNameButton': '.set-name-button',
      'nameInUse': '.name-in-use',
      'loggedInRegion': '.logged-in-region',
      'logOutButton': '.log-out-button',
    },

    //Set up UI events
    events: {
      'click @ui.loginButton': 'loadUser',
      'click @ui.setNameButton': 'setName',
      'click @ui.logOutButton': 'logOut',
    },

    //Listen to the model's 'noSavedUser' event if there is no saved user in local storage
    modelEvents: {
      'noSavedUser': 'showEnterUserName',
    },

    //On login button click, hide the login area and load the user
    loadUser: function () {
      this.ui.loginRegion.hide();
      this.model.loadUser();
    },

    //Show the enter user name region
    showEnterUserName: function () {
      this.ui.enterUserNameRegion.show();
    },

    //Get user name and pass up to any listeners
    setName: function () {
      var user = this.ui.enterUserNameInput.val();
      this.trigger('userNameSet', user);
      this.ui.nameInUse.hide();
    },

    //Show the "that user name is in use" window
    showNameInUse: function () {
      this.ui.nameInUse.show();
    },

    //Set the logged in region template from the user
    setLoggedIn: function (user) {
      this.ui.enterUserNameRegion.hide();
      var loggedInTemplate = _.template('<div class="logged-in">Welcome, <%= name %>');
      var html = loggedInTemplate({
        name: user.get('name')
      });
      this.ui.loggedInRegion.html(html).show();
      this.ui.logOutButton.show();
    },

    //Log out, hiding logged in state, clearing user from model, and showing log in button
    logOut: function () {
      this.model.removeUser();
      this.ui.loggedInRegion.hide();
      this.ui.logOutButton.hide();
      this.ui.loginRegion.show();
    },
  });
});