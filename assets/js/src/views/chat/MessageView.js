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
      var currentUser = chatApp.models.CurrentUser.get('user');
      if (currentUser) {
        if (this.model.get('name') === currentUser.get('name')) {
          currentUserClasses += 'current-user';
        }
      }
      return {
        currentUserClasses: currentUserClasses,
      };
    }
  });
});