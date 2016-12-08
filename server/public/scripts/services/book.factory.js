myApp.factory('BookFactory', ["$http", function($http) {
  console.log("Book Factory Running");

  //Variables global to the factory
  var books;
  var collection;
  var book_id;
  //get users book list from book shelf
  function getBooks() {
    console.log("in get books in book factory");
    return $http.get('/books')
    .then(function(response) {
      collection = response.data.books;
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
  };


  //Update users progress on current book
  function updateBookProgress(pageNumber) {
    book_id = getBookId(collection);
    console.log(book_id);
    console.log("Page: ", pageNumber.updatedPageNumber);
    return $http.put('/books/update/' + book_id, pageNumber)
    .then(function(response) {
      console.log("Put request successful");
    },
    function(err) {
      console.log("Error with put request: ", err);
    });
  };


  function getBookId(collection) {
    for (var i = 0; i < collection.length; i++) {
      if(collection[i].currently_reading === true) {
        return collection[i]._id;
      }
    }
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
    },
    updateProgress: function(pageNumber) {
      return updateBookProgress(pageNumber);
    }
  };

  return publicApi;

}])
