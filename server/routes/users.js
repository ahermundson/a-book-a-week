var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_API_KEY);
// bring in our mongoose model
var User = require('../models/user');


//Route to add a new user
router.post('/', function(req, res) {
  console.log('post: ', req.body);
  var addedPerson = new User(req.body);

  addedPerson.save(function(err, data) {
    console.log('save data:', data);
    if(err) {
      console.log('ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(data);
      // res.sendStatus(201);
    }
  });
});


router.get("/", function(req, res){
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING get user info task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // Based on the clearance level of the individual, give them access to different information
        res.send(user);
      }
    }
  });
});



module.exports = router;
