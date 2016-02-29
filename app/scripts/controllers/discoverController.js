angular.module('myApp')
    .controller('discoverController',function($scope, $http, $state, $uibModal){
   $scope.photos=[];
   var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/latest/40');
    request.then(function(res){
        res.data.forEach(function(file){
            if (file.type === "image"){
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
                file.description= desRes.data.description;
            });
                $scope.photos.push(file);
            }
        });
        console.log($scope.photos);
    }, function(err){
        console.log("err", err);
    
    });
    
    
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