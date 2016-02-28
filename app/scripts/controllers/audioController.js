angular.module('myApp')
    .controller('audioController', function ($scope, $http, $state, $sce, MediaService) {
        var userId = localStorage.getItem("userID");
        $scope.audios = [];
        $scope.trustSrc = function (path) {
            // console.log($sce.trustAsResourceUrl(MediaService.mediaUrl + path));
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };
    
        if (userId) {
            var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
            request.then(function (res) {
                res.data.forEach(function (file) { // check each file inside the array 
                    if (file.type === "audio") { // only file with type "image" will be listed
                        $scope.audios.push(file);
                    }
                });
                console.log($scope.audios);

            }, function (err) {
                console.log("err", err);
            });

        } else {
            var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/latest/20');
            request.then(function (res) {
                res.data.forEach(function (file) {
                    if (file.type === "audio") {
                        $scope.audios.push(file);
                    }
                });
                console.log($scope.audios);

            }, function (err) {
                console.log("err", err);

            });
        }

        //    request.then(function(res) {
        //
        //      $scope.filePath = 'http://util.mw.metropolia.fi/uploads/' + res.data.path;
        //    }, function(error) {
        //      console.log(error);
        //    });
    });