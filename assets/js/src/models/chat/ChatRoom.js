/* globals define, chatApp */

/**
 * Contains all logic necessary for running the chat room and communicating with the server.
 * @return Backbone.Model ChatRoom
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'socketio',
  'models/user/User',
  'models/chat/Message',
], function ($, _, Backbone, Marionette, io, User, Message) {
  'use strict';

  return Backbone.Model.extend({
    //Initialize our socket.io listener and set up events for adding and removing users
    //and adding events
    initialize: function () {
      //Create our collection of online users
      this.set('onlineUsers', chatApp.collections.UserCollection);

      //Create our collection of messages
      this.set('messages', chatApp.collections.MessageCollection);

      //Set up socketIO listeners
      this._listener = io(chatApp.options.serverAddress + '/chat');
      this._listener.on('userJoined', this.addUser.bind(this));
      this._listener.on('userLeft', this.removeUser.bind(this));
      this._listener.on('newMessage', this.addMessage.bind(this));
      this._listener.on('userList', this.setInitialUsers.bind(this));

      this.loadInitialUsers();

      //Add initial message
      this.addMessage({
        username: 'ChatRoom',
        message: 'Welcome to the chat room'
      });
    },

    //Request our initial group of users
    loadInitialUsers: function () {
      this.broadcast('getUsers');
    },

    //Set our initial users on server response
    setInitialUsers: function (users) {
      for (var user in users) {
        this.addUser({
          id: user,
          username: users[user]
        });
      }
    },

    //Alias to emit socket events
    broadcast: function (event, data) {
      this._listener.emit(event, data);
    },

    //Test user collection for a particular userName.
    //Returns user model or undefined
    hasUser: function (userName) {
      var onlineUsers = this.get('onlineUsers');
      var user = onlineUsers.find(function (item) {
        return item.get('name') == userName;
      });
      return user;
    },

    //Add a user to the collection if the are not already added.
    addUser: function (data) {
      var user = this.hasUser(data.username);
      //If the user does not exist in the chatroom, add them
      if (!user) {
        this.get('onlineUsers').add(new User({
          id: data.id,
          name: data.username
        }));
        this.trigger('userAdded');
      }
      //Otherwise trigger a "user exists" event
      else {
        this.trigger('userExists');
      }
    },

    //Add a local user by broadcasting the "userJoined" event
    addLocalUser: function (user) {
      this.broadcast('userJoined', {
        id: user.get('id'),
        username: user.get('name')
      });
    },

    //Remove a user from the collection if they exist in the collection.
    removeUser: function (data) {
      var user = this.hasUser(data.username);
      if (user) {
        this.get('onlineUsers').remove(user);
        this.trigger('userRemoved', data);
      }
    },

    //Remove a local user by broadcasting the "userLeft" event
    removeLocalUser: function (user) {
      this.broadcast('userLeft', {
        id: user.get('id'),
        username: user.get('name')
      });
    },

    //Add a message to the collection
    addMessage: function (data) {
      this.get('messages').add(new Message(data));
      this.trigger('messageSent');
    },

    //Broadcasts a local message to the chatroom
    addLocalMessage: function (data) {
      this.broadcast('newMessage', data);
    }
  });

});