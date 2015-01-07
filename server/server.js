/* globals require */
(function () {
  'use strict';

  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var _ = require('underscore');

  server.listen(8081);

  var chat = io.of('/chat');
  var webcams = io.of('/webcams');

  var users = {};

  chat.on('connection', function (socket) {
    console.log('user joined!');

    socket.on('userJoined', function (data) {
      console.log('broadcasting new user with name ' + data.username);
      users[data.id] = data.username;

      chat.emit('userJoined', data);
    });

    socket.on('getUsers', function () {
      socket.emit('userList', users);
    });

    socket.on('userLeft', function (data) {

      delete users[data.id];
      chat.emit('userLeft', data);
    });

    socket.on('newMessage', function (data) {
      console.log('broadcasting message from user ' + data.username + ' with message ' + data.message);
      chat.emit('newMessage', data);
    });
  });

  webcams.on('connection', function (data) {
    console.log(data);
  });

})();