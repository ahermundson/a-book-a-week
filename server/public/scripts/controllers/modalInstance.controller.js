myApp.controller('ModalCtrl', ['$uibModalInstance', function ($uibModalInstance) {
  var self = this;
  self.close = function () {
    $uibModalInstance.close();
  };
}]);
