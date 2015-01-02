/* globals Marionette, _ */
var LoginView = (function () {
  'use strict';

  return Marionette.ItemView.extend({
    el: '#login-region',

    template: false,

    ui: {
      'loginRegion': '.login',
      'loginButton': '.login-button',
      'enterUserNameRegion': '.enter-user-name',
      'enterUserNameInput': '.enter-user-name-input',
      'setNameButton': '.set-name-button',
      'nameInUse': '.name-in-use',
      'loggedInRegion': '.logged-in-region'
    },

    events: {
      'click @ui.loginButton': 'loadUser',
      'click @ui.setNameButton': 'setName',
      'nameInUse': 'showNameInUse',
      'loggedIn': 'setLoggedIn',
    },

    modelEvents: {
      'noSavedUser': 'showEnterUserName',
    },

    loadUser: function () {
      $(this.ui.loginRegion).hide();
      this.model.loadUser();
    },

    showEnterUserName: function () {
      this.ui.enterUserName.show();
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
      $(this.ui.enterUserName).hide();
      var loggedInTemplate = _.template('<div class="logged-in">Welcome, <%= name %>');
      var html = loggedInTemplate({
        name: user.get('name')
      });
      $(this.ui.loggedInRegion).html(html).show();
    },
  });
})();