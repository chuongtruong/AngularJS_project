angular.module('myApp')
    .controller('loginController', function ($scope, AjaxFactory) {
        $scope.login = function () {
            var data = {
                "username": $scope.uname,
                "password": $scope.pwd
            };

            var request = AjaxFactory.login(data);

            request.then(function (response) {
                console.log(response.data);
                console.log(response.data.status);
                if (response.data.status === "login ok"){
                    localStorage.setItem("userID", response.data.userId);
                }
            }, function (error) {
                console.log(error.data);
            });
        };
    });