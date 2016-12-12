myApp.factory('BookFactory', ["$http", "UserFactory", "$q", function($http, UserFactory, $q) {
  console.log("Book Factory Running");


  //Variables global to the factory
  var books;
  var collection;
  var book_id;
  //get users book list from database
  function getBooks(currentUser) {
    console.log("in get books in book factory: ", currentUser);
    var deferred = $q.defer();
    currentUser.user.getToken()
    .then(function(idToken) {
      $http({
        method: 'GET',
        url: '/books',
        headers: {
          id_token: idToken
        }
        }).then(function(response) {
          collection = response.data.books;
          console.log("Collection from database: ", collection);
          //storing collection to send back to controller
          deferred.resolve(collection);
        },
        function(err) {
          console.log("Error with put request: ", err);
        });
    });
    //returning book collection to nightstand controller
    return deferred.promise;

  }


  //search for book. Coming from modal.
  function bookSearch(bookToSearchFor) {
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
      });

      return promise;

  }


  //Add selected book to users database
  function addSelectedBook(bookToAdd, currentUser) {
    console.log("Book selected: ", bookToAdd);
    // var currentUser = UserFactory.getCurrentUser();
    return currentUser.user.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/books',
        data: bookToAdd,
        headers: {
          id_token: idToken
        }
        }).then(function(response) {
          console.log("Put request successful");
        },
        function(err) {
          console.log("Error with put request: ", err);
        });
    });
  };

  //sets currently reading to false, updates page number to the last in the book, adds finished date in database
  function finishedBook(dataToUpdate, currentUser) {
    book_id = getBookId(collection);
    return currentUser.user.getToken()
      .then(function(idToken) {
        console.log("Before Put in Book Factory");
        $http({
          method: 'PUT',
          url: '/books/finished/' + book_id,
          data: dataToUpdate,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {
          console.log("Put request successful");
        },
        function(err) {
          console.log("Error with put request: ", err);
        });
    });
  };

  //Update users progress on current book
  function updateBookProgress(pageNumber, currentUser) {
    book_id = getBookId(collection);
    return currentUser.user.getToken()
      .then(function(idToken) {
        console.log("Before Put in Book Factory");
        $http({
          method: 'PUT',
          url: '/books/update/' + book_id,
          data: pageNumber,
          headers: {
            id_token: idToken
          }
        }).then(function(response) {
          console.log("Put request successful");
        },
        function(err) {
          console.log("Error with put request: ", err);
        });
    });
  };

  //Get the mongo ID of book currently being read
  function getBookId(collection) {
    for (var i = 0; i < collection.length; i++) {
      if(collection[i].currently_reading === true) {
        return collection[i]._id;
      }
    }
  }
  //Sends back current book as a promise
  function getCurrentBook() {
    var deferred = $q.defer();
    var currentBook = findCurrentBook(collection);
    deferred.resolve(currentBook);
    return deferred.promise;
  }

  //finds the book the user is currently reading (book with currently_reading set to true)
  function findCurrentBook(collection) {
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].currently_reading === true) {
        return collection[i];
      }
    }
    return 0;
  }

  function getRandomAuthor(currentUser) {
    var deferred = $q.defer();
    currentUser.user.getToken()
    .then(function(idToken) {
      $http({
        method: 'GET',
        url: '/books',
        headers: {
          id_token: idToken
        }
        }).then(function(response) {
          collection = response.data.books;
          console.log("Collection from database: ", collection);

          //storing collection to send back to controller
          deferred.resolve(collection[randomNumber(0, collection.length)]);
        },
        function(err) {
          console.log("Error with put request: ", err);
        });
    });
    //returning book collection to nightstand controller
    return deferred.promise;
  }


  //Public API that the controllers can access. Each function will return a promise
  var publicApi = {
    getBooks: function(currentUser) {
      return getBooks(currentUser);
    },
    bookSearch: function(bookToSeachFor) {
      return bookSearch(bookToSeachFor);
    },
    bookData: function() {
      return books;
    },
    addSelectedBook: function(bookToAdd, currentUser) {
      return addSelectedBook(bookToAdd, currentUser);
    },
    updateProgress: function(pageNumber, currentUser) {
      return updateBookProgress(pageNumber, currentUser);
    },
    getCurrentBook: function() {
      return getCurrentBook();
    },
    finishedBook: function(dataToUpdate, currentUser) {
      return finishedBook(dataToUpdate, currentUser);
    },
    getRandomAuthor(currentUser) {
      return getRandomAuthor(currentUser);
    }
  };

  return publicApi;

}])


function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
