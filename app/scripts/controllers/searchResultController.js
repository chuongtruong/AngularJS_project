angular.module('myApp')
    .controller('searchResultController', function ($scope, $stateParams) {
        $scope.photos = [];
        $scope.audios = [];
        $scope.videos = [];

        $scope.$on("searchSuccess", function (event, data) {
            console.log("in", data);
            $scope.results = data;
            $scope.results.forEach(function (file) {
                if (file.type === "image") {
                    $scope.photos.push(file);
                }else if(file.type === "audio"){
                    $scope.audios.push(file);
                }else if(file.type === "video"){
                    $scope.videos.push(file);
                }
            });
            console.log($scope.photos);

        }, function (err) {
            console.log("err", err);

        });
    });
});