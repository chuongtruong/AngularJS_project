angular.module('myApp')
    //    .controller('searchController', ['$scope', 'ajaxFactory', function ($scope, ajaxFactory) {
    //        $scope.search = function () {
    //            searchService.search($scope.keywords).then(function (response) {
    //                $scope.response = response.data;
    //            });
    //        };
    //
    //}]);
    .controller('searchController', ['$scope', 'AjaxFactory', '$timeout', '$state', '$rootScope', function ($scope, AjaxFactory, $timeout, $state, $rootScope) {
        var timeout;

        $scope.search = function (title) {
            if (timeout) { //if there is already a timeout in process cancel it
                $timeout.cancel(timeout);
            }

            timeout = $timeout(function () {
                var request = AjaxFactory.search(title);
                request.then(function (response) {
                    console.log("response", response);
                    $rootScope.results = response.data;
                    $state.go('searchResult');
                }, function (error) {
                    console.log(error.data);
                });
            }, 700);
        };
    }]);