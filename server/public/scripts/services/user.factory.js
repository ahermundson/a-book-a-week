myApp.factory('UserFactory', ["$firebaseAuth", "$http", function($firebaseAuth, $http) {
  console.log("User Factory Running");
  var auth = $firebaseAuth();
  var currentUser = {};


  // This code runs whenever the user logs in
  function logIn(){
    self.loggedIn = true;
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      currentUser = firebaseUser;
      firebaseUser.user.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/users',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          console.log("got response from login: ", response.data);
          self.userData = response.data;
        });
      });
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

    console.log("State Changed");
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

  // Handle user log out
  function logOut(){
    self.loggedIn = false;
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };

  function getCurrentUser() {
    if (currentUser !== undefined) {
      return currentUser;
    } else {
      return logIn().then(function() {
        return currentUser;
      })
    }
  }

  var publicApi = {
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logOut();
    },
    getCurrentUser: function() {
      return currentUser;
    }
  }
  return publicApi;
}])
