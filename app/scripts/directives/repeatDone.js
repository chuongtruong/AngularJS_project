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
          scope.$on('onLoadMore',function(){
              scope.$apply(function(){
                  parentScope.$last = false;
              });
          })
        }
      };
    }
  ]);
