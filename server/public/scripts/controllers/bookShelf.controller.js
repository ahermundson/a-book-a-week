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


  //Get users books from database
  function getBooks() {
    UserFactory.getCurrentUser()
    .then(function(currentUser) {
      BookFactory.getBooks(currentUser)
      .then(function(collection) {
        self.collection = collection;
        self.totalRead = 0;
        // console.log("Collection Returned From Book Factory: ", self.collection);
        for (var i = 0; i < self.collection.length; i++) {
          if (self.collection[i].currently_reading === false) {
            self.totalRead++;
          }
        }
        console.log(self.totalRead);
        console.log("Total Read: ", self.totalRead);
      });
    });
  };
  getBooks();

}]);
