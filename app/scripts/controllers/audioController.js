angular.module('myApp')
    .controller('audioController', function ($scope, $http, $state, $uibModal, $sce, MediaService, metaService) {
        var userId = localStorage.getItem("userID");
        $scope.audios = [];
        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };

        //        if (userId) {
        var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
        request.then(function (res) {
            res.data.forEach(function (file) { // check each file inside the array 
                if (file.type === "audio") { // only file with type "audio" will be listed
                    var fileId = file.fileId;

                    metaService.getComments(file);
                    metaService.getDesc(file);
                    $scope.audios.push(file);
                }
            });
            console.log($scope.audios);
        }, function (err) {
            console.log("err", err);
        });
        $scope.open = metaService.openModal;
    });