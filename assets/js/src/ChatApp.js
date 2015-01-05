/* globals _, Marionette, ChatRoomController */

/**
 * Creates the main application, sets up internal models and views, handles app
 * lifecycle management and delegation, and starts the app.
 * @return Marionette.Application ChatApp
 */
(function (window, $, _, undefined) {
  'use strict';

  var ChatApp = (function () {

    return Marionette.Application.extend({
      initialize: function () {

        //Set up app defaults
        var chatOptions = {
          serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
        };

        //Set up chat room
        this.chatRoomController = new ChatRoomController(chatOptions);
      }
    });
  })();


  $(function () {
    //Initialize app
    var chatApp = new ChatApp({
      container: '#chat-app'
    });

    window.chatApp = chatApp;

    //Start app
    chatApp.start();
  });

})(window, $, _);