myApp.controller("NightStandController", ["$http", function($http) {
  console.log("in the night stand controller");

  var self = this;

  var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  self.getBook = function() {
    var query = baseURL + 'thirteen+days+in+september'

    console.log('query: ', query);

    var request = encodeURI(query);


    $http({
      method: 'GET',
      url: request
    }).then(function(response) {
      self.book = response.data;
      console.log(self.book);
      console.log(self.book.items[0].volumeInfo.title);
      console.log(self.book.items[0].volumeInfo.subtitle);
      console.log(self.book.items[0].volumeInfo.pageCount);
      console.log(self.book.items[0].volumeInfo.authors[0]);
    });
  }
  self.getBook();
}]);
