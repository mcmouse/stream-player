/* globals define, chatApp */

/**
 * View for displaying a single message
 * @return Marionette.ItemView MessageView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/Message.html',
], function ($, _, Backbone, Marionette, MessageTemplate) {
  'use strict';

  return Marionette.ItemView.extend({
    template: _.template(MessageTemplate),
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
});