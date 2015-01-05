/* globals _, ChatRoom, LoginView, LoginController, Marionette */

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

        //Set up models and views
        this.chatRoom = new ChatRoom(chatOptions);

        this.loginController = new LoginController();
        this.loginView = new LoginView({
          model: this.loginController
        });

        //Set up event management between LoginController and ChatRoom.
        this.listenTo(this.loginController, 'userLoaded', function (user) {
          if (!this.chatRoom.hasUser(user.get('name'))) {
            this.chatRoom.addLocalUser(user);
            this.loginView.trigger('loggedIn', user);
          } else {
            this.loginView.trigger('nameInUse');
          }
        });

        this.listenTo(this.loginView, 'userNameSet', function (userName) {

          if (!this.chatRoom.hasUser(userName)) {
            this.loginController.saveUser(userName);
          } else {
            this.loginView.trigger('nameInUse');
          }
        });

        this.listenTo(this.chatRoom, 'userAdded', function () {
          console.log('user added to chatroom from server');
        });

        this.listenTo(this.loginController, 'userLoggedOut', function (user) {
          this.chatRoom.removeLocalUser(user);
        });

        this.listenTo(this.chatRoom, 'userRemoved', function () {
          console.log('user removed from chatroom from server');
        });
      }
    });
  })();


  $(function () {
    var chatApp = new ChatApp({
      container: '#chat-app'
    });

    window.chatApp = chatApp;

    chatApp.start();
  });

})(window, $, _);