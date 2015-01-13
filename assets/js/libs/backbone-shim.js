/* jshint node:true */

var _ = require('underscore');
window._ = _;
var $ = require('jquery');
window.$ = $;
var Backbone = require('backbone');
Backbone.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');
Backbone.BabySitter = require('backbone.babysitter');
Backbone.Radio = require('backbone.radio');
var Marionette = require('marionette-radio-shim');

module.exports = {
  Backbone: Backbone,
  Marionette: Backbone.Marionette
};