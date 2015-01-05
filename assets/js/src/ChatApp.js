/* globals define */

/**
 * Creates the main application, sets up internal models and views, handles app
 * lifecycle management and delegation, and starts the app.
 * @return Marionette.Application ChatApp
 */

define('ChatApp', [
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'ChatRoomController',
], function ($, _, Backbone, Marionette, ChatRoomController) {
  'use strict';

  return Marionette.Application.extend({
    container: '#chat-app',

    initialize: function () {

      //Set up app defaults
      var chatOptions = {
        serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
      };

      //Set up chat room
      this.chatRoomController = new ChatRoomController(chatOptions);
    }
  });

});