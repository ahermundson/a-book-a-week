myApp.controller("HomeController", ["UserFactory", "$http",  function(UserFactory, $http) {
  console.log("In Home Controller");
  var self = this;

  self.loggedIn = false;

  //user login, handled through the user factory.
  self.logIn = function() {
    UserFactory.logIn().then(function(user){
      self.loggedIn = true;
      console.log("In LogIn.then: ", user);
      self.user = user.name;
      self.addAlert();
    });
  }
  //user logout. Handled through the factory.
  self.logOut = function() {
    UserFactory.logOut();
    self.loggedIn = false;
  }

  //ALERTS
  self.alerts = [
  ];

  self.addAlert = function() {
    self.alerts.push({type: 'success', msg: 'Welcome Back! Head to the Night Stand to update your progress.'});
  };

  self.closeAlert = function(index) {
    self.alerts.splice(index, 1);
  };

}]);
