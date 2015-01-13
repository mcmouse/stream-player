/* jshint node:true */

'use strict';

/**
 * Collection view for listing all users
 * @return Marionette.CollectionView UserListView
 */

var Backbone = require('backbone-shim').Backbone,
  Marionette = require('backbone-shim').Marionette,
  UserView = require('views/chat/UserView');

module.exports = Marionette.CollectionView.extend({
  childView: UserView,
});