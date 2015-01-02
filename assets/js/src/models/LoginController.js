/* globals Backbone, User */
var LoginController = (function () {
  'use strict';

  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('LoginController'),

    defaults: {
      id: 'LoginController',
      loadedUser: false,
    },

    loadUser: function () {
      this.fetch({
        success: function () {
          //Needed for deep model copy
          this.set('currentUser', new User(this.get('currentUser')));
          this.trigger('userLoaded', this.get('currentUser'));
        }.bind(this),

        error: function (model, xhr) {
          if (xhr === 'Record not found.') {
            this.trigger('noSavedUser');
          }
        }.bind(this),
      });
    },

    loadedUser: function () {
      return this.get('loadedUser');
    },

    saveUser: function (userName) {
      this.set('currentUser', new User({
        name: userName
      }));
      this.set('loadedUser', true);
      this.save();
      this.trigger('userLoaded', this.get('currentUser'));
    },

    removeUser: function () {
      this.trigger('userLoggedOut', this.get('currentUser'));
      this.set('loadedUser', false);
      this.set('currentUser', null);
      this.save();
    },

  });
})();