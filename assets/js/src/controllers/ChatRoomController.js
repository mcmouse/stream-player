/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Manages the ChatRoom by delegating events
 * @return Marionette.Object ChatRoomController
 */

//Need to require browsernizr tests firsts
require('browsernizr/test/webrtc/peerconnection');
require('browsernizr/test/webrtc/getusermedia');
require('browsernizr/test/websockets');

var Marionette = require('backbone-shim').Marionette,
  ChatRoom = require('models/chat/ChatRoom'),
  LoginViewModel = require('models/login/LoginViewModel'),
  LoginView = require('views/login/LoginView'),
  ChatView = require('views/chat/ChatView'),
  Modernizr = require('browsernizr');

module.exports = Marionette.Object.extend({
  initialize: function () {
    this.chatView = new ChatView().render();

    if (this.hasBrowserSupport()) {
      //Initialize chat room
      this.chatRoom = new ChatRoom();

      this.chatView.showInitialRegions();

      //Initialize login flow
      this.loginView = new LoginView({
        model: new LoginViewModel(),
        currentUser: chatApp.models.CurrentUser,
      }).render();

      //Set up event listeners
      this.setupEvents();
    } else {
      this.chatView.showError('Your browser is not supported, peasant! Get a new one!');
    }
  },

  hasBrowserSupport: function () {
    return Modernizr.websockets;
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
    if (!this.isNameInUse(user.get('name'))) {
      this.addUserToChatRoom(user);
      this.chatView.showSendMessageView();
      this.listenTo(this.chatView.getRegion('sendMessage').currentView, 'messageSent', this.addMessageToChatRoom);
    } else {
      this.setNameInUse();
    }
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
    this.loginView.model.showNameInUse();
  },

});