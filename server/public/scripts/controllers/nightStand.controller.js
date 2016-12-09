myApp.controller("NightStandController", ["$http", "BookFactory", '$uibModal', function($http, BookFactory, $uibModal) {

  var self = this;

  function getBooks() {
    BookFactory.getBooks()
    .then(function(response) {
      self.collection = response;
      self.currentBook = findCurrentBook(self.collection);
      console.log("CurrentBook: ", self.currentBook);
      self.daysToGoal = getTimeRemaining(moment(self.currentBook.finished_by_goal).format("MM-DD-YYYY"));
      console.log(moment(self.currentBook.finished_by_goal).format("MM-DD-YYYY"));
      console.log("Days to Goal: ", self.daysToGoal);
      self.pagesLeft = Number(self.currentBook.pages) - Number(self.currentBook.page_at);
      self.pagesPerDay = pagesToReadPerDay(self.daysToGoal, self.pagesLeft);

    });
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


  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var days = Math.floor( t/(1000*60*60*24) );
    return days + 1;
  }

  function pagesToReadPerDay(days, pages) {
    console.log("Days: " + days + "Pages: ", pages);
    return Math.round(pages / days);
  }

}]);
