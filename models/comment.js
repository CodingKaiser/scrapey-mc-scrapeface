// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var Comment = new mongoose.Schema({
  _article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  contents: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', Comment);
