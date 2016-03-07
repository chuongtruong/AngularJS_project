angular.module('myApp')
  .controller('lightboxController', function($http, $rootScope, $scope, $uibModalInstance, item, AjaxFactory, $sce, MediaService) {

    $scope.file = item;
    $scope.item = item;
    $rootScope.itemID = item.fileId;

    $scope.isImg = false;
    $scope.isAudio = false;
    $scope.isVideo = false;
    
    $scope.isLiked = false;

    $scope.trustSrc = function(path) {
      return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
    };

    if (item.type === "image") {
      $scope.isImg = true;
    };
    if (item.type === "audio") {
      $scope.isAudio = true;
    };
    if (item.type === "video") {
      $scope.isVideo = true;
    };
    
    $scope.animationsEnabled = true;

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.ok = function() {
      $uibModalInstance.close($scope.item);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };


    //    Like(), Unlike(), Comment(), Checklike

    var userId = localStorage.getItem("userID");
    var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/likes/user/' + userId);
    request.then(function(res) {
      res.data.forEach(function(file) {
        if ($rootScope.itemID === file.fileId) {
          $scope.isLiked = true;
        }
      })
    });

    $scope.unlike = function() {
      var request = AjaxFactory.unlike();
      request.then(function(response) {
        $scope.isLiked = false;
      });
    };

    $scope.like = function() {
      var request = AjaxFactory.like();
      request.then(function(response) {
        $scope.isLiked = true;
      });
    };

    $scope.comment = function() {
      var data = {
        'user': localStorage.getItem("userID"),
        'comment': $scope.cmt
      };

      var request = AjaxFactory.comment(data);

      request.then(function(response) {
        var newComment = {
          'username': localStorage.getItem("username"),
          'comment': $scope.cmt
        };
        item.comments.push(newComment);
          $scope.cmt="";
      }, function(err) {
        alert("Error", err);
      });
    };


  });
