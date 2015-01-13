/* globals require */

var ChatApp = require('ChatApp');

window.chatApp = new ChatApp();

$(function () {
  'use strict';
  window.chatApp.start();
});