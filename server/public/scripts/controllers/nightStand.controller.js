myApp.controller("NightStandController", ["$http", "BookFactory", "UserFactory", '$uibModal', function($http, BookFactory, UserFactory, $uibModal) {

  var self = this;



  function getBooks() {
    self.collection = UserFactory.getBooks();
    console.log("Collection in NightStand Controller: ", self.collection);
    self.currentBook = findCurrentBook(self.collection);
    console.log("CurrentBook: ", self.currentBook);
    BookFactory.currentBook = self.currentBook;


  };
  getBooks();

  function findCurrentBook(collection) {
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].currently_reading === true) {
        return collection[i];
      }
    }
    return 0;
  }

  self.openAddBook = function () {
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/add-book-modal.html',
      controller: 'ModalCtrl',
      controllerAs: 'mc'
    });
  };

  self.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/update-progress-modal.html',
      controller: 'ProgressUpdateController',
      controllerAs: 'vm'
    });

    modalInstance.result.then(function(page) {
      console.log(page);
      getBooks();
    })
  };

}]);
