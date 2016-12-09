myApp.controller("BookShelfController", ["$http", "BookFactory", "UserFactory", function($http, BookFactory, UserFactory) {
  console.log("In Book Shelf Controller");
  var self = this;

  self.collection = [];
  self.totalRead = self.collection.length;

  self.oneAtATime = true;

  self.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };


  function getBooks() {
    self.collection = UserFactory.getBooks();
    console.log(self.collection);
  //   UserFactory.getBooks()
  //   .then(function(response) {
  //     console.log("Response from promise:", response);
  //     self.collection = response;
  //     console.log("Collection in BookShelf Controller: ", self.collection);
  //   });
  };
  getBooks();
}]);
