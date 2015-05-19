'use strict';

/**
 * @ngdoc directive
 * @name webRtcApp.directive:myVideo
 * @description
 * # myVideo
 */
angular.module('webRtcApp')
  .directive('myVideo', function () {
    return {
      template: '<div class="my-video"><video autoplay  /></div>',
      restrict: 'E',
      link: function(scope, el){
          var video = angular.element(el).find('video')[0];
          var constraints = {
              audio: false,
              video: true
          };

          navigator.getUserMedia = navigator.getUserMedia ||
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          function successCallback(stream) {
              window.stream = stream; // stream available to console
              if (window.URL) {
                  video.src = window.URL.createObjectURL(stream);
              } else {
                  video.src = stream;
              }
          }

          function errorCallback(error) {
              console.log('navigator.getUserMedia error: ', error);
          }

          navigator.getUserMedia(constraints, successCallback, errorCallback);
      }
    };
  });
