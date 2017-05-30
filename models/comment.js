// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose");

var Comment = new mongoose.Schema({
  _article: {
    type: Number,
    ref: 'Article'
  }
  contents: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', Comment);
