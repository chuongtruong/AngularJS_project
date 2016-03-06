angular.module('myApp')
    .controller('searchResultController', function ($scope, $sce, $stateParams, MediaService, metaService) {
        $scope.photos = [];
        $scope.audios = [];
        $scope.videos = [];


        //  $scope.collection = ["Photo", "Video", "Sound"];
        //
        //  $scope.selectedIndex = 0; // Whatever the default selected index is, use -1 for no selection
        //
        //  $scope.itemClicked = function ($index) {
        //    $scope.selectedIndex = $index;
        //      console.log("index", $scope.selectedIndex);
        //  };

        //$scope.mediaFiles = [];
        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };

        $scope.showImage = true;
        $scope.showAudio = true;
        $scope.showVideo = true;



        //    $scope.setView = function(arg1, arg2, arg3) {
        //        arg1 = true;
        //        arg2 = false;
        //        arg3 = false;
        //    };

        //    $scope.getImage = $scope.setView($showImage, showAudio, showVideo);
        //    
        //    $scope.getVideo = $scope.setView(showVideo, showAudio, showImage);
        //    
        //    $scope.getAudio = $scope.setView(showAudio, showImage, showVideo);
        //    
        $scope.getImage = function () {
            $scope.showImage = true;
            $scope.showAudio = false;
            $scope.showVideo = false;
        };


        $scope.getAudio = function () {
            $scope.showImage = false;
            $scope.showAudio = true;
            $scope.showVideo = false;

        };

        $scope.getVideo = function () {
            $scope.showImage = false;
            $scope.showAudio = false;
            $scope.showVideo = true;
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
            $scope.photos = [];
            $scope.audios = [];
            $scope.videos = [];
            //$scope.mediaFiles = [];
            if (data.length == 0) {
                console.log("test");
                alert("No result found with this keyword!");
            }

            data.forEach(function (file) {
                if (file.type === "image") {
                    metaService.getComments(file);
                    metaService.getDesc(file);
                    $scope.photos.push(file);
                } else if (file.type === "audio") {
                    metaService.getComments(file);
                    metaService.getDesc(file);
                    $scope.audios.push(file);
                } else if (file.type === "video") {
                    metaService.getComments(file);
                    metaService.getDesc(file);
                    $scope.videos.push(file);
                }
            });

            //            data.forEach(function (file) { // check each file inside the array 
            //
            //                var fileId = file.fileId;
            //                metaService.getComments(file);
            //                metaService.getDesc(file);
            //                $scope.mediaFiles.push(file);
            //                console.log($scope.mediaFiles);
            //            });
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