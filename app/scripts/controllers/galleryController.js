angular.module('myApp')
  .controller('galleryController', function($scope, $http, $state, $uibModal) {
    var userId = localStorage.getItem("userID");
    $scope.photos = [];
    if (userId) {
      var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
      request.then(function(res) {
        res.data.forEach(function(file) { // check each file inside the array 
          if (file.type === "image") { // only file with type "image" will be listed
            var fileId = file.fileId;

            var cmtRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + fileId);
            file.comments = [];
            cmtRequest.then(function(cmtRes) {
              cmtRes.data.forEach(function(cmt) {
                file.comments.push(cmt);
              });
            });
            var desRequest = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + fileId);
            file.description = "";
            desRequest.then(function(desRes) {
              file.description = desRes.data.description;
            });
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
    
    $scope.open = function(file) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../../views/lightbox.html',
        controller: 'lightboxController',
        size: 'lg',
        resolve: {
          item: function() {
            return file;
          }
        }

      });
    };
    
    


  });
