angular.module('myApp')
   
//  .controller('registerController', function($scope, AjaxFactory) {
//    
//    $scope.register = function() {
//      var data = {
//        "username": $scope.uname,
//        "password": $scope.pwd,
//        "email": $scope.email
//      };

    .controller('registerController', ['$scope', 'AjaxFactory', '$location', function ($scope, AjaxFactory, $location) {

        //    app.controller('TestCtrl2', ['$scope', '$controller', function ($scope, $controller) {
        //   var testCtrl1ViewModel = $scope.$new(); //You need to supply a scope while instantiating.
        //   //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
        //   //In this case it is the child scope of this scope.
        //   $controller('TestCtrl1',{$scope : testCtrl1ViewModel });
        //   testCtrl1ViewModel.myMethod(); //And call the method on the newScope.
        //}]);

        $scope.register = function () {
            var data = {
                "username": $scope.uname,
                "password": $scope.pwd,
                "email": $scope.email
            };

      var request = AjaxFactory.register(data);

//      request.then(function(response) {
//        console.log(response.data);
//      }, function(error) {
//        console.log(error.data);
//      });
//    };
//  });

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
                //                if (response.data.error) {
                //                    if (response.data.error === "username already exists") {
                //                        console.log("This user name is already exist!");
                //                    }
                //                }
            }, function (error) {
                console.log(error.data);
                console.log(error);
                //if(error.data.error === "username already exists"){
                //  console.log("This user name is already exist!");
                //}
            });
        };
    }]);

