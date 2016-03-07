angular.module('myApp')
  .controller('galleryController', function($scope, $http, $state, $uibModal, MediaService, metaService) { //$sce,
    var userId = localStorage.getItem("userID");
    $scope.photos = [];
    var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/' + userId);
    request.then(function(res) {
      res.data.forEach(function(file) { // check each file inside the array
        if (file.type === "image") { // only file with type "image" will be listed
          var fileId = file.fileId;
          metaService.getComments(file);
          metaService.getDesc(file);
          $scope.photos.push(file);
        }
      });
     
    }, function(err) {
      console.log("err", err);
    });
    $scope.open = metaService.openModal;
  });
