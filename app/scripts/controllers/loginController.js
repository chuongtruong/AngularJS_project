angular.module('myApp')
    .controller('loginController', ['$scope', 'AjaxFactory', '$location', function ($scope, AjaxFactory, $location) {
        
        $scope.login = function () {
            var data = {
                "username": $scope.uname,
                "password": $scope.pwd
            };
            
      var request = AjaxFactory.login(data);
            request.then(function (response) {
                console.log(response.data);
                console.log(response.data.status);
                if (response.data.status === "login ok") {
                    
                    localStorage.setItem("userID", response.data.userId);
                    $location.path('/loginSuccess');
                    console.log($location.path());
                }
                
                if (response.data.status === "wrong username or password") {
                    console.log("Wrong username or password!");
                    var loginMgs = document.getElementById("msgOfLogin");
                    loginMgs.innerText = 'Wrong username or password';
                }
            }, function (error) {
                console.log(error.data);
            });
        };
    }]);

