/* globals define */

/** 
 * Collection of all messages in the current room
 * return Backbone.Collection MessageCollection
 */
define([
  'backbone',
  'models/Message',
], function (Backbone, Message) {
  'use strict';

  return Backbone.Collection.extend({
    model: Message,
  });
});