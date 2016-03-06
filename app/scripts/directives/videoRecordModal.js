angular.module('myApp')
    .directive('videoRecordModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/editVideoTemplate.html',
            controller: 'VideoRecordController'
        };
    });