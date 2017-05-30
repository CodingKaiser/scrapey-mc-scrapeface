// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var Article = new mongoose.Schema({
  headline: String,
  link: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model('Article', Article);
