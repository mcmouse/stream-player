/* globals Marionette, _ */
var LoginView = (function () {
  'use strict';

  return Marionette.ItemView.extend({
    el: '#login-region',

    template: false,

    initialize: function () {
      this.on('nameInUse', this.showNameInUse);
      this.on('loggedIn', this.setLoggedIn);
    },

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

    events: {
      'click @ui.loginButton': 'loadUser',
      'click @ui.setNameButton': 'setName',
      'click @ui.logOutButton': 'logOut',
    },

    modelEvents: {
      'noSavedUser': 'showEnterUserName',
    },

    loadUser: function () {
      $(this.ui.loginRegion).hide();
      this.model.loadUser();
    },

    showEnterUserName: function () {
      $(this.ui.enterUserNameRegion).show();
    },

    setName: function () {
      var user = $(this.ui.enterUserNameInput).val();
      this.trigger('userNameSet', user);
      $(this.ui.nameInUse).hide();
    },

    showNameInUse: function () {
      $(this.ui.nameInUse).show();
    },

    setLoggedIn: function (user) {
      $(this.ui.enterUserNameRegion).hide();
      var loggedInTemplate = _.template('<div class="logged-in">Welcome, <%= name %>');
      var html = loggedInTemplate({
        name: user.get('name')
      });
      $(this.ui.loggedInRegion).html(html).show();
      $(this.ui.logOutButton).show();
    },

    logOut: function () {
      this.model.removeUser();
      $(this.ui.loggedInRegion).hide();
      $(this.ui.logOutButton).hide();
      $(this.ui.loginRegion).show();
    },
  });
})();