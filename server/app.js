var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var portDecision = process.env.PORT || 3000;
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var users = require('./routes/users');
var books = require('./routes/books');
var nodemailer = require('nodemailer');
var User = require('./models/user');
var cron = require('cron');


app.use(express.static('server/public'));
app.use(bodyParser.json());

//Connect to database
mongoConnection.connect();

//Static Files
app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
app.use(decoder.token);

//Routes
app.use('/books', books)
app.use('/users', users);


app.listen(portDecision, function(){
  console.log('running on port', portDecision);
});


//DAILY EMAIL
var transporter = nodemailer.createTransport();
var cronJob = cron.job("0 */01 * * * *", function() {
  User.find({},
    function(err, collection) {
      if(err) {
        console.log('Error in GET: ', err);
      } else {
          var hasCurrentBook = false;
          for (var i = 0; i < collection.length; i++) {
            for (var j = 0; j < collection[i].books.length; j++) {
              if (collection[i].books[j].currently_reading === true) {
                hasCurrentBook = true;
                var pagesLeft = Number(collection[i].books[j].pages) - Number(collection[i].books[j].page_at);
                var daysLeft = getTimeRemaining(collection[i].books[j].finished_by_goal);
                var toRead = pagesToReadPerDay(daysLeft, pagesLeft)
                var mailOptions = {
                  from: 'noreply@addabook.com',
                  to: collection[i].email,
                  subject: 'Your A Book A Week Daily Update',
                  html: '<h1 style="text-align: center;color: rgb(56,63,81);">Hi ' + collection[i].name + '</h1><div class="book_container" style="margin-left: 50px;height: 250px;width: 65%;display: flex;align-items: center;"><div style="height: 100%;;width: 33%;"><img src="' + collection[i].books[j].book_thumbnail + '" style="margin: 0 auto;"></div><div style="height: 100%;;width: 66%;"><p class="book_info" style="text-align: center;color: rgb(56,63,81);margin-left: 50px;width: 500px;">You are currently at page ' + collection[i].books[j].page_at + ' in <b>' + collection[i].books[j].title + '</b>. You need to read ' + toRead + ' pages to stay on pace for the week! <a href="http://localhost:3000" style="color: rgb(56,63,81);">Click Here to update your progress.</a></p></div></div>'
                };
                transporter.sendMail(mailOptions, function(error, info) {
                if(error) {
                  console.log("Error: ", error);
                } else {
                  console.log("Message Sent: ", info.response);
                }
                });

              }
            }

          }
      }
    }
  );
});

//Calculate days left to finish book
function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var days = Math.floor( t/(1000*60*60*24) );
  return days + 1;
}
//Calculate pages the user would need to read per day to meet goal
function pagesToReadPerDay(days, pages) {
  console.log("Days: " + days + "Pages: ", pages);
  return Math.round(pages / days);
}
cronJob.start();
