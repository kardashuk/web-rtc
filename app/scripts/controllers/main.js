'use strict';

/**
 * @ngdoc function
 * @name webRtcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webRtcApp
 */
angular.module('webRtcApp')
.controller('MainCtrl',
['$scope','$modal', 'localStorageService',
function ($scope, $modal, storage) {

    $scope.showSettings = function( ){
        var settingsPopup = $modal.open({
            templateUrl: 'views/settings.popup.html',
            controller: 'SettingsCtrl',
            windowClass:'settings-popup',
            size:'lg',
            resolve: {
                settings: function(){
                    return  storage.get('settings') || {
                        user: null,
                        camera:null,
                        sound:null,
                        photo:null,
                        _current:'photo'
                    };
                }
            }
        });
        settingsPopup.result
            .then(function(settings){
                storage.set('settings', settings);
            });
    };
}]);