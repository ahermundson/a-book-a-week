myApp.factory('BookFactory', ["$http", function($http) {
  console.log("Book Factory Running");

  //Variables global to the factory
  var books;
  var collection;
  //get users book list from book shelf
  function getBooks() {

    return $http.get('/books')
    .then(function(response) {
      collection = response.data.books;
      console.log("Returned Collection In Factory :", collection);
      return collection;
    },
    function(err) {
      console.log("Error with put request: ", err);
    });
  }


  //search for book. Coming from modal.
  function bookSearch(bookToSearchFor) {
    console.log("In Book Factory bookSearch function: ", bookToSearchFor);
    //base url for Google API
    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

    // complete search using Google API and display return to modalController
      var query = baseURL + bookToSearchFor.title;
      if (bookToSearchFor.author !== undefined) {
        query += "+inauthor:";
        query += bookToSearchFor.author;
      }
      var request = encodeURI(query);

      var promise = $http({
        method: 'GET',
        url: request
      }).then(function(response) {
        books = response.data.items;
        console.log("Books array from API: ", books);
      });

      return promise;

  }


  //Add selected book to users database
  function addSelectedBook(bookToAdd) {
    console.log("Book selected: ", bookToAdd);
    return $http.put('/books', bookToAdd)
    .then(function(response) {
      console.log("Put request successful");
    },
    function(err) {
      console.log("Error with put request: ", err);
    });
  }

  //Public API that the controllers can access. Each function will return a promise
  var publicApi = {
    getBooks: function() {
      return getBooks();
    },
    bookSearch: function(bookToSeachFor) {
      return bookSearch(bookToSeachFor);
    },
    bookData: function() {
      return books;
    },
    addSelectedBook: function(bookToAdd) {
      return addSelectedBook(bookToAdd);
    }

  };

  return publicApi;

}])
