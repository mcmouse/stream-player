/* globals define, chatApp */

/**
 * View for displaying the collection of messages
 * @return Marionette.Application ChatApp
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/chat/UserListView',
  'views/chat/ChatMessagesView',
  'views/chat/SendMessageView',
  'text!templates/ChatRoom.html',
], function ($, _, Backbone, Marionette, UserListView, ChatMessagesView, SendMessageView, ChatRoomTemplate) {
  'use strict';

  return Marionette.LayoutView.extend({
    el: '#chat-region',
    template: _.template(ChatRoomTemplate),
    regions: {
      //userList: '#user-list',
      chatMessages: '#chat-messages',
      sendMessage: '#send-message'
    },

    showInitialRegions: function () {
      this.showChatMessageView();
      this.showUserListView();
    },

    //Display the "send a message" view on user login
    showChatMessageView: function () {
      this.getRegion('chatMessages').show(new ChatMessagesView({
        collection: chatApp.collections.MessageCollection
      }));
    },

    //Hide the "send a message" view on user logout
    hideChatMessageView: function () {
      this.getRegion('chatMessages').empty();
    },

    showUserListView: function () {
      //this.getRegion('userList').show(new UserListView());
    },

    showSendMessageView: function () {
      this.getRegion('sendMessage').show(new SendMessageView());
    }
  });
});