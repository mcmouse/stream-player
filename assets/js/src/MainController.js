/* globals _, ChatRoom */
var MainController = (function (window, $, _, undefined) {
  'use strict';

  return {
    init: function () {
      var options = {
        serverAddress: 'http://ec2-54-149-64-14.us-west-2.compute.amazonaws.com:8081',
      };

      this.chatRoom = new ChatRoom(options);
    }
  };
})(window, $, _);


$(function () {
  'use strict';

  var mainController = new MainController();
  mainController.init();

  window.mainController = mainController;
});