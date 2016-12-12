myApp.controller("NightStandController", ["$http", "BookFactory", "UserFactory", '$uibModal', function($http, BookFactory, UserFactory, $uibModal) {

  var self = this;

  self.showCurrentBookInfo = true;
  self.noCurrentBook = false;

  function getBooks() {
    console.log("running get books in nightstand controller");
    //get firebase user from user factory --> have BookFactory get the user's book collection --> go to BookFactory to get the current book.
    UserFactory.getCurrentUser().then(function(user) {
        self.showCurrentBookInfo = true;
        self.noCurrentBook = false;
        BookFactory.getBooks(user)
        .then(function(response) {
          BookFactory.getCurrentBook()
          .then(function(currentBook) {
            console.log("CurrentBook: ", currentBook);
            if (currentBook === 0) {
              self.showCurrentBookInfo = false;
              self.noCurrentBook = true;
            } else {
              self.currentBook = currentBook;
              self.daysToGoal = getTimeRemaining(moment(self.currentBook.finished_by_goal).format("MM-DD-YYYY"));
              self.pagesLeft = Number(self.currentBook.pages) - Number(self.currentBook.page_at);
              self.pagesPerDay = pagesToReadPerDay(self.daysToGoal, self.pagesLeft);
            }
          });
        });
    });

  };
  getBooks();



  self.openAddBook = function () {
    if (self.noCurrentBook === false) {
      alert("You already have a book on your nightstand.");
    } else {
      var modalInstance = $uibModal.open({
        templateUrl: './views/templates/add-book-modal.html',
        controller: 'ModalCtrl',
        controllerAs: 'mc'
      });
      modalInstance.result.then(function(response) {
        console.log("modal result: ", response);
        getBooks();
      });
    }
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


  self.finishedBook = function() {
    self.showCurrentBookInfo = false;
    self.addAlert();
    self.currentBook.page_at = self.currentBook.pages;
    dataToUpdate = {
      page_at: self.currentBook.pages,
      finished_date: new Date()
    }
    UserFactory.getCurrentUser()
    .then(function(user) {
      BookFactory.finishedBook(dataToUpdate, user)
      .then(function() {
        getBooks();
      });
    });

  }


  //ALERTS
  self.alerts = [
  ];

  self.addAlert = function() {
    self.alerts.push({type: 'success', msg: 'Nice Work! Click Add a New Book to move onto your next book!'});
  };

  self.closeAlert = function(index) {
    self.alerts.splice(index, 1);
  };



  //Calculate days left to finish book
  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var days = Math.floor( t/(1000*60*60*24) );
    return days + 1;
  }
  //Calculate pages the user would need to read per day to meet goal
  function pagesToReadPerDay(days, pages) {
    console.log("Days: " + days + "Pages: ", pages);
    return Math.round(pages / days);
  }


}]);
