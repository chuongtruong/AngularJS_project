angular.module('myApp')
    .service('MediaService', function ($rootScope) {
        var mediaVariables = {
            mediaUrl: 'http://util.mw.metropolia.fi/uploads/',
            mediaThumbUrl: 'http://util.mw.metropolia.fi/uploads/thumbs/tn640_'
            //userData: {}
        };

        //        mediaVariables.setVariable = function(key, value){
        //            mediaVariables[key] = value;
        //            $rootScope.$broadcast('mediaevent', 'Variables updated');
        //        };    


        return mediaVariables;
    });

//