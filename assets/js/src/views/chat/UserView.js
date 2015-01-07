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
});