myApp.controller("BookShelfController", ["$http", "BookFactory", function($http, BookFactory) {
  console.log("In Book Shelf Controller");
  var self = this;

  self.collection = [];


  function getBooks() {
    BookFactory.getBooks()
    .then(function(response) {
      console.log("Response from promise:", response);
      self.collection = response;
      console.log("Collection in BookShelf Controller: ", self.collection);
    });
  };
  getBooks();
}]);
