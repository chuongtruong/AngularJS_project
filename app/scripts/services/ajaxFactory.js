angular.module('myApp')
    .factory('AjaxFactory', function ($rootScope, $http, $httpParamSerializer) {
        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        var ajaxFunctions = {};

        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + 'upload', args, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        ajaxFunctions.register = function (args) {
            return $http.post(urlBase + 'register', $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        ajaxFunctions.login = function (args) {
            return $http.post(urlBase + 'login', $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        ajaxFunctions.search = function (args) {
            return $http.post(urlBase + 'files/search/title', "title=" + encodeURIComponent(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            //            return $http({
            //                method: 'POST',
            //                url: urlBase + 'files/search/title',
            //                data: $.param(args), // pass in data as strings
            //                headers: {
            //                    'Content-Type': 'application/x-www-form-urlencoded'
            //                } // set the headers so angular passing info as form data (not request payload)
            //            });
        };

        //    ajaxFunctions.register = function(args) {
        //      return $http.post(urlBase + 'register', $httpParamSerializer(args), {
        //        headers: {
        //          'Content-Type': 'application/x-www-form-urlencoded'
        //        }
        //      });
        //    };


        //    ajaxFunctions.login = function(args) {
        //      return $http.post(urlBase + 'login', $httpParamSerializer(args), {
        //        headers: {
        //          'Content-Type': 'application/x-www-form-urlencoded'
        //        }
        //      });
        //    };


        ajaxFunctions.comment = function (args) {
            return $http.post(urlBase + 'comment/file/' + $rootScope.itemID, $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        return ajaxFunctions;
    });