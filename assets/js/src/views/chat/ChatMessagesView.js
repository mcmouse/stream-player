/* globals define */

/**
 * Collection view for listing all messages
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/chat/MessageView',
], function ($, _, Backbone, Marionette, MessageView) {
  'use strict';

  return Marionette.CollectionView.extend({
    childView: MessageView,
  });
});