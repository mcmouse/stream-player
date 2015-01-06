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

    //Static HTML
    template: function (model) {

      return _.template(LoginRegionTemplate)({
        loginClasses: (!model.loggedInUser && !model.enteringUserName && !model.nameInUse ? 'visible' : 'hidden'),
        enterUserNameClasses: (model.enteringUserName ? 'visible' : 'hidden'),
        nameInUseClasses: (model.nameInUse ? 'visible' : 'hidden'),
        loggedInClasses: (model.loggedInUser ? 'visible' : 'hidden'),
        name: (model.loggedInUser ? model.currentUser.name : '')
      });
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
      'userLoggedIn': 'render'
    },

    //On login button click, hide the login area and load the user
    loadUser: function () {
      this.model.loadUser();
      this.render();
    },

    //Show the enter user name region
    showEnterUserName: function () {
      this.model.showEnteringUserName();
      this.render();
    },

    //Get user name and pass up to any listeners
    setName: function () {
      var user = this.ui.enterUserNameInput.val();
      this.trigger('userNameSet', user);
    },

    //Show the "that user name is in use" window
    showNameInUse: function () {
      this.model.showNameInUse();
      this.render();
    },

    //Log out, hiding logged in state, clearing user from model, and showing log in button
    logOut: function () {
      this.model.removeUser();
      this.render();
    },
  });
});