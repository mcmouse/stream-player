/* jshint node:true */

/**
 * Collection view for listing all messages
 * @return Marionette.CollectionView WebcamCollectionView
 */

var Marionette = require('backbone-shim').Marionette,
  DisplayWebcamView = require('views/webcam/DisplayWebcamView');


module.exports = Marionette.CollectionView.extend({
  childView: DisplayWebcamView,
  attributes: {
    class: 'display-webcams',
  },
});