angular.module('myApp')
  .controller('lightboxController', function($scope, $uibModalInstance, item) {
    $scope.file = item;
    console.log("item", item);
    $scope.animationsEnabled = true;

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.ok = function() {
      $uibModalInstance.close($scope.item);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

//angular.module('myApp')
//  .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {
//
//    $scope.items = items;
//    $scope.selected = {
//      item: $scope.items[0]
//    };
//
//    $scope.ok = function() {
//      $uibModalInstance.close($scope.selected.item);
//    };
//
//    $scope.cancel = function() {
//      $uibModalInstance.dismiss('cancel');
//    };
//  });
