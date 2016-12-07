myApp.factory('BookFactory', ["$http", function($http) {
  console.log("Book Factory Running");
  var books;

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
