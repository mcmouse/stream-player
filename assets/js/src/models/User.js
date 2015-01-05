/* globals define */

/**
 * User model containing defaults and methods for all users. Will be saved to
 * the server at some point.
 * @return Backbone.Model User
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'Utilities'
], function ($, _, Backbone, Utilities) {
  'use strict';

  return Backbone.Model.extend({
    //Generate unique ID for each user model generated.
    defaults: {
      id: Utilities.getGUID()
    },
  });
});