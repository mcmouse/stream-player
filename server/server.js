/* jshint node:true */

/**
 * Socket.io server for handling real-time message passing, user connects and disconnects,
 * and webcam connects and disconnects.
 */

(function () {
  'use strict';

  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var _ = require('underscore');
  var webRTC = require('webrtc.io').listen(8082);

  server.listen(8081);

  //Bind chatrooms
  var chat = io.of('/chat');
  var webcams = io.of('/webcams');

  var users = {};
  var feeds = [];

  //Logic to handle chat users and messages
  chat.on('connection', function (socket) {
    console.log('Initial user connection!');

    //Initial user list request
    socket.on('getUsers', function () {
      console.log('Broadcasting user list with number of users ' + _.size(users));
      socket.emit('userList', users);
    });

    //User logged in. Attach ID to socket for cleanup later and rebroadcast
    socket.on('userJoined', function (data) {
      console.log('Broadcasting new user with name ' + data.username);
      users[data.id] = data;
      socket.user = data;
      chat.emit('userJoined', data);
    });

    //User logged out, clean up and rebroadcast
    socket.on('userLeft', function (data) {
      console.log('Broadcasting user logout');
      if (socket.user) {
        delete socket.user;
      }
      delete users[data.id];
      chat.emit('userLeft', data);
    });

    //Client send message, rebroadcast
    socket.on('newMessage', function (data) {
      console.log('Broadcasting message from user ' + data.username + ' with message ' + data.message);
      chat.emit('newMessage', data);
    });

    //User disconnected
    socket.on('disconnect', function () {
      console.log('Emitting userLeft because of disconnect. Socket user is: ' + (typeof socket.user));
      if (socket.user) {
        chat.emit('userLeft', {
          username: users[socket.user.id].username,
          id: socket.user.id
        });
        delete users[socket.user.id];
        delete socket.user;
      }
    });
  });

  //Logic to handle webcams
  webcams.on('connection', function (socket) {

    //Initial webcam list request
    socket.on('getWebcams', function () {
      console.log('Broadcasting webcam list with number of webcams ' + _.size(feeds));
      socket.emit('userList', feeds);
    });

    //New webcam joined, add to internal list and attach to socket so it can be
    //cleaned up on disconnect/logout
    socket.on('webcamJoined', function (feedId) {
      console.log('Broadcasting new webcam with feed ID ' + feedId);
      feeds.push(feedId);
      socket.feed = feedId;
      webcams.emit('webcamJoined', feedId);
    });

    //User logged out or disconnected webcam. Detach and rebroadcast.
    socket.on('webcamLeft', function (feedId) {
      console.log('Broadcasting webcam disconnect');
      if (socket.feed) {
        delete socket.feed;
      }
      feeds = _.without(feeds, feedId);
      webcams.emit('webcamLeft', feedId);
    });

    //User disconnected
    socket.on('disconnect', function () {
      console.log('Emitting webcamLeft because of disconnect. Socket webcam id is: ' + socket.feed);
      if (socket.feed) {
        webcams.emit('webcamLeft', socket.feed);
        feeds = _.without(feeds, socket.feed);
        delete socket.feed;
      }
    });
  });

})();