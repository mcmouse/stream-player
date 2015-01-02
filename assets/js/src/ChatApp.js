/* globals _, ChatRoom, LoginController, Marionette */
(function (window, $, _, undefined) {
  'use strict';

  var ChatApp = (function () {

    return Marionette.Application.extend({
      initialize: function () {
        var options = {
          serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
        };

        this.chatRoom = new ChatRoom(options);
        this.loginController = new LoginController();

        this.listenTo(this.loginController, 'userLoaded', function (name) {
          console.log('user was loaded with name ' + name);
        });

        this.listenTo(this.loginController, 'noSavedUser', function () {
          console.log('no saved user found');
          if (!this.chatRoom.hasUser('new user')) {
            this.loginController.saveUser('new user');
          } else {
            console.log('user exists');
          }
        });

        this.loginController.loadUser();
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