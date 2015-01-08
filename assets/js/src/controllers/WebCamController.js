/* globals define, chatApp */

/**
 * Manages the webcam room by delegating events
 * @return Marionette.Object ChatRoomController
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/chat/ChatRoom',
  'models/user/CurrentUser',
  'models/login/LoginViewModel',
  'models/chat/ChatViewModel',
  'views/login/LoginView',
  'views/chat/ChatView',
], function ($, _, Backbone, Marionette, ChatRoom, CurrentUser, LoginViewModel, ChatViewModel, LoginView, ChatView) {
  'use strict';

  return Marionette.Object.extend({

  });
});