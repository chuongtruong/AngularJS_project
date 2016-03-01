//angular.module('myApp')
//    .service('searchService', ['$http', function($http){
//        
//        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
//        var searchResult = {};
//        searchResult.search = function(keywords){
//            return $http.post(urlBase+'files/search/title', { "title" : keywords });
//        }
//    };
//    return searchResult;
//]);

ngular.module('myApp')
    .controller('videoController', function ($scope, $http, $state, $uibModal, $sce, MediaService) {
        var userId = localStorage.getItem("userID");

        $scope.videos = [];
        $scope.trsVideoThumbSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaThumbUrl + path + '.png');
        };

        var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
        request.then(function (res) {
            res.data.forEach(function (file) { // check each file inside the array 
                if (file.type === "video") { // only file with type "video" will be listed
                    var fileId = file.fileId;

                    var cmtRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + fileId);
                    file.comments = [];
                    cmtRequest.then(function (cmtRes) {
                        cmtRes.data.forEach(function (cmt) {
                            file.comments.push(cmt);
                        });
                    });
                    var desRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + fileId);
                    file.description = "";
                    desRequest.then(function (desRes) {
                        file.description = desRes.data.description;
                    });
                    $scope.videos.push(file);
                }
            });
            console.log($scope.videos);
        }, function (err) {
            console.log("err", err);
        });

        $scope.open = function (file) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
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




    });