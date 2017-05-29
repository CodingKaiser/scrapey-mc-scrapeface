// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose");

var Article = new mongoose.Schema({
  headline: String,
  link: String,
  comments: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', Article);
