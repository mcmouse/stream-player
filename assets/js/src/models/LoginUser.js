/* globals define */

/**
 * Controls setting, saving, and loading the user, as well as triggering appropriate events
 * to manage user lifecycle.
 * @return Backbone.Model LoginController
 */

define('LoginUser', [
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'models/User',
], function ($, _, Backbone, Marionette, User) {
  'use strict';

  return Backbone.Model.extend({
    //Set up localstorage from backbone.localstorage module
    localStorage: new Backbone.LocalStorage('LoginController'),

    //Set up defaults for localstorage ID and loaded user state.
    defaults: {
      id: 'LoginController',
      loggedInUser: false,
    },

    //Load a user from localstorage by using fetch to retrieve stored user state.
    loadUser: function () {
      this.fetch({
        //LoginController model exists in localstorage - can be a loaded user or a 
        //saved model with unloaded user. Triggers events for listeners.
        success: function () {
          //Needed for deep model copy to set up user model
          if (this.get('loggedInUser')) {
            this.set('currentUser', new User(this.get('currentUser')));
            this.trigger('userLoggedIn', this.get('currentUser'));
          } else {
            this.trigger('noSavedUser');
          }
        }.bind(this),

        //There was an error. Generate a new user always. 'Record not found' is the XHR
        //error message when a user does not exist, but we want to generate a new user if 
        //there is any error.
        error: function () {
          this.trigger('noSavedUser');
        }.bind(this),
      });
    },

    //Returns whether there is a loaded user.
    loadedUser: function () {
      return this.get('loggedInUser');
    },

    //Initialize the User model to generate a unique ID and save it to localstorage. 
    //Trigger necessary events.
    saveUser: function (userName) {
      this.set('currentUser', new User({
        name: userName
      }));
      this.set('loggedInUser', true);
      this.save();
      this.trigger('userLoggedIn', this.get('currentUser'));
    },

    //Delete the current User model, save the LoginController to localstorage.
    //Trigger necessary events.
    removeUser: function () {
      this.trigger('userLoggedOut', this.get('currentUser'));
      this.set('loggedInUser', false);
      this.set('currentUser', null);
      this.save();
    },

  });
});