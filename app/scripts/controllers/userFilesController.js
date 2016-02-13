angular.module('myApp')
    .controller('UserFilesController', function ($scope, $sce, AjaxFactory, MediaService) {    
    
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl+src);
        };
        
    
        $scope.$on('mediaevent', function(evt){
            console.log(evt);
            var user = MediaService.userData;
            
            var request = AjaxFactory.fileByUser(user.userId);

            request.then(function (response) {
                $scope.files = response.data;
            }, function (error) {
                console.log(error.data);
            });
        });
    });