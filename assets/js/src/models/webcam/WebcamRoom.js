/* jshint node:true */

'use strict';

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette;

/**
 * Manages the ChatRoom by delegating events
 * @return Marionette.Object ChatRoomController
 */
// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'backbone.marionette',
//   'models/chat/ChatRoom',
//   'models/user/CurrentUser',
//   'models/login/LoginViewModel',
//   'models/chat/ChatViewModel',
//   'views/login/LoginView',
//   'views/chat/ChatView',
// ], function ($, _, Backbone, Marionette, ChatRoom, CurrentUser, LoginViewModel, ChatViewModel, LoginView, ChatView) {
//   'use strict';

//   return Marionette.Object.extend({
//     addWebcam: function () {

//     },

//     removeWebcam: function () {

//     },

//     addLocalWebcam: function () {

//     }
//   });
// });