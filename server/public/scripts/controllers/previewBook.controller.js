myApp.controller('PreviewModalController', ['$uibModalInstance', 'BookFactory', 'UserFactory',  function ($uibModalInstance, BookFactory, UserFactory) {
  console.log("In Preview Modal Controller");
  var self = this;

  var bookViewElement = angular.element( document.querySelector('#viewerCanvas'));
  console.log(bookViewElement);

  google.books.load();

  function initialize() {
    console.log("Is initialize running?");
    var viewer = new google.books.DefaultViewer(bookViewElement);
    viewer.load('ISBN:0738531367');
  }

  google.books.setOnLoadCallback(initialize);


}]);
