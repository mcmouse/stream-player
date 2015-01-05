/* globals define */

/**
 * Object containing global helper functions.
 * @return Object Utilities
 */
define('Utilities', [], function () {
  'use strict';

  return {
    //GUID generation from backbone-localstorage.js, lines 11 and 15
    getGUID: function () {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    },
  };
});