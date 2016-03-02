angular.module('myApp')
  .controller('discoverController', function($scope, $http, $state, $uibModal, $timeout, $rootScope) {

    var click = 1;
    var fullPhotos = []
    $scope.photos = [];


    var count
    var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/');
    request.then(function(res) {
      res.data.forEach(function(file) {
        if (file.type === "image") {
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

          fullPhotos.push(file);
        }
      });

      $scope.photos = fullPhotos.slice(0, 20);
      console.log($scope.photos);
    }, function(err) {
      console.log("err", err);

    });

    $scope.loadMore = function() {
      click++;
      $timeout(function() {
        $scope.photos = fullPhotos.slice(0, 20 * click);
        $rootScope.$broadcast("onLoadMore");
      });
      console.log($scope.photos);
      console.log(fullPhotos.length);
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
