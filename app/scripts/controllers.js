var controllerModule = angular.module("controllerModule", []);


controllerModule.controller("UploadCtrl", function ($scope, $uibModal) {
    $scope.openUploadModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'uploadModal.html',
            controller: 'UploadModalCtrl',
            size: "md"
        });
    }
});

controllerModule.controller("UploadModalCtrl", function ($scope, $state, $uibModalInstance) {
    $scope.goToEdit = function () {
        $uibModalInstance.close();
        $state.go("edit");
    }

    $scope.setImageFile = function (element) {
        $scope.init();

        // get the image file from element
        // start to put the file into canvas element
        // fileReader
        // onload 
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.image.src = e.target.result;
            console.log("image "+ $scope.image.src);
        };
        console.log(element.files[0]);
        reader.readAsDataURL(element.files[0]);
        $scope.image.onload = $scope.resetImage;
    };

    $scope.init = function () {
        // initialize default values for variables
        $scope.brightness = 0;
        $scope.contrast = 1;
        $scope.strength = 1;
        $scope.color = {
            red: 255,
            green: 189,
            blue: 0
        };
        $scope.autocontrast = false;
        $scope.vignette = false;
        $scope.canvas = angular.element('#myCanvas')[0];
        $scope.ctx = $scope.canvas.getContext('2d');
        $scope.image = new Image();
    };


    $scope.resetImage = function () {
        // when image data is loaded, (after onload)
        // put the data into canvas element
        $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);
    };
});

controllerModule.controller('galleryController', function($scope, $http) {
    var userId = localStorage.getItem("userID");
    $scope.photos = [];
    if(userId){
        var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user'+userId);
        request.then(function(res){
            res.forEach(function(file){
               if(file.type==="image"){
                   photos.push(file);
               }
            });
        },function(err){
            console.log(err);
        });
                     
    } else {
        var request = $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/image');
        request.then(function(res){
            res.forEach(function(file){
                photos.push(file);
            });
        },function(err){
            console.log(err);
        });
        console.log($scope.photos);
    }

//    request.then(function(res) {
//        
//      $scope.filePath = 'http://util.mw.metropolia.fi/uploads/' + res.data.path;
//    }, function(error) {
//      console.log(error);
//    });
  });
