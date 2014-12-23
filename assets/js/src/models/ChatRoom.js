/* jshint ignore:start */
var ChatRoom = (function (serverAddress) {
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

    serverAddress: serverAddress,

    initialize: function () {
      this._listener = io(this.serverAddress + '/chat');
      this._listener.on('userJoined', this.addUser);
      this._listener.on('userLeft', this.removeUser);
      this._listener.on('newMessage', this.addMessage);
    },

    addUser: function (data) {
      this.get('onlineUsers').add(new User({
        name: data.username
      }));
    },

    removeUser: function (data) {
      var onlineUsers = this.get('onlineUsers');
      var user = onlineUsers.find(function (item) {
        return item.get('name') == data.username;
      });

      if (user) {
        onlineUsers.remove(user);
      }
    },

    addMessage: function (data) {
      this.get('messages').add(new Message({
        {
          sender: data.message.sender,
          message: data.message.text
        }
      }));
    },
  });

})(serverAddress);
/* jshint ignore:end */