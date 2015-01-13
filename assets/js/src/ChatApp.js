/* jshint node:true */

'use strict';

/**
 * Creates the main application, sets up internal models and views, handles app
 * lifecycle management and delegation, and starts the app.
 * @return Marionette.Application ChatApp
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  ChatRoomController = require('controllers/ChatRoomController'),
  WebcamRoomController = require('controllers/WebcamRoomController'),
  CurrentUser = require('models/user/CurrentUser'),
  MessageCollection = require('collections/MessageCollection'),
  UserCollection = require('collections/UserCollection'),
  WebcamCollection = require('collections/WebcamCollection');

module.exports = Marionette.Application.extend({
  container: '#chat-app',

  initialize: function () {

    //Create all shared models
    this.setupModels();
    this.setupCollections();
    this.setupOptions();
    this.setupEvents();

    this.on('start', function () {
      this.createChatRoom();
      this.createWebcamRoom();
    });
  },

  setupEvents: function () {
    this.channels = {
      localUserChannel: Backbone.Radio.channel('localUser'),
      chatRoomChannel: Backbone.Radio.channel('chatRoom'),
      webcamRoomChannel: Backbone.Radio.channel('webCamRoom'),
    };
  },

  //Set up all app models
  setupModels: function () {
    this.models = {
      CurrentUser: new CurrentUser(),
    };
  },

  //Set up all app collections
  setupCollections: function () {
    this.collections = {
      MessageCollection: new MessageCollection(),
      UserCollection: new UserCollection(),
      WebcamCollection: new WebcamCollection(),
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

  createWebcamRoom: function () {
    //this.webcamRoomController = new WebcamRoomController();
  }
});