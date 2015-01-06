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
        name: (typeof model.currentUser !== 'undefined' && typeof model.currentUser.get('name') !== 'undefined' ? model.currentUser.get('name') : '')
      });
    },

    //Initialize events
    initialize: function () {
      this.on('nameInUse', this.showNameInUse);
      this.on('loggedIn', this.setLoggedIn);
      this.listenTo(this.model, 'change', this.render);
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
      this.ui.enterUserNameRegion.removeClass('hidden');
    },

    //Get user name and pass up to any listeners
    setName: function () {
      var user = this.ui.enterUserNameInput.val();
      this.trigger('userNameSet', user);
      this.ui.nameInUse.addClass('hidden');
    },

    //Show the "that user name is in use" window
    showNameInUse: function () {
      this.ui.nameInUse.removeClass('hidden');
    },

    //Set the logged in region template from the user
    setLoggedIn: function () {
      this.ui.enterUserNameRegion.addClass('hidden');
      this.ui.loggedInRegion.removeClass('hidden');
      this.ui.logOutButton.removeClass('hidden');
    },

    //Log out, hiding logged in state, clearing user from model, and showing log in button
    logOut: function () {
      this.model.removeUser();
      this.ui.loggedInRegion.addClass('hidden');
      this.ui.logOutButton.addClass('hidden');
      this.ui.loginRegion.removeClass('hidden');
    },
  });
});