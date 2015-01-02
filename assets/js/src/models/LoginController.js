/* globals Backbone, User, chatApp */
var LoginController = (function () {
  'use strict';

  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('LoginController'),

    defaults: {
      id: 'LoginController',
      loadedUser: false,
    },

    initialize: function () {
      this.loadUser();

      this.on('userLoaded', function (name) {
        console.log('user was loaded with name ' + name);
      });

      this.on('noSavedUser', function () {
        console.log('no saved user found');
        this.saveUser('new user');
      });
    },

    loadUser: function () {
      this.fetch({
        success: function () {
          this.trigger('userLoaded', this.currentUser.get('name'));
        }.bind(this),

        error: function (model, xhr) {
          if (xhr === 'Record not found.') {
            this.trigger('noSavedUser');
          }
        }.bind(this),
      });
    },

    saveUser: function (userName) {
      if (chatApp.chatRoom.hasUser(userName)) {
        this.trigger('userExists');
      } else {
        this.set('currentUser', new User({
          name: userName
        }));
        this.set('loadedUser', true);
        this.save();
        chatApp.chatRoom.addLocalUser(this.currentUser);
        this.trigger('userLoaded');
      }
    },

  });
})();