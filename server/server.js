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
  });

  chat.on('userJoined', function (data) {
    chat.emit('userJoined', data);
  });

  chat.on('userLeft', function (data) {
    chat.emit('userLeft', data);
  });

  chat.on('newMessage', function (data) {
    chat.emit('newMessage', data);
  });

  webcams.on('connection', function (data) {
    console.log(data);
  });

})();