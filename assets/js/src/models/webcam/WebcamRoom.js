/* globals chatApp */
/* jshint node:true */

'use strict';

/**
 * Manages communication with node.js server over socket.io for adding/removing
 * webcams from the display area
 * @return Backbone.Model WebcamRoom
 */

var Backbone = require('backbone-shim').Backbone,
  io = require('socket.io-client'),
  DisplayWebcam = require('models/webcam/DisplayWebcam'),
  InputWebcam = require('models/webcam/InputWebcam');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.set('onlineWebcams', chatApp.collections.WebcamCollection);

    //Set up socketIO listeners
    this._listener = io(chatApp.options.serverAddress + '/webcams');

    //Listen to broadcasts from socket
    this._listener.on('webcamJoined', this.addWebcam.bind(this));
    this._listener.on('webcamLeft', this.removeWebcam.bind(this));
    this._listener.on('webcamList', this.setInitialWebcams.bind(this));

    this.loadInitialWebcams();
  },

  //Alias to emit socket events
  broadcast: function (event, data) {
    this._listener.emit(event, data);
  },

  //Request our initial group of users
  loadInitialWebcams: function () {
    this.broadcast('getWebcams');
  },

  setInitialWebcams: function (webcams) {},

  addWebcam: function () {

  },

  loadInitialUsers: function () {

  },

  addLocalWebcam: function () {

  },

  removeWebcam: function () {

  },

  removeLocalWebcam: function () {

  },

});