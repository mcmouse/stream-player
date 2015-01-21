/* globals chatApp, _ */
/* jshint node:true */

'use strict';

/**
 * Manages communication with node.js server over socket.io for adding/removing
 * webcams from the display area
 * @return Backbone.Model WebcamRoom
 */

var Backbone = require('backbone-shim').Backbone,
  DisplayWebcam = require('models/webcam/DisplayWebcam'),
  rtc = require('webrtc.io-client');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.set('onlineWebcams', chatApp.collections.WebcamCollection);

    //Set up webrtc.io listeners
    rtc.connect(chatApp.options.webRTCAddress, '');

    //Listen to broadcasts from socket
    rtc.on('new_peer_connected', this.addWebcam.bind(this));
    rtc.on('remove_peer_connected', this.removeWebcam.bind(this));
    rtc.on('get_peers', this.setWebcams.bind(this));

    //this.loadInitialWebcams();
  },

  //Alias to emit socket events
  broadcast: function (event, data) {
    rtc._socket.send({
      'eventName': event,
      'data': data
    });
  },

  //Request our initial group of webcams
  // loadInitialWebcams: function () {
  //   this.broadcast('join_room', {
  //     room: '',
  //   });
  // },

  //Load our initial webcams from the server
  setWebcams: function (data) {
    _.each(data.connections, function (webcam) {
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
  addWebcam: function (data) {
    this.get('onlineWebcams').add(new DisplayWebcam({
      feedId: data.socketId,
      src: URL.createObjectURL(data.stream),
    }));
    chatApp.channels.webcamRoomChannel.trigger('webcamAdded');
  },

  //Add a webcam locally by broadcasting to the server
  //Not needed because webrtc.io handles implicitly?
  addLocalWebcam: function () {
    //this.broadcast('close', feedId);
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
  removeLocalWebcam: function () {
    this.broadcast('close_stream');
  },

});