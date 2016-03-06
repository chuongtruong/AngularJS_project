angular.module('myApp')
    .controller('searchResultController', function ($scope, $sce, $stateParams, MediaService, metaService) {
        $scope.photos = [];
        $scope.audios = [];
        $scope.videos = [];
    
        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };
            $scope.trsVideoThumbSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaThumbUrl + path + '.png');
        };

        $scope.trsImageThumbSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaThumbUrl + path);
        };

    $scope.showImage = true;
    $scope.showAudio = true;
    $scope.showVideo = true;

    $scope.showing = '';
    $scope.getImage = function() {
        $scope.showImage = true;
        $scope.showAudio = false;
        $scope.showVideo = false;
        $scope.showing = 'image';
    };
    
        $scope.getAudio = function() {
        $scope.showImage = false;
        $scope.showAudio = true;
        $scope.showVideo = false;
        $scope.showing = 'audio';    
    };
    
        $scope.getVideo = function() {
        $scope.showImage = false;
        $scope.showAudio = false;
        $scope.showVideo = true;
        $scope.showing = 'video';
    };


        $scope.$on("searchSuccess", function (event, data) {
            console.log(event);
            console.log("in", data);
            $scope.photos = [];
            $scope.audios = [];
            $scope.videos = [];
            
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
        }, function (err) {
            console.log("err", err);
        });
        $scope.open = metaService.openModal;
    });
