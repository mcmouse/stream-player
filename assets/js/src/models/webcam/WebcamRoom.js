/* globals chatApp, _ */
/* jshint node:true */

'use strict';

/**
 * Manages communication with node.js server over socket.io for adding/removing
 * webcams from the display area
 * @return Backbone.Model WebcamRoom
 */

var Backbone = require('backbone-shim').Backbone,
  io = require('socket.io-client'),
  DisplayWebcam = require('models/webcam/DisplayWebcam');

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

  //Request our initial group of webcams
  loadInitialWebcams: function () {
    this.broadcast('getWebcams');
  },

  //Load our initial webcams from the server
  setInitialWebcams: function (webcams) {
    _.each(webcams, function (webcam) {
      this.addWebcam(webcam);
    }, this);
  },

  //Check if we currently have a webcam with the given feedId
  hasWebcam: function (feedId) {
    var onlineWebcams = this.get('onlineWebcams');
    var user = onlineWebcams.find(function (item) {
      return item.get('feedId') == feedId;
    });
    return user;
  },

  //Add a webcam to the collection
  addWebcam: function (feedId) {
    this.get('onlineWebcams').add(new DisplayWebcam({
      feedId: feedId
    }));
    chatApp.channels.webcamRoomChannel.trigger('webcamAdded');
  },

  //Add a webcam locally by broadcasting to the server
  addLocalWebcam: function (feedId) {
    this.broadcast('webcamJoined', feedId);
  },

  //Remove a webcam from the collection
  removeWebcam: function (feedId) {
    var webcam = this.hasWebcam(feedId);
    if (webcam) {
      this.get('onlineWebcams').remove(webcam);
      chatApp.channels.webcamRoomChannel.trigger('webcamRemoved');
    }
  },

  //Remove a webcam locally
  removeLocalWebcam: function (feedId) {
    this.broadcast('webcamLeft', feedId);
  },

});