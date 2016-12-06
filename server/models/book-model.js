var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// step 1: create the Schema
var bookSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  pages: Number,
  book_start_date: Date,
  book_finished_date: Date,
  book_thumbnail: String,
  isbn: Number,
  currently_reading: {current_book: Boolean, page_at: Number}
});

bookSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Book = mongoose.model('Book', bookSchema);

// step 3 - export our model
module.exports = Book;
