var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema for books array in user schema
var bookSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  pages: Number,
  book_start_date: Date,
  book_finished_date: Date,
  book_thumbnail: String,
  isbn: Number,
  currently_reading: {type: Boolean, default: true},
  page_at: {type: Number, default: 0}
});

var userSchema = new Schema({
  email: {type: String, required: true},
  first_name: String,
  last_name: String,
  started_date: Date,
  books: [bookSchema]
});

userSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var User = mongoose.model('User', userSchema);

// step 3 - export our model
module.exports = User;
