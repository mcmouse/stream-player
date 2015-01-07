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
    'backbone.localstorage': {
      deps: [
        'backbone'
      ],
      exports: 'Backbone.LocalStorage',
    },
    'backbone.babysitter': {
      deps: [
        'backbone'
      ],
      exports: 'Backbone.BabySitter'
    },
    'backbone.radio': {
      deps: [
        'backbone'
      ],
      exports: 'Backbone.Radio'
    },
    'backbone.marionette': {
      deps: [
        'backbone',
        'backbone.babysitter',
        'backbone.radio',
      ],
      exports: 'Marionette'
    },
    'backbone.marionette.radio.shim': {
      deps: [
        'backbone.marionette'
      ],
    }
  },
  map: {
    '*': {
      'backbone.wreqr': 'backbone.radio'
    }
  },
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.3',
    socketio: 'https://cdn.socket.io/socket.io-1.2.1',
    underscore: '../libs/underscore',
    backbone: '../libs/backbone',
    'backbone.marionette': '../libs/marionette',
    'backbone.marionette.radio.shim': '../libs/marionette-radio-shim',
    'backbone.localstorage': '../libs/backbone-localstorage',
    'backbone.radio': '../libs/backbone-radio',
    'backbone.babysitter': '../libs/backbone-babysitter',
    templates: '../../templates',
    text: '../libs/text',
  }
});

require([
  'ChatApp', 'backbone.marionette', 'backbone.marionette.radio.shim',
], function (ChatApp) {
  'use strict';

  window.chatApp = new ChatApp();
  chatApp.start();
});