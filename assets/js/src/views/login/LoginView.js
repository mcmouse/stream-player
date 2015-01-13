/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Controls all markup for the login area, and fires appropriate events to handle logged in state.
 * @return Marionette.ItemView LoginView
 */

var Marionette = require('backbone-shim').Marionette,
  LoginRegionTemplate = require('LoginRegion.html');

module.exports = Marionette.ItemView.extend({
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
      chatApp.channels.localUserChannel.on({
        'noSavedUser': this.model.showEnterUserName,
        'userLoggedIn': this.model.showLoggedIn,
        'userLoggedOut': this.model.showLoggedOut,
      }, this.model);
    }

    this.listenTo(this.model, 'change', this.render);
  },

  //Static HTML
  template: LoginRegionTemplate,

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
    var userNameExists = chatApp.channels.chatRoomChannel.request('isUserNameInUse', user);
    if (!userNameExists) {
      this.currentUser.saveUser(user);
    } else {
      chatApp.channels.localUserChannel.command('nameInUse');
    }
  },

  //Log out, hiding logged in state, clearing user from model, and showing log in button
  logOut: function () {
    this.currentUser.removeUser();
  },
});