angular.module('myApp')
    .controller('rootController', function ($scope, $state) {
        $scope.$state = $state;
        $scope.logout = function(){
            localStorage.setItem("userID", "");
            $state.go("home");
        };
    });