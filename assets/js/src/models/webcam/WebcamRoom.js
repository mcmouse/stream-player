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
    rtc.on('add remote stream', this.addWebcam.bind(this));
    rtc.on('disconnect stream', this.removeWebcam.bind(this));

  },

  //Alias to emit socket events
  broadcast: function (event, data) {
    rtc._socket.send(JSON.stringify({
      'eventName': event,
      'data': data
    }));
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
  addWebcam: function (stream, socket) {
    this.get('onlineWebcams').add(new DisplayWebcam({
      feedId: socket,
      src: URL.createObjectURL(stream),
    }));
    chatApp.channels.webcamRoomChannel.trigger('webcamAdded');
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