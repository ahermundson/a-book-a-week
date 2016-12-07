myApp.controller('ProgressUpdateController', ['$uibModalInstance', 'BookFactory', function ($uibModalInstance, BookFactory) {
  var self = this;

  self.close = function () {
    $uibModalInstance.close();
  };

  self.updatePage = function() {
    self.updatePageNumber = {
      updatedPageNumber: Number(self.updatedPageNumber)
    }
    console.log(self.updatePageNumber.updatedPageNumber);
    BookFactory.updateProgress(self.updatePageNumber)
    .then(function(response) {
      console.log("Response back from BookFactory");
    });
  }
}]);
