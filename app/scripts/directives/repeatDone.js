angular.module("myApp")
  .directive('repeatDone', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, iAttrs) {
          var parentScope = element.parent().scope();
          if (scope.$last) {
            parentScope.$last = true;
          }
        }
      };
    }
  ]);