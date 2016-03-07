angular.module('myApp')
    .controller('videoController', function ($scope, $http, $state, $uibModal, $sce, MediaService, metaService) {
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
                    metaService.getComments(file);
                    metaService.getDesc(file);
                    $scope.videos.push(file);
                }
            });
            
        }, function (err) {
            console.log("err", err);
        });
        $scope.open = metaService.openModal;
    });