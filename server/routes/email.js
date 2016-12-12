var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var User = require('../models/user');

var transporter = nodemailer.createTransport();
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 15;
rule.minute = 28;


router.get('/', function(req, res) {
  console.log("Got to get in book route");
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
          }
          var j = schedule.scheduleJob(rule, function() {

            transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
              console.log("Error: ", error);
            } else {
              console.log("Message Sent: ", info.response);
            }
            });
          });
        }
      }
    }
  )
});




module.exports = router;
