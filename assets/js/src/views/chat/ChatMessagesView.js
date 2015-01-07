/* globals define */

/**
 * Collection view for listing all messages
 * @return Marionette.CollectionView ChatMessagesView
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/chat/MessageView',
], function ($, _, Backbone, Marionette, MessageView) {
  'use strict';

  return Marionette.CollectionView.extend({
    childView: MessageView,
  });
});