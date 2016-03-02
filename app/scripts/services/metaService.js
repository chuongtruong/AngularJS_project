angular.module('myApp')
    .factory('metaService', function ($http, $uibModal) {

        var metaFunctions = {};

        metaFunctions.getComments = function (file) {
            var fileId = file.fileId;
            var cmtRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + fileId);
            file.comments = [];
            cmtRequest.then(function (cmtRes) {
                cmtRes.data.forEach(function (cmt) {
                    file.comments.push(cmt);
                });
            });
        };


        metaFunctions.getDesc = function (file) {
            var fileId = file.fileId;
            var desRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + fileId);
            file.description = "";
            desRequest.then(function (desRes) {
                file.description = desRes.data.description;
            });
        };

        metaFunctions.openModal = function (file) {
            var modalInstance = $uibModal.open({
                //animation: this.animationsEnabled,
                templateUrl: '../../views/lightbox.html',
                controller: 'lightboxController',
                size: 'lg',
                resolve: {
                    item: function () {
                        return file;
                    }
                }

            });

        };

        return metaFunctions;
    });