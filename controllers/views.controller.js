// Import the model (cat.js) to use its database functions.
var Article = require("../models/article.js");

// Create all our routes and set up logic within those routes where required.
module.exports.home = (req, res) => {
  res.render("index", {})
}

module.exports.saved = (req, res) => {
  Article.find({}).limit(20).populate('comments').sort({ _id: -1 }).exec((err, found) => {
    if (err) {
      console.log(err)
    } else {
      console.log(JSON.stringify(found, null, 2))
      res.render("articles", { articles: found })
    }
  })
}
