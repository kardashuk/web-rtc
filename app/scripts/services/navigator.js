'use strict';

/**
 * @ngdoc service
 * @name webRtcApp.navigator
 * @description
 * # navigator
 * Service in the webRtcApp.
 */
angular.module('webRtcApp')
.factory('navigator', ['$q', '$rootScope',function($q,$rootScope){
     var constraints = {
        audio: true,
        video: true
    };
    var videoResolutions = {
        Default:true,
        qVGA: {width: {exact: 320}, height: {exact: 240}},
        VGA:  {width: {exact: 640}, height: {exact: 480}},
        HD:{width: 1280, height: 720},
        FullHD:{width: {exact: 1920}, height: {exact: 1080}}
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var currentStream = null;
    var deferred = $q.defer();

    var initStream = function(force){
        if (!currentStream || force){
            if (currentStream) {
                currentStream.stop();
            }
            setTimeout(function() {
                console.log(constraints);
                navigator.getUserMedia(constraints, function(stream){
                    currentStream = stream;
                    deferred.resolve(stream);
                    $rootScope.$broadcast('videoStream',stream);
                }, function(err){
                    deferred.reject(err);
                });
            }, (currentStream ? 200 : 0));
        }else{
            setTimeout(function(){
                deferred.resolve(currentStream);
                $rootScope.$broadcast('videoStream',currentStream);
            }, 0);
        }
        return deferred.promise;
    };



    var devices = {
        audio:[],
        video:[]
    };
    var checkDevices = function(){
        if (navigator.mediaDevices){
        navigator.mediaDevices
          .enumerateDevices()
          .then(function(sourceInfos){
            devices = {
                audio:[],
                video:[]
            };
            for (var i = 0; i !== sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                var option = document.createElement('option');
                option.id = sourceInfo.deviceId;
                if (sourceInfo.kind === 'audioinput') {
                    if (devices.audio.length == 0){
                        option.selected = true;
                    }
                    option.name = sourceInfo.label ||'microphone ' + (devices.audio.length + 1);
                    devices.audio.push(option)
                } else if (sourceInfo.kind === 'videoinput') {
                    option.name = sourceInfo.label || 'camera ' + (devices.video.length + 1);
                    if (devices.video.length == 0){
                        option.selected = true;
                    }
                    devices.video.push(option);
                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }
                console.log(devices);
        });
        }else{
            console.log('This browser does not support navigator.mediaDevices.')
        }
    };
    checkDevices();

    return {
        getDevices: function(){return devices},
        setMicrophone: function(audioSource){
            for(var i =0; i!==devices.audio.length; i++){
                var a = devices.audio[i];
                if (a.selected && a.id!==audioSource){
                    devices.audio[i].selected = false;
                }else if (!a.selected && a.id == audioSource){
                    devices.audio[i].selected = true;

                    if (constraints.audio === true){
                        constraints.audio = {
                            optional: [{
                                sourceId: audioSource
                            }]
                        }
                    }else{
                        constraints.audio.optional = [{
                            sourceId: audioSource
                        }]
                    }
                }
            }
            return initStream(true);
        },
        setCamera: function(videoSource){
            for(var i =0; i!==devices.video.length; i++){
                var v = devices.video[i];
                if (v.selected && v.id!==videoSource){
                    devices.audio[i].selected = false;
                }else if (!v.selected && v.id == videoSource){
                    devices.video[i].selected = true;

                    if (constraints.video === true){
                        constraints.video = {
                            optional: [{
                                sourceId: videoSource
                            }]
                        }
                    }else{
                        constraints.audio.optional = [{
                            sourceId: audioSource
                        }]
                    }
                }
            }
            return initStream(true);
        },
        videoResolution: Object.keys(videoResolutions),
        setResolution: function(resolution){
            constraints.video = videoResolutions[resolution];
            return initStream(true);
        },
        getStream: function(){
            return initStream();
        }
    };
}]);
