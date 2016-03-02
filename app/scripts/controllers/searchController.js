angular.module('myApp')
    .controller('searchController', ['$scope', 'AjaxFactory', '$timeout', '$state', '$rootScope', function ($scope, AjaxFactory, $timeout, $state, $rootScope) {
        var timeout;

        $scope.results = {};
        
        $scope.search = function (title) {
            if (timeout) { //if there is already a timeout in process cancel it
                $timeout.cancel(timeout);
            }

            timeout = $timeout(function () {
                var request = AjaxFactory.search(title);
                request.then(function (response) {
                    // console.log("response", response);
                    console.log("response",response.data);
                    $state.go('searchResult');
                    $rootScope.$broadcast("searchSuccess", response.data);
                }, function (error) {
                    console.log(error.data);
                });
            }, 700);
        };
        
        
    }]);