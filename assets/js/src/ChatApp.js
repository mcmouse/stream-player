/* globals _, ChatRoom, CurrentUser, Marionette */
(function (window, $, _, undefined) {
  'use strict';

  var ChatApp = (function () {

    return Marionette.Application.extend({
      initialize: function () {
        var options = {
          serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
        };

        this.chatRoom = new ChatRoom(options);
        this.currentUser = new CurrentUser();
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