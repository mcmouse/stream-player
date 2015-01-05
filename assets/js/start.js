/* globals require */

require.config({
  baseUrl: '/stream-player/assets/js/src',
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
        'jquery',
      ],
      exports: 'Backbone'
    },
    'backbone-localstorage': {
      deps: [
        'backbone'
      ]
    },
    'marionette': {
      deps: [
        'backbone'
      ],
      exports: 'Marionette'
    }
  },
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.3',
    socketio: 'https://cdn.socket.io/socket.io-1.2.1',
    underscore: '../libs/underscore',
    marionette: '../libs/marionette',
    backbone: '../libs/backbone',
    'backbone-localstorage': '../libs/backbone-localstorage',
    templates: '../templates',
    utilities: 'Utilities',
    models: 'models',
    controllers: 'controllers',
    collections: 'collections',
    views: 'views',
  }
});

require([
  'ChatApp'
], function (ChatApp) {
  'use strict';

  var chatApp = new ChatApp();
  chatApp.start();
});