angular.module('myApp')
    .controller('rootController', function ($scope, $state, metaService) {
    
        $scope.$state = $state;
        $scope.logout = function(){
            localStorage.setItem("userID", "");
            $state.go("home");
        };
   
    
    });