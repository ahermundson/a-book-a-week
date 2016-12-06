var express = require('express');
var router = express.Router();
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




module.exports = router;
