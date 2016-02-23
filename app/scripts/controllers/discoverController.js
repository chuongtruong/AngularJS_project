angular.module('myApp')
    .controller('discoverController',function($scope, $http, $state){
   $scope.photos=[];
   var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/latest/40');
    request.then(function(res){
        res.data.forEach(function(file){
            if (file.type === "image"){
                $scope.photos.push(file);
            }
        });
        console.log($scope.photos);
    }, function(err){
        console.log("err", err);
    
    });
    
});