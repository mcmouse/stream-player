// this.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;

// this.hasUserMedia = function () {
//   return !!this.getUserMedia;
// };

// this.errorCallback = function (e) {
//   console.log('Error: ', e);
// };

// if (this.hasUserMedia) {
//   $button.click(function () {
//     this.loadUserMedia();
//   }.bind(this));
// } else {
//   console.log('getUserMedia() is not supported in your browser');
// }

// this.loadUserMedia = function () {
//   var settings = {
//     video: true,
//     audio: true,
//   };

//   this.getUserMedia.call(navigator, settings, this.displayVideo, this.errorCallback);

// };

// var options = {
//   sources: [this.src],
//   preload: 'auto',
//   techOrder: ['flash', 'html5'],
//   autoplay: true,
//   width: 600,
//   height: 400
// };

// this.videoplayer = videojs('output-video', options);