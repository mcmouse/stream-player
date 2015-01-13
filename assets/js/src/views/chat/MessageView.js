/* jshint node:true */

'use strict';

/**
 * View for displaying a single message
 * @return Marionette.ItemView MessageView
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  MessageTemplate = require('Message.html');

module.exports = Marionette.ItemView.extend({
  template: MessageTemplate,
  classes: 'message',
  templateHelpers: function () {
    var currentUserClasses = '';
    if (chatApp.models.CurrentUser.loadedUser()) {
      if (this.model.get('username') === chatApp.models.CurrentUser.getName()) {
        currentUserClasses += 'current-user';
      }
    }
    return {
      currentUserClasses: currentUserClasses,
    };
  }
});