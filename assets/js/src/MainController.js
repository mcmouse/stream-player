/* globals _, ChatRoom */
var MainController = (function (window, $, _, undefined) {
  'use strict';

  return {
    init: function () {
      this.chatRoom = new ChatRoom();
    }
  };
})(window, $, _);


$(function () {
  'use strict';

  var mainController = new MainController();
  mainController.init();
});