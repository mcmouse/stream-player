/* globals define */

/**
 * View for "send message" area. Passes out events with message.
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text!templates/SendMessage.html',
], function ($, _, Backbone, Marionette, SendMessageTemplate) {
  'use strict';

  return Marionette.ItemView.extend({
    template: _.template(SendMessageTemplate),
    ui: {
      'messageText': '.message-text',
      'messageButton': '.send-message'
    },

    events: {
      'click @ui.messageButton': 'sendNewMessage'
    },

    sendNewMessage: function () {
      var messageText = this.ui.messageText.val();

      if (messageText && messageText !== '') {
        this.trigger('messageSent', messageText);
      }
    }
  });
});