var express = require('express');
var router = express.Router();
// bring in our mongoose model
var User = require('../models/user');


//Route to get all books ot display on book shelf. Should return users book array. Send this to factory so you can pick it off for the night stand
router.get('/', function(req, res) {
  User.findOne(
    { email: 'alex.hermundson@gmail.com' },
    { books: true},
    function(err, collection) {
      if(err) {
        console.log('Error in GET: ', err);
      } else {
        res.send(collection);
      }
    }
  )
});


//Route to add a new book to the users profile
router.put('/', function(req, res) {
  User.findOneAndUpdate(
    { email: 'alex.hermundson@gmail.com'},
    { $push: { books: req.body } },
    function(err) {
      if(err) {
        console.log('Put ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  )
});


module.exports = router;
