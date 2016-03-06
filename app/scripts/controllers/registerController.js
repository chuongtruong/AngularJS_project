angular.module('myApp')

    .controller('registerController', ['$scope', 'AjaxFactory', '$location', function ($scope, AjaxFactory, $location) {


        $scope.register = function () {
            var data = {
                "username": $scope.uname,
                "password": $scope.pwd,
                "email": $scope.email
            };

      var request = AjaxFactory.register(data);
            request.then(function (response) {
                console.log(response.data);
                if (response.data.status === "ok") {
                    console.log(response.data.message);
                    console.log("registration success!!");
                    // loginCheck.login();
                    request = AjaxFactory.login({
                        "username": data.username,
                        "password": data.password
                    });
                    request.then(function (response) {
                        console.log(response.data);
                        console.log(response.data.status);
                        if (response.data.status === "login ok") {
                            localStorage.setItem("userID", response.data.userId);
                            $location.path('/signupSuccess');
                            console.log($location.path());
                        }
                    }, function (error) {
                        console.log(error.data);
                    });

                }
                
                if (response.data.error === "username already exists") {
                    console.log("This user name is already exist!");
                    var signUpmgs = document.getElementById("msgOfsignUp");
                    signUpmgs.innerText ='The user name already exists';
                    
                }

            }, function (error) {
                console.log(error.data);
                console.log(error);
            });
            
        };
    }]);

