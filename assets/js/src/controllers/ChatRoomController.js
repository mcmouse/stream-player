/* globals define, chatApp */

/**
 * Manages the ChatRoom by delegating events
 * @return Marionette.Object ChatRoomManager
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'ChatApp',
  'models/chat/ChatRoom',
  'models/user/CurrentUser',
  'models/login/LoginViewModel',
  'models/chat/ChatViewModel',
  'views/login/LoginView',
  'views/chat/ChatView',
], function ($, _, Backbone, Marionette, App, ChatRoom, CurrentUser, LoginViewModel, ChatViewModel, LoginView, ChatView) {
  'use strict';

  return Marionette.Object.extend({
    initialize: function () {
      //Initialize chat room
      this.chatRoom = new ChatRoom();

      this.chatView = new ChatView({
        model: new ChatViewModel(),
      }).render();

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
      this.listenTo(chatApp.models.CurrentUser, {
        'userLoggedIn': this.addUserToChatRoom,
        'userLoggedOut': this.removeUserFromChatRoom
      });

      //Check if name is in use when view submits name change
      this.listenTo(this.loginView, {
        'userNameSet': this.isNameInUse,
      });

      //Log when user is added or removed froms erver
      this.listenTo(this.chatRoom, {
        'userAdded': this.userAddedFromServer,
        'userRemoved': this.userRemovedFromServer,
      });
    },

    //Add local user to chat room and update view
    addUserToChatRoom: function (user) {
      if (!this.chatRoom.hasUser(user.get('name'))) {
        this.chatRoom.addLocalUser(user);
        this.loginView.trigger('loggedIn', user);
      } else {
        this.loginView.trigger('nameInUse');
      }
    },

    //Remove local user from chat room
    removeUserFromChatRoom: function (user) {
      this.chatRoom.removeLocalUser(user);
    },

    //Logging for server add/remove
    userAddedFromServer: function () {
      console.log('user added to chatroom from server');
    },

    //Logging for server add/remove
    userRemovedFromServer: function () {
      console.log('user removed from chatroom from server');
    },

    //Check if chat room contains name
    isNameInUse: function (userName) {
      if (!this.chatRoom.hasUser(userName)) {
        chatApp.models.CurrentUser.saveUser(userName);
      } else {
        this.loginView.trigger('nameInUse');
      }
    },

  });
});