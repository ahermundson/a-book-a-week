myApp.controller('MainCtrl', ['$uibModal', function ($uibModal) {
  console.log("In the main ctrl");
  var self = this;

  self.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/add-book-modal.html',
      controller: 'ModalCtrl',
      controllerAs: 'mc'
    });
  };
}]);
