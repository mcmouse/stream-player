/* globals define */

define([
  'backbone',
  'models/user/User',
], function (Backbone, User) {

  'use strict';

  return Backbone.Collection.extend({
    model: User,
  });
});