/* globals define */

/**
 * Collection view for listing all users
 * @return Marionette.CollectionView UserListView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/chat/UserView',
], function ($, _, Backbone, Marionette, UserView) {
  'use strict';

  return Marionette.CollectionView.extend({
    childView: UserView,
  });
});