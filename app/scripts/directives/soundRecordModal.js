angular.module('myApp')
    .directive('soundRecordModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/editAudioTemplate.html',
            controller: 'SoundRecordController'
        };
    });