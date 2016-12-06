var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var portDecision = process.env.PORT || 3000;
// var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var users = require('./routes/users');
var books = require('./routes/books');


app.use(express.static('server/public'));
app.use(bodyParser.json());

//Connect to database
mongoConnection.connect();


//Routes
app.use('/books', books)
app.use('/users', users);

app.get('/', function(req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

// app.use(decoder.token);

app.listen(portDecision, function(){
  console.log('running on port', portDecision);
});
