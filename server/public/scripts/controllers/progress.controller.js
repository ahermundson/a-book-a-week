myApp.controller('ProgressCtrl', ['$uibModal', function ($uibModal) {
  console.log("In the progress ctrl");
  var self = this;

  self.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/update-progress-modal.html',
      controller: 'ProgressUpdateController',
      controllerAs: 'vm'
    });

    modalInstance.result.then(function(page) {
      console.log(page);
    })
  };
}]);
