var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//import bookSchema
var Books = require('./book-model').schema;


var userSchema = new Schema({
  email: {type: String, required: true},
  name: String,
  started_date: Date,
  books: [Books]
});

userSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var User = mongoose.model('User', userSchema);

// step 3 - export our model
module.exports = User;
