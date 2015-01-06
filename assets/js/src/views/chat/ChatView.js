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
  'text!templates/ChatRoom',
], function ($, _, Backbone, Marionette, UserListView, ChatMessagesView, SendMessageView, ChatRoomTemplate) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: _.template(ChatRoomTemplate),
    regions: {
      //userList: '#user-list',
      chatMessages: '#chat-messages',
      //sendMessage: '#send-message'
    },

    initialize: function () {
      this.getRegion('chatMessages').show(new ChatMessagesView({
        collection: chatApp.collections.MessageCollection
      }));
      //this.getRegion('userList').show(new UserListView());
      //this.getRegion('content').show(new SendMessageView());
    }
  });
});