myApp.controller('ModalCtrl', ['$uibModalInstance', 'BookFactory', function ($uibModalInstance, BookFactory) {
  var self = this;

  self.close = function () {
    $uibModalInstance.close();
  };

  self.bookSearch = function() {
    console.log("Book To Search For: ", self.bookToSearchFor);
    BookFactory.bookSearch(self.bookToSearchFor)
    .then(function(response) {
      console.log("Response back from BookFactory");
      self.books = BookFactory.bookData();
      console.log("Books from BookFactory: ", self.books);
    });
  };
}]);
