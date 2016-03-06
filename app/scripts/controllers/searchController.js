angular.module('myApp')
    .controller('searchController', ['$scope', 'AjaxFactory', '$timeout', '$state', '$rootScope', function ($scope, AjaxFactory, $timeout, $state, $rootScope) {
        var timeout;

        $scope.results = {};
        $rootScope.keyword = '';

        $scope.search = function (title) {
            if (timeout) { //if there is already a timeout in process cancel it
                $timeout.cancel(timeout);
                $rootScope.keyword = title;
                console.log($rootScope.keyword);
            }

            timeout = $timeout(function () {
                var request = AjaxFactory.search(title);
                request.then(function (response) {
                        // console.log("response", response);
                        console.log("response", response.data);
                        $state.go('searchResult');
                        
                        $timeout(function () {
                            $rootScope.$broadcast("searchSuccess", response.data);
                        });
                        console.log("Response data", response.data);

                        //                    if (!title === response.data.title) {
                        //                        alert("The title is not matched");
                        //                    }
                    },
                    function (error) {
                        console.log(error.data);
                    });
            }, 700);
        };


            }]);