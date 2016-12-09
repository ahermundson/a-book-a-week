myApp.controller("NightStandController", ["$http", "BookFactory", "UserFactory", '$uibModal', function($http, BookFactory, UserFactory, $uibModal) {

  var self = this;

  function getBooks() {
    console.log("running get books in nightstand controller");


    //get firebase user from user factory --> have BookFactory get the user's book collection --> go to BookFactory to get the current book.
    UserFactory.getCurrentUser().then(function(user) {
        console.log("User from user.factory: ", user);
        BookFactory.getBooks(user)
        .then(function(response) {
          console.log("Books should be in factory");
          BookFactory.getCurrentBook()
          .then(function(currentBook) {
            self.currentBook = currentBook;
            console.log("Current Book From Book Factory: ", self.currentBook);
            self.daysToGoal = getTimeRemaining(moment(self.currentBook.finished_by_goal).format("MM-DD-YYYY"));
            console.log(moment(self.currentBook.finished_by_goal).format("MM-DD-YYYY"));
            console.log("Days to Goal: ", self.daysToGoal);
            self.pagesLeft = Number(self.currentBook.pages) - Number(self.currentBook.page_at);
            self.pagesPerDay = pagesToReadPerDay(self.daysToGoal, self.pagesLeft);
          });
        });
    });

  };
  getBooks();



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
