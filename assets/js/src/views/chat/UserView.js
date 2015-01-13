/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for displaying a single user
 * @return Marionette.ItemView UserView
 */

var Marionette = require('backbone-shim').Marionette,
  UserTemplate = require('User.html');

module.exports = Marionette.ItemView.extend({
  template: UserTemplate,
  classes: 'user',
  templateHelpers: function () {
    var currentUserClasses = '';
    if (chatApp.models.CurrentUser.loadedUser()) {
      if (this.model.get('name') === chatApp.models.CurrentUser.getName()) {
        currentUserClasses += 'current-user';
      }
    }
    return {
      currentUserClasses: currentUserClasses,
    };
  }
});