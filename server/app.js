var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var portDecision = process.env.PORT || 3000;
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var users = require('./routes/users');
var books = require('./routes/books');
var cron = require('cron');
var User = require('./models/user');


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




var transporter = nodemailer.createTransport();
var cronJob = cron.job("0 */1 * * * *", function() {
  User.find({},
    function(err, collection) {
      if(err) {
        console.log('Error in GET: ', err);
      } else {
          for (var i = 0; i < collection.length; i++) {
            var mailOptions = {
              from: 'alex.hermundson@gmail.com',
              to: collection[i].email,
              subject: 'hello',
              html: '<b>Hi there, ' + collection[i].first_name + '</b>.'
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
  );
});
cronJob.start();
