/* jshint node:true */

'use strict';
var Marionette = require('backbone-shim').Marionette,
  ErrorTemplate = require('Error.html');

module.exports = Marionette.ItemView.extend({
  template: ErrorTemplate,
  attributes: {
    class: 'error',
  }
});