/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for "send message" area. Passes out events with message.
 * @return Marionette.ItemView SendMessageView
 */

var Marionette = require('backbone-shim').Marionette,
  SendMessageTemplate = require('SendMessage.html');

module.exports = Marionette.ItemView.extend({
  template: SendMessageTemplate,
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
      chatApp.channels.chatRoomChannel.trigger('messageSent', messageText);
    }

    this.ui.messageText.val('');
  }
});