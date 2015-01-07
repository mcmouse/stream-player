/* globals define */

/**
 * Defines UserCollection for displaying a list of users.
 * @return Backbone.Collection UserCollection
 */

define([
  'backbone',
  'models/user/User',
], function (Backbone, User) {

  'use strict';

  return Backbone.Collection.extend({
    model: User,
  });
});