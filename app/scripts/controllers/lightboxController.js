angular.module('myApp')
  .controller('lightboxController', function($http, $rootScope, $scope, $uibModalInstance, item, AjaxFactory) {

    $scope.file = item;

    $scope.item = item;

    $scope.isLiked = false;
    $rootScope.itemID = item.fileId;

    var userId = localStorage.getItem("userID");
    var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/likes/user/' + userId);
    request.then(function(res) {
      console.log("res", res);
      res.data.forEach(function(file) {
        if ($rootScope.itemID === file.fileId) {

          $scope.isLiked = true;
        }
      })
    });


    console.log("itemID", $rootScope.itemID);
    console.log("userID, ", localStorage.getItem("userID"));

    //    $scope.review ={};
    //    $scope.addReview = function (content){
    //        content.push($scope.review);
    //        console.log('review', $scope.review);
    //        $scope.review ={};
    //    };

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

    //Like/unlike, comment

    $scope.unlike = function() {
      var request = AjaxFactory.unlike();
      request.then(function(response) {
        $scope.isLiked = false;
        console.log(response);
      });
    };

    $scope.like = function() {
      var request = AjaxFactory.like();
      request.then(function(response) {
        $scope.isLiked = true;
        console.log("status", response.data.status);
      });
    };

    $scope.comment = function() {
      var data = {
        'user': localStorage.getItem("userID"),
        'comment': $scope.cmt
      };
      console.log('data', data);

      var request = AjaxFactory.comment(data);

      request.then(function(response) {
        console.log(response.data);
        console.log(response.data.status);
        var newComment = {
          'username': localStorage.getItem("username"),
          'comment': $scope.cmt
        };
        item.comments.push(newComment);
      }, function(err){
          alert("Error", err);
      });
    };
  });
