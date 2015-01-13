/* jshint node:true */

'use strict';

/**
 * Collection view for listing all messages
 * @return Marionette.CollectionView ChatMessagesView
 */

var Marionette = require('backbone-shim').Marionette,
  MessageView = require('views/chat/MessageView');

module.exports = Marionette.CollectionView.extend({
  childView: MessageView,
});