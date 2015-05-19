'use strict';

/**
 * @ngdoc function
 * @name webRtcApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the webRtcApp
 */
angular.module('webRtcApp')
.controller('SettingsCtrl',
['$scope','$modalInstance','settings',
function ($scope, $modalInstance, settings) {
    $scope.settings = settings;
    $scope.settings._current = $scope.settings._current||'account';

    $scope.settingsNames = {
        user:'Account',
        camera:'Camera',
        sound:'Sound',
        photo:'Photo'
    };

    $scope.close = function () {
        $modalInstance.dismiss('close');
    };
    $scope.save = function () {
        $modalInstance.close($scope.settings);
    };

    $scope.takeSnapshot = function(){
        var $form = angular.element('#photoSetting');
        var video = $form.find('video')[0];
        var $video = angular.element(video);
        var canvas = $form.find('canvas')[0];
        canvas.width  = $video.width();
        canvas.height = $video.height();
        canvas.getContext('2d').drawImage(video, 0, 0, $video.width(), $video.height());
        $scope.settings.photo = canvas.toDataURL();
    }

}]);
