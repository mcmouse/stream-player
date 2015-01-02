/* globals _, ChatRoom, LoginView, LoginController, Marionette */
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
        this.loginView = new LoginView({
          model: this.loginController
        });

        this.listenTo(this.loginController, 'userLoaded', function (user) {
          if (!this.chatRoom.hasUser(user.get('name'))) {
            this.chatRoom.addLocalUser(user);
            this.loginView.trigger('loggedIn');
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