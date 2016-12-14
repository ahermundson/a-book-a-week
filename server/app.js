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


//DAILY EMAIL

// var transporter = nodemailer.createTransport();
// var cronJob = cron.job("0 */01 * * * *", function() {
//   User.find({},
//     function(err, collection) {
//       if(err) {
//         console.log('Error in GET: ', err);
//       } else {
//           for (var i = 0; i < collection.length; i++) {
//             var mailOptions = {
//               from: 'alex.hermundson@gmail.com',
//               to: collection[i].email,
//               subject: 'hello',
//               html: '<h1 style="text-align: center;">Hi there, ' + collection[i].first_name + '</h1><div class="book_container" style="margin-left: 50px;height: 250px;width: 80%;display: flex;justify-content: center;align-items: center;"><img src="https://books.google.com/books/content?id=8YZoBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73v_OF7d4fre9HXgIA1_t1LBVSN19DR_lTe6G-nYaHPT7NAALIh6mpicoirj7tGG7hhX7jKZ-Zo7UYS_dcxofcgiGlsu2MmPLRJqlySUy4Pehls8m4k4U28Og_N6Ilvp6LQxXcP"> <p class="book_info" style="margin-left: 50px;width: 500px;">You are currently at page ' + collection[i].page_at + ' in ' + collection[i].currently_reading + '. You need to read 20 pages to stay on pace for the week!. Click Here to update your progress.</p></div>'
//             };
//             transporter.sendMail(mailOptions, function(error, info) {
//             if(error) {
//               console.log("Error: ", error);
//             } else {
//               console.log("Message Sent: ", info.response);
//             }
//             });
//           }
//       }
//     }
//   );
// });
// cronJob.start();
