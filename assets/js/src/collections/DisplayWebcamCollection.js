/* globals Backbone, DisplayWebcam */
var DisplayWebcamCollection = (function () {
  'use strict';

  return Backbone.Collection.extend({
    model: DisplayWebcam,
  });
})();