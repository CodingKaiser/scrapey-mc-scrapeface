// Import the model (cat.js) to use its database functions.
var Article = require("../models/article.js");

// Create all our routes and set up logic within those routes where required.
module.exports.home = async (req, res) => {
  res.render("index", {})
}

module.exports.saved = async (req, res) => {
  Article.find({}).limit(10).sort({ date: 1 }).exec((err, found) => {
    if (err) {
      console.log(err)
    } else {
      console.log(JSON.stringify(found, null, 2))
      res.render("articles", { articles: found })
    }
  })
}
