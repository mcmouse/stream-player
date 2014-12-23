/* globals Backbone, User, ChatApp */
var CurrentUser = (function () {
  'use strict';

  return Backbone.Model.extend({
    defaults: {
      id: 'current'
    },

    initialize: function () {
      this.fetch({
        success: function () {
          console.log('success');
        },
        error: function (model, xhr, options) {
          console.log(model, xhr, options);
        }
      });
    }
  });
})();