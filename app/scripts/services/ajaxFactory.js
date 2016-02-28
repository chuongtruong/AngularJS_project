angular.module('myApp')
  .factory('AjaxFactory', function($rootScope, $http, $httpParamSerializer) {
    var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
    var ajaxFunctions = {};

    ajaxFunctions.uploadFile = function(args) {
      return $http.post(urlBase + 'upload', args, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    };

    ajaxFunctions.register = function(args) {
      return $http.post(urlBase + 'register', $httpParamSerializer(args), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    ajaxFunctions.login = function(args) {
      return $http.post(urlBase + 'login', $httpParamSerializer(args), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };


    ajaxFunctions.comment = function(args) {
      return $http.post(urlBase + 'comment/file/' + $rootScope.itemID, $httpParamSerializer(args), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    return ajaxFunctions;
  });
