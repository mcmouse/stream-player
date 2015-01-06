/* globals define */

/**
 * View for displaying a single message
 * @return Marionette.Application ChatApp
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/Message',
], function ($, _, Backbone, Marionette, Message) {
  'use strict';

  return Marionette.ItemView.extend({
    template: _.template(Message),
    classes: 'message',
  });
});