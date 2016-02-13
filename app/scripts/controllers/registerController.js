angular.module('myApp')
    .controller('registerController', function ($scope, AjaxFactory) {
        $scope.register = function () {
            var data = {
                "username": $scope.uname,
                "password": $scope.pwd,
                "email": $scope.email
            };

            var request = AjaxFactory.register(data);

            request.then(function (response) {
                console.log(response.data);
            }, function (error) {
                console.log(error.data);
            });
        };
    });