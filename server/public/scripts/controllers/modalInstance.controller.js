myApp.controller('ModalCtrl', ['$uibModalInstance', 'BookFactory', 'UserFactory', function ($uibModalInstance, BookFactory, UserFactory) {
  var self = this;


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

  //Select book from the books returned from a search
  self.selectBook = function(index) {

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
        self.close();
      });
    });

  }
}]);
