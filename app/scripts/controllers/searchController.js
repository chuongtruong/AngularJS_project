angular.module('myApp')
  .controller('searchController', ['$scope', 'AjaxFactory', '$timeout', '$state', '$rootScope',
    function($scope, AjaxFactory, $timeout, $state, $rootScope) {
      var timeout;

      $scope.results = {};
        $rootScope.keyword="";

      $scope.search = function(title) {
        $timeout.cancel(timeout);
        timeout = $timeout(function() {
          var request = AjaxFactory.search(title);
            $rootScope.keyword = title;
          request.then(function(response) {
              $state.go('searchResult');
              $timeout(function() {
                $rootScope.$broadcast("searchSuccess", response.data);
              });
            },
            function(error) {
              console.log(error.data);
            });
        }, 700);
      };


    }
  ]);
