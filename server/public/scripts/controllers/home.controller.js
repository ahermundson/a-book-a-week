myApp.controller("HomeController", ["UserFactory", "$http",  function(UserFactory, $http) {
  console.log("In Home Controller");
  var self = this;

  self.email = function() {
    $http({
      method: 'GET',
      url: '/email'
    });
  }
  //user login, handled through the user factory.
  self.logIn = function() {
    UserFactory.logIn();
  }


  //user logout. Handled through the factory.
  self.logOut = function() {
    UserFactory.logOut();
  }
}]);
