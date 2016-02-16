angular.module('myApp')
    .controller('rootController', function ($scope, $state) {
        $scope.$state = $state;
        console.log("state", $state);
        $scope.logout = function(){
            localStorage.setItem("userID", "");
            $state.go("home");
        };
    });