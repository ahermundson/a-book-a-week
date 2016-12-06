myApp.controller("BookShelfController", ["$http", function($http) {
  console.log("In Book Shelf Controller");
  var self = this;

  self.collection = [];

  //get users book list from book shelf
  function getBooks() {
    $http.get('/books')
    .then(function(response) {
      self.collection = response.data.books;
      console.log("Returned Collection :", self.collection);
    },
    function(err) {
      console.log("Error with put request: ", err);
    });
  }

  getBooks();
}]);
