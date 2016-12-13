myApp.controller("HomeController", ["UserFactory", "$http",  function(UserFactory, $http) {
  console.log("In Home Controller");
  var self = this;

  self.loggedIn = false;

  //user login, handled through the user factory.
  self.logIn = function() {
    UserFactory.logIn().then(function(){
      self.loggedIn = true;
    });
  }
  //user logout. Handled through the factory.
  self.logOut = function() {
    UserFactory.logOut();
    self.loggedIn = false;
  }
}]);
