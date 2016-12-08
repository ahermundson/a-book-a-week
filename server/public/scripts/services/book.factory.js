myApp.factory('BookFactory', ["$http", "UserFactory", function($http, UserFactory) {
  console.log("Book Factory Running");


  //Variables global to the factory
  var books;
  var collection;
  var book_id;
  //get users book list from book shelf
  function getBooks() {
    console.log("in get books in book factory");
    return UserFactory.getCurrentUser().then(function(currentUser) {
      console.log(currentUser);
      return currentUser.getToken().then(function(idToken) {
        $http({
          method: 'GET',
          url: '/books',
          headers: {
            id_token: idToken
          }
          }).then(function(response) {
            collection = response.data.books;
            console.log("Collection from database: ", collection);
            return collection;
          },
          function(err) {
            console.log("Error with put request: ", err);
          });
      });
    })

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
  function addSelectedBook(bookToAdd) {
    console.log("Book selected: ", bookToAdd);
    var currentUser = UserFactory.getCurrentUser();
    return currentUser.getToken().then(function(idToken) {
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


  //Update users progress on current book
  function updateBookProgress(pageNumber) {
    book_id = getBookId(collection);
    console.log(book_id);
    console.log("Page: ", pageNumber.updatedPageNumber);
    var currentUser = UserFactory.getCurrentUser();
    return currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/books/update/' + book_id,
        data: pageNumber
      }).then(function(response) {
        console.log("Put request successful");
      },
      function(err) {
        console.log("Error with put request: ", err);
      });
    })
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
    },
    sendUserData: function(userData) {
      collection = userData;
      console.log(collection);
    }
  };

  return publicApi;

}])
