/* globals _, ChatRoom */
(function (window, $, _, undefined) {
  'use strict';

  var MainController = function () {

    return {
      init: function () {
        var options = {
          serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
        };

        this.chatRoom = new ChatRoom(options);
      }
    };
  };


  $(function () {
    var mainController = new MainController();
    mainController.init();

    window.mainController = mainController;
  });

})(window, $, _);