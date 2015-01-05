/* globals require */

require.config({
  baseUrl: '/stream-player/assets/js/libs',
  shim: {
    'socketio': {
      exports: 'io'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'marionette': {
      deps: [
        'backbone'
      ],
      exports: 'Marionette'
    }
  },
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.3.js',
    socketio: 'https://cdn.socket.io/socket.io-1.2.1.js',
    templates: '../templates',
    utilities: '/stream-player/assets/js/src/Utilities',
    models: '/stream-player/assets/js/src/models',
    controllers: '/stream-player/assets/js/src/controllers',
    collections: '/stream-player/assets/js/src/collections',
    views: '/stream-player/assets/js/src/views',
  }
});

require([
  'js/src/ChatApp'
], function (ChatApp) {
  'use strict';

  ChatApp.start();
});