/* globals Backbone, User */
var UserCollection = (function () {
  'use strict';

  return Backbone.Collection.extend({
    model: User,
  });
})();