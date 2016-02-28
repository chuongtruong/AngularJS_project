angular.module('myApp')
    .controller('searchResultController', function ($scope, $sce, $stateParams, MediaService) {
        $scope.photos = [];
        $scope.audios = [];
        $scope.videos = [];
        console.log($scope);
        //console.log($stateParams);

        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };
    
        $scope.$on("searchSuccess", function (event, data) {
            console.log(event);
            console.log("in", data);
            console.log("path", data[0].path);
            $scope.results = data;
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

        }, function (err) {
            console.log("err", err);

        });
    });


//angular.module('myApp')
//    .directive('searchResult', function () {
//        return {
//            replace: true,
//            restrict: 'E',
//            templateUrl: 'views/searchResult.html'
//        }
//    });