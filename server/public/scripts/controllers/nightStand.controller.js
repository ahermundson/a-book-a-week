myApp.controller("NightStandController", ["$http", function($http) {
  console.log("in the night stand controller");

  var self = this;

  //set search box to be hidden
  self.searchDisplay = false;

  //toggle search box
  self.showSearch = function() {
    if (self.searchDisplay === true) {
      self.searchDisplay = false;
    } else {
      self.searchDisplay = true;
    }

  }


  //base url for Google API
  var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  //complete search using Google API and display on dom
  self.bookSearch = function() {
    var query = baseURL + self.newBook.title;
    if (self.newBook.author !== undefined) {
      query += "+inauthor:";
      query += self.newBook.author;
    }
    self.newBook = {};
    var request = encodeURI(query);
    $http({
      method: 'GET',
      url: request
    }).then(function(response) {
      self.books = response.data.items;
    });
  }

  //get users current book and display on the dom
  function getCurrentBook() {

  }

  //put request once user selects their book. Will push to books array in users collection
  self.selectBook = function(index) {
    self.showSearch(); //hide search div
    self.selectedBook = {
      title: self.books[index].volumeInfo.title,
      author: self.books[index].volumeInfo.authors[0],
      pages: self.books[index].volumeInfo.pageCount,
      book_start_date: new Date(),
      book_thumbnail: self.books[index].volumeInfo.imageLinks.thumbnail,
      isbn: self.books[index].volumeInfo.industryIdentifiers[0].identifier
    }
    console.log("Selected Book Object to Send: ", self.selectedBook);
    self.books = [];
    //put request inserting selected book into the users book section of their document.
    $http.put('/books', self.selectedBook)
    .then(function(response) {
      console.log("Put request successful");
    },
    function(err) {
      console.log("Error with put request: ", err);
    });
    //getCurrentBook();
  }

}]);
