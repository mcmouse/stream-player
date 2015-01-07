/* globals define, chatApp */

/**
 * View for displaying a single user
 * @return Marionette.ItemView UserView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/User.html',
], function ($, _, Backbone, Marionette, UserTemplate) {
  'use strict';

  return Marionette.ItemView.extend({
    template: _.template(UserTemplate),
    classes: 'user',
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