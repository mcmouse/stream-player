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
      return {
        currentUserClasses: this.model.get('id') === chatApp.models.CurrentUser.get('id') ? 'current-user' : '',
      };
    }
  });
});