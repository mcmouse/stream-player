/* globals define */

/**
 * Manages the ChatRoom by delegating events
 * @return Marionette.Object ChatRoomManager
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'models/ChatRoom',
  'models/CurrentUser',
  'models/LoginViewModel',
  'views/LoginView',
], function ($, _, Backbone, Marionette, ChatRoom, CurrentUser, LoginViewModel, LoginView) {
  'use strict';

  return Marionette.Object.extend({
    initialize: function (options) {
      //Initialize chat room
      this.chatRoom = new ChatRoom({
        serverAddress: options.serverAddress,
      });

      //Initialize login flow
      this.currentUser = new CurrentUser();
      this.loginView = new LoginView({
        model: new LoginViewModel(),
        currentUser: this.currentUser,
      }).render();

      //Set up event listeners
      this.setupEvents();
    },

    setupEvents: function () {
      //Set up event management

      //Update chat room when user logs in or logs out
      this.listenTo(this.currentUser, {
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
        this.loginUser.saveUser(userName);
      } else {
        this.loginView.trigger('nameInUse');
      }
    },

  });
});