/* globals require */

require.config({
  baseUrl: 'js/libs',
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
    utilities: 'js/src/Utilities',
    models: 'js/src/models',
    controllers: 'js/src/controllers',
    collections: 'js/src/collections',
    views: 'js/src/views',
  }
});

require([
  'js/src/ChatApp'
], function (ChatApp) {
  'use strict';

  ChatApp.start();
});