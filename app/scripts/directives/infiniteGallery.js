angular.module('myApp')
  .directive('infiniteGallery', ['$timeout',
    function($timeout) {
      return {
        restrict: 'AE',
        link: function(scope, el, attrs) {
          scope.$watch('$last', function(n, o) {
            if (n) {
              $timeout(function() {
                $(el[0]).justifiedGallery({
                  'rowHeight': 250,
                  'fixedHeight': true,
                  'captions': true,
                  'target': '_blank',
                  'margins': 8,
                });

              });
            }
          });
        }
      };
    }
  ]);
