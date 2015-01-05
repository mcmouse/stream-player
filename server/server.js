/* globals require */
(function () {
  'use strict';

  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  server.listen(8081);

  var chat = io.of('/chat');
  var webcams = io.of('/webcams');

  chat.on('connection', function (socket) {
    console.log('user joined!');

    socket.on('userJoined', function (data) {
      console.log('broadcasting new user with name ' + data.username);
      socket.emit('userJoined', data);
    });

    socket.on('userLeft', function (data) {
      socket.emit('userLeft', data);
    });

    socket.on('newMessage', function (data) {
      console.log('broadcasting message from user ' + data.username + ' with message ' + data.message);
      socket.emit('newMessage', data);
    });
  });


  webcams.on('connection', function (data) {
    console.log(data);
  });

})();