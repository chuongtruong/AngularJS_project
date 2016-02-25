angular.module('myApp')
  .controller('galleryController', function($scope, $http, $state) {
    var userId = localStorage.getItem("userID");
    $scope.photos = [];
    if (userId) {
      var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
      request.then(function(res) {
        res.data.forEach(function(file) { // check each file inside the array 
          if (file.type === "image") { // only file with type "image" will be listed
            $scope.photos.push(file);
          }
        });
        console.log($scope.photos);

      }, function(err) {
        console.log("err", err);
      });

    } else {
      var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/latest/20');
      request.then(function(res) {
        res.data.forEach(function(file) {
          if (file.type === "image") {
            $scope.photos.push(file);
          }
        });
        console.log($scope.photos);

      }, function(err) {
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
