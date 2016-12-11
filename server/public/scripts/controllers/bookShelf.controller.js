myApp.controller("BookShelfController", ["$http", "BookFactory", "UserFactory", function($http, BookFactory, UserFactory) {
  console.log("In Book Shelf Controller");
  var self = this;

  self.collection = [];


  self.oneAtATime = true;

  self.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

  //Currently getting books from user factory. Needs to be updated to go through book factory otherwise will only be accurate if until user finishes/adds a book
  function getBooks() {
    UserFactory.getCurrentUser()
    .then(function(currentUser) {
      BookFactory.getBooks(currentUser)
      .then(function(collection) {
        self.collection = collection;
        console.log("Collection Returned From Book Factory: ", self.collection);
        self.totalRead = self.collection.length;
        console.log("Total Read: ", self.totalRead);
      });
    });
  };
  getBooks();
}]);
