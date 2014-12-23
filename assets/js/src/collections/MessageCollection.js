/* globals Backbone, Message */
var MessageCollection = (function () {
  'use strict';

  return Backbone.Collection.extend({
    model: Message,
  });
})();