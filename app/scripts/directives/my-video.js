'use strict';

/**
 * @ngdoc directive
 * @name webRtcApp.directive:myVideo
 * @description
 * # myVideo
 */
angular.module('webRtcApp')
  .directive('myVideo', ['navigator','$rootScope', function (navigator, $rootScope) {
    return {
      template: '<div class="my-video"><video autoplay ></video></div>',
      restrict: 'E',
      link: function(scope, el){
          var video = angular.element(el).find('video')[0];
          var attachMediaStream = function( stream){
              if (window.URL) {
                  video.src = window.URL.createObjectURL(stream);
              } else {
                  video.src = stream;
              }
          };
          navigator.getStream().then(attachMediaStream);
          $rootScope.$on('videoStream', function(e,stream){attachMediaStream(stream);});
      }
    };
  }]);
