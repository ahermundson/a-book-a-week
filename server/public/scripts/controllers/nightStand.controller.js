myApp.controller("NightStandController", ["$http", "BookFactory", function($http, BookFactory) {

  var self = this;



  function getBooks() {
    BookFactory.getBooks()
    .then(function(response) {
      self.collection = response;
      console.log("Collection in BookShelf Controller: ", self.collection);
      self.currentBook = findCurrentBook(self.collection);
      console.log("CurrentBook: ", self.currentBook);
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


}]);
