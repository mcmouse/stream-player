/* globals define */

/**
 * Creates the main application, sets up internal models and views, handles app
 * lifecycle management and delegation, and starts the app.
 * @return Marionette.Application ChatApp
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'controllers/ChatRoomController',
  'models/user/CurrentUser',
  'collections/MessageCollection',
  'collections/UserCollection',

], function ($, _, Backbone, Marionette, ChatRoomController, CurrentUser, MessageCollection, UserCollection) {
  'use strict';

  return Marionette.Application.extend({
    container: '#chat-app',

    initialize: function () {

      //Create all shared models
      this.setupModels();
      this.setupCollections();
      this.setupOptions();

      this.on('start', this.createChatRoom);
    },

    //Set up all app models
    setupModels: function () {
      this.models = {
        CurrentUser: new CurrentUser()
      };
    },

    //Set up all app collections
    setupCollections: function () {
      this.collections = {
        MessageCollection: new MessageCollection(),
        UserCollection: new UserCollection(),
      };
    },

    //Set up app options
    setupOptions: function () {
      this.options = {
        serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
      };
    },

    createChatRoom: function () {
      //Set up chat room
      this.chatRoomController = new ChatRoomController();
    },
  });

});