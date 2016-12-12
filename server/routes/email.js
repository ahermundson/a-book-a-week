var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport();

var mailOptions = {
  from: 'alex.hermundson@gmail.com',
  to: 'alex.hermundson@gmail.com',
  subject: 'hello',
  html: '<b>hello world!</b>',
  text: 'hello world!'
}

// transporter.sendMail(mailOptions, function(error, info) {
//   if(error) {
//     console.log("Error: ", error);
//   } else {
//     console.log("Message Sent: ", info.response);
//   }
// });

module.exports = router;
