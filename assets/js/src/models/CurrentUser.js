/* globals Backbone, User, ChatApp */
var CurrentUser = (function () {
  'use strict';

  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('current-user'),

    defaults: {
      id: 'current'
    },

    initialize: function () {
      this.fetch({
        success: function (model, response, options) {
          console.log(model);
        },
        error: function (model, xhr) {
          if (xhr === 'Record not found.') {
            this.set('test', 'some value');
            this.save();
          }
        }.bind(this)
      });
    }
  });
})();