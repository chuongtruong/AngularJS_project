angular.module('myApp')
    .controller('searchResultController', function ($scope, $sce, $stateParams, MediaService, metaService) {
        //        $scope.photos = [];
        //        $scope.audios = [];
        //        $scope.videos = [];
        $scope.mediaFiles = [];
        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };

        $scope.trsVideoThumbSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaThumbUrl + path + '.png');
        };

        $scope.trsImageThumbSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaThumbUrl + path);
        };

        $scope.$on("searchSuccess", function (event, data) {
            console.log(event);
            console.log("in", data);
            if (data.length == 0) {
                console.log("test");
                alert("No result found with this keyword!");
            }
            data.forEach(function (file) { // check each file inside the array 

                var fileId = file.fileId;
                metaService.getComments(file);
                metaService.getDesc(file);
                $scope.mediaFiles.push(file);
                console.log($scope.mediaFiles);
            });
        }, function (err) {
            console.log("err", err);
        });
        $scope.open = metaService.openModal;
    });


//            $scope.results = [];
//            
//            for (var i = 0; i < data.length; i++) {
//                $scope.results.push(
//                    {
//                        'fileId':data[i].fileId,
//                        'path':data[i].path
//                    }
//                );
//            }
//console.log("$scope.results",$scope.results);
//            $scope.results.forEach(function (file) {
//                if (file.type === "image") {
//                    $scope.photos.push(file);
//                }else if(file.type === "audio"){
//                    $scope.audios.push(file);
//                }else if(file.type === "video"){
//                    $scope.videos.push(file);
//                }
//            });
//            console.log($scope.photos);