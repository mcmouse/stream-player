/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * View for displaying the collection of messages
 * @return Marionette.LayoutView ChatView
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  UserListView = require('views/chat/UserListView'),
  ChatMessagesView = require('views/chat/ChatMessagesView'),
  SendMessageView = require('views/chat/SendMessageView'),
  ErrorView = require('views/error/ErrorView'),
  ChatRoomTemplate = require('ChatRoom.html');

module.exports = Marionette.LayoutView.extend({
  el: '#chat-region',
  template: ChatRoomTemplate,
  regions: {
    userList: '#user-list',
    chatMessages: '#chat-messages',
    sendMessage: '#send-message',
    errors: '.errors',
  },

  showError: function (message) {
    this.getRegion('errors').show(new ErrorView({
      model: new Backbone.Model({
        message: message
      }),
    }));
  },

  showInitialRegions: function () {
    this.showChatMessageView();
    this.showUserListView();
  },

  //Display the "send a message" view on user login
  showChatMessageView: function () {
    this.getRegion('chatMessages').show(new ChatMessagesView({
      collection: chatApp.collections.MessageCollection,
    }));
  },

  showUserListView: function () {
    this.getRegion('userList').show(new UserListView({
      collection: chatApp.collections.UserCollection,
    }));
  },

  showSendMessageView: function () {
    this.getRegion('sendMessage').show(new SendMessageView());
  },

  //Hide the "send a message" view on user logout
  hideSendMessageView: function () {
    this.getRegion('sendMessage').empty();
  },
});