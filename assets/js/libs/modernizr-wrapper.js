/* jshint node:true */

/**
 * Used for bootstrapping all Modernizr tests
 */

//Include all necessary browsernizr tests here
require('browsernizr/test/webrtc/peerconnection');
require('browsernizr/test/webrtc/getusermedia');
require('browsernizr/test/websockets');

module.exports = require('browsernizr');