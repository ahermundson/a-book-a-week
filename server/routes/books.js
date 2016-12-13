var express = require('express');
var router = express.Router();
// bring in our mongoose model
var User = require('../models/user');


//Route to get all books ot display on book shelf. Should return users book array. Send this to factory so you can pick it off for the night stand
router.get('/', function(req, res) {
  User.findOne(
    { email: req.decodedToken.email },
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

//router to update page number of current book
router.put('/update/:book_id', function(req, res) {
  console.log(req.params.book_id);
  console.log("Got to correct books router: ", req.body);
  User.findOneAndUpdate({ email: req.decodedToken.email, 'books._id': req.params.book_id},
    { $set: {'books.$.page_at' : req.body.updatedPageNumber }},
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

//router to update current book to finished
router.put('/finished/:book_id', function(req, res) {
  console.log(req.params.book_id);
  console.log("Got to correct books router: ", req.body);
  User.findOneAndUpdate({ email: req.decodedToken.email, 'books._id': req.params.book_id},
    { $set: {'books.$.page_at' : req.body.page_at, 'books.$.book_finished_date' : req.body.finished_date, 'books.$.currently_reading' : false }},
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

//Route to add a new book to the users profile
router.put('/', function(req, res) {
  User.findOneAndUpdate(
    { email: req.decodedToken.email},
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
