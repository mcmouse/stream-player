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
      socket.user = data;
      chat.emit('userJoined', data);
    });

    socket.on('getUsers', function () {
      console.log('broadcasting userList with number of users ' + _.size(users));
      socket.emit('userList', users);
    });

    socket.on('userLeft', function (data) {
      if (socket.user) {
        delete socket.user;
      }
      delete users[data.id];
      chat.emit('userLeft', data);
    });


    socket.on('newMessage', function (data) {
      console.log('broadcasting message from user ' + data.username + ' with message ' + data.message);
      chat.emit('newMessage', data);
    });

    socket.on('disconnect', function () {
      console.log('emitting userLeft because of disconnect: ' + socket.user);
      if (socket.user) {
        chat.emit('userLeft', {
          username: users[socket.user.id],
          id: socket.user.id
        });
        delete users[socket.user.id];
        delete socket.user;
      }
    });
  });

  webcams.on('connection', function (data) {
    console.log(data);
  });

})();