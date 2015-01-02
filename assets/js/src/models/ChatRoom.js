/* jshint ignore:start */
var ChatRoom = (function () {
  'use strict';

  return Backbone.Model.extend({
    defaults: {
      onlineUsers: new UserCollection(),

      messages: new MessageCollection([
        new Message({
          sender: '',
          message: 'Chat Server v.1'
        })
      ]),
    },

    initialize: function () {
      this._listener = io(this.get('serverAddress') + '/chat');
      this._listener.on('userJoined', this.addUser.bind(this));
      this._listener.on('userLeft', this.removeUser.bind(this));
      this._listener.on('newMessage', this.addMessage.bind(this));
    },

    broadcast: function (event, data) {
      this._listener.emit(event, data);
    },

    hasUser: function (userName) {
      var onlineUsers = this.get('onlineUsers');
      var user = onlineUsers.find(function (item) {
        return item.get('name') == data.username;
      });
      return user;
    },

    addUser: function (data) {
      var user = this.hasUser(data.username);
      //If the user does not exist in the chatroom, add them
      if (!user) {
        this.get('onlineUsers').add(new User({
          id: data.id,
          name: data.username
        }));
        this.trigger('userAdded');
      }
      //Otherwise trigger a "user exists" event
      else {
        this.trigger('userExists');
      }
    },

    addLocalUser: function (user) {
      this.broadcast("userJoined", {
        id: user.get('id'),
        username: user.get('name')
      });
    },

    removeUser: function (data) {
      user = this.hasUser(data.username);
      if (user) {
        onlineUsers.remove(user);
        this.trigger('userRemoved');
      }
    },

    removeLocalUser: function (user) {
      this.broadcast('userLeft', {
        id: user.get('id'),
        username: user.get('name')
      });
    },

    addMessage: function (data) {
      this.get('messages').add(new Message({
        sender: data.message.sender,
        message: data.message.text
      }));
      this.trigger('messageSent');
    },
  });

})();
/* jshint ignore:end */