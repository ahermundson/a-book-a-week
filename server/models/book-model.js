var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Book schema for subdocument in User books array
var bookSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  pages: Number,
  book_start_date: Date,
  finished_by_goal: Date,
  book_finished_date: Date,
  book_thumbnail: String,
  isbn: Number,
  currently_reading: {type: Boolean, default: true},
  page_at: {type: Number, default: 0}
});

bookSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Book = mongoose.model('Book', bookSchema);

// step 3 - export our model
module.exports = Book;
