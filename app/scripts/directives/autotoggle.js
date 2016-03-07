angular.module('myApp')
  .directive('autotoggle', function() {
    return {
      replace: true,
      restrict: 'AE',
      link: function(scope, elem, attr) {
        var btnElement = angular.element(document.querySelector(".btn-navbar"));
        var navElement = angular.element(document.querySelector(".navbar-toggle"));
        elem.bind('click', function() {
          btnElement.click();
          navElement.click()
        });
      }
    };
  });
