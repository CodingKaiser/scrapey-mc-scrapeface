// Import the model (cat.js) to use its database functions.
var Article = require("../models/article.js");

// Create all our routes and set up logic within those routes where required.
module.exports.home = async (req, res) => {
  res.render("index", {})
}

module.exports.saved = async (req, res) => {
  res.render("articles", {})
}
