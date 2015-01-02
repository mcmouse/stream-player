/* globals Backbone, Utilities */
var User = (function () {
  'use strict';

  return Backbone.Model.extend({
    defaults: {
      id: Utilities.getGUID()
    },
  });
})();