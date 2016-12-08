myApp.controller("HomeController", ["$firebaseAuth", "$http", function($firebaseAuth, $http) {


  console.log("In Home Controller");
  var auth = $firebaseAuth();
  var self = this;
  var currentUser = {};
  // This code runs whenever the user logs in
  self.logIn = function(){
    self.loggedIn = true;
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      currentUser = firebaseUser;
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/users',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log("got response from state change: ", response.data);
          self.userData = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      currentUser = {};
      self.userData = [];
    }

  });


  // This code runs when the user logs out
  self.logOut = function(){
    self.loggedIn = false;
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };


}]);
