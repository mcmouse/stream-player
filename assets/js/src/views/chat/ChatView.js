/* globals define */

/**
 * View for displaying the collection of messages
 * @return Marionette.Application ChatApp
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'ChatApp',
  'views/chat/UserListView',
  'views/chat/ChatMessagesView',
  'views/chat/SendMessageView',
  'text!templates/ChatRoom',
], function ($, _, Backbone, Marionette, App, UserListView, ChatMessagesView, SendMessageView, ChatRoomTemplate) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: _.template(ChatRoomTemplate),
    regions: {
      //userList: '#user-list',
      chatMessages: '#chat-messages',
      //sendMessage: '#send-message'
    },

    initialize: function (options) {
      if (options.messageCollection) {
        this.getRegion('chatMessages').show(new ChatMessagesView({
          collection: App.collections.MessageCollection
        }));
      }
      //this.getRegion('userList').show(new UserListView());
      //this.getRegion('content').show(new SendMessageView());
    }
  });
});