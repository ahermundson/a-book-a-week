myApp.controller('MainCtrl', ['$uibModal', function ($uibModal) {
  console.log("In the main ctrl");
  var self = this;

  self.newBook = {};

  self.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/addBookModal.html',
      controller: 'ModalCtrl as mc'
    });
  };
}]);
