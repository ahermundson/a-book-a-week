myApp.controller('ModalCtrl', ['$uibModalInstance', 'BookFactory', 'UserFactory', function ($uibModalInstance, BookFactory, UserFactory) {
  var self = this;
  self.bookToSearchFor = {};
  self.showRecommendAuthor = false;

  //Close Modal on click of cancel
  self.close = function () {
    $uibModalInstance.close();
  };

  //Search for books by title / author
  self.bookSearch = function() {
    BookFactory.bookSearch(self.bookToSearchFor)
    .then(function(response) {
      self.books = BookFactory.bookData();
    });
  };

  self.recommend = function() {
    UserFactory.getCurrentUser()
    .then(function(currentUser) {
      console.log("User in recommend");
      BookFactory.getRandomAuthor(currentUser).then(function(response) {
        console.log("After getRandom Author: ", response.author);
        self.bookToSearchFor.author = response.author;
        self.bookToSearchFor.title = "";

      }).then(function() {
        self.bookSearch();
        self.becauseYouRead = self.bookToSearchFor.author;
        self.showRecommendAuthor = true;
        });
    });
  }

  //Select book from the books returned from a search
  self.selectBook = function(index) {
    self.showRecommendAuthor = false;
    self.selectedBook = {
      title: self.books[index].volumeInfo.title,
      author: self.books[index].volumeInfo.authors[0],
      pages: self.books[index].volumeInfo.pageCount,
      book_start_date: moment().format(),
      finished_by_goal: moment().add(1, 'week'),
      book_thumbnail: self.books[index].volumeInfo.imageLinks.thumbnail,
      isbn: self.books[index].volumeInfo.industryIdentifiers[0].identifier
    };
    UserFactory.getCurrentUser().then(function(currentUser) {
      BookFactory.addSelectedBook(self.selectedBook, currentUser)
      .then(function(response) {
        self.books = [];
        console.log("About to close modal");
        self.close();
      });
    });

  }
}]);
