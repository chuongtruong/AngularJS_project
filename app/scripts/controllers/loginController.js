angular.module('myApp')
  .controller('loginController', function($scope, AjaxFactory, $state, $rootScope) {
    $scope.login = function() {
      var data = {
        "username": $scope.uname,
        "password": $scope.pwd
      };

      var request = AjaxFactory.login(data);

      request.then(function(response) {
        console.log(response.data);
        console.log(response.data.status);
        if (response.data.status === "login ok") {
          localStorage.setItem("userID", response.data.userId);
            alert("Login success!");
          $state.go("home");
        }
      }, function(error) {
        console.log(error.data);
      });
    };
  });
