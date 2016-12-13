myApp.controller("HomeController", ["UserFactory", "$http",  function(UserFactory, $http) {
  console.log("In Home Controller");

  self.test = function() {
    console.log("This working?");
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
