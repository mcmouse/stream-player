/* globals define, chatApp */

/**
 * Manages the ChatRoom by delegating events
 * @return Marionette.Object ChatRoomController
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/chat/ChatRoom',
  'models/user/CurrentUser',
  'models/login/LoginViewModel',
  'models/chat/ChatViewModel',
  'views/login/LoginView',
  'views/chat/ChatView',
], function ($, _, Backbone, Marionette, ChatRoom, CurrentUser, LoginViewModel, ChatViewModel, LoginView, ChatView) {
  'use strict';

  return Marionette.Object.extend({
    initialize: function () {
      //Initialize chat room
      this.chatRoom = new ChatRoom();

      this.chatView = new ChatView({
        model: new ChatViewModel(),
      }).render();

      this.chatView.showInitialRegions();

      //Initialize login flow
      this.loginView = new LoginView({
        model: new LoginViewModel(),
        currentUser: chatApp.models.CurrentUser,
      }).render();

      //Set up event listeners
      this.setupEvents();
    },

    setupEvents: function () {
      //Set up event management

      //Update chat room when user logs in or logs out
      chatApp.channels.localUserChannel.on({
        'userLoggedIn': this.setLoggedInUser,
        'userLoggedOut': this.removeLoggedInUser,
      }, this);

      //Set name in use
      chatApp.channels.localUserChannel.comply({
        'nameInUse': this.setNameInUse
      }, this);

      //Log when user is added or removed froms erver
      chatApp.channels.chatRoomChannel.on({
        'userNameSet': this.isNameInUse,
        'userAdded': this.userAddedFromServer,
        'userRemoved': this.userRemovedFromServer,
        'messageSent': this.addMessageToChatRoom,
      }, this);

      chatApp.channels.chatRoomChannel.reply({
        'isUserNameInUse': this.isNameInUse,
      }, this);
    },

    setLoggedInUser: function (user) {
      this.addUserToChatRoom(user);
      this.chatView.showSendMessageView();
      this.listenTo(this.chatView.getRegion('sendMessage').currentView, 'messageSent', this.addMessageToChatRoom);
    },

    removeLoggedInUser: function (user) {
      this.removeUserFromChatRoom(user);
      this.stopListening(this.chatView.getRegion('sendMessage').currentView);
      this.chatView.hideSendMessageView();
    },

    //Add local user to chat room and update view
    addUserToChatRoom: function (user) {
      this.chatRoom.addLocalUser(user);
    },

    //Remove local user from chat room
    removeUserFromChatRoom: function (user) {
      this.chatRoom.removeLocalUser(user);
    },

    //Add a message to the chat room
    addMessageToChatRoom: function (message) {
      this.chatRoom.addLocalMessage({
        username: chatApp.models.CurrentUser.getName(),
        message: message,
      });
    },

    //Logging for server add/remove
    userAddedFromServer: function () {},

    //Logging for server add/remove
    userRemovedFromServer: function (data) {
      if (data.username === chatApp.models.CurrentUser.getName()) {
        chatApp.models.CurrentUser.removeUser();
      }
    },

    //Check if chat room contains name
    isNameInUse: function (userName) {
      return this.chatRoom.hasUser(userName);
    },

    //Set name is in use
    setNameInUse: function () {
      this.chatView.hideSendMessageView();
      this.loginView.showNameInUse();
    },

  });
});