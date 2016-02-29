angular.module('myApp')
    .controller('lightboxController', function ($rootScope, $scope, $uibModalInstance, item, AjaxFactory, $sce, MediaService) {
        $scope.isImg = false;
        $scope.isAudio = false;
        $scope.isVideo = false;
        $scope.file = item;
        $scope.item = item;
    console.log("type", item.type);
    
        $scope.trustSrc = function (path) {
            return $sce.trustAsResourceUrl(MediaService.mediaUrl + path);
        };

        if (item.type === "image") {
            $scope.isImg = true;
        }

        if (item.type === "audio") {
            $scope.isAudio = true;
        }

        if (item.type === "video") {
            $scope.isVideo = true;
        }
    
        console.log("true, false", $scope.isVideo);


        console.log("item", item.comments);

        $rootScope.itemID = item.fileId;
        console.log("itemID", $rootScope.itemID);

        //    $scope.review ={};
        //    $scope.addReview = function (content){
        //        content.push($scope.review);
        //        console.log('review', $scope.review);
        //        $scope.review ={};
        //    };

        $scope.animationsEnabled = true;

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.comment = function () {
            var data = {
                'user': localStorage.getItem("userID"),
                'comment': $scope.cmt
            };
            console.log('data', data);

            var request = AjaxFactory.comment(data);

            request.then(function (response) {
                console.log(response.data);
                console.log(response.data.status);

            });
        };




    });