myApp.controller('RecommendBookController', ['BookFactory', 'UserFactory', '$uibModal', '$location', function (BookFactory, UserFactory, $uibModal, $location) {
  console.log("In Recommend Book Controller");


  var self = this;
  self.bookToSearchFor = {};

  //get random author from database, do a search for that author then display books from that author
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
        });
    });
  }

  //Search for books by title / author
  self.bookSearch = function() {
    BookFactory.bookSearch(self.bookToSearchFor)
    .then(function(response) {
      self.books = BookFactory.bookData();
    });
  };


  //Select book from the books returned from a search
  self.selectBook = function(index) {
    $location.path('/night-stand');
    console.log(self.books[index]);
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
      });
    });

  }

  self.previewBook = function(index) {
    self.isbn = self.books[index].volumeInfo.industryIdentifiers[0].identifier;
    console.log("ISBN: ", self.isbn);
    // GBS_insertPreviewButtonPopup('ISBN:' + self.isbn);
    var modalInstance = $uibModal.open({
      templateUrl: './views/templates/preview-book-modal.html',
      controller: 'PreviewModalController',
      controllerAs: 'pm'
    });
    modalInstance.result.then(function(response) {
      console.log("modal result: ", response);
      getBooks();
    });
  }

  self.recommend();

}]);
