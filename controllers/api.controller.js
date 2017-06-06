// Import the model to use its database functions.
var Article = require("../models/article.js")
var Comment = require("../models/comment.js")
const request = require("request")
const cheerio = require("cheerio")
const urlToScrape = 'http://www.zeit.de/politik/index'

// Create all our routes and set up logic within those routes where required.
module.exports.getArticle = async (req, res) => {
  Article.find({}).populate('comments').exec((err, found) => {
    if (err) {
      console.log(err)
    } else {
      res.json(found)
    }
  })
}

module.exports.getComments = async (req, res) => {
  Comment.find({}).populate('_article').exec((err, comments) => {
    if (err) {
      console.log(err)
    } else {
      res.json(comments)
    }
  })
}

module.exports.scrapeArticles = async (req, res) => {
  request(urlToScrape, function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var articles = [];

    $('a.teaser-small__combined-link').each((i, element) => {

      var link = $(element).attr("href");
      var headline = $(element).attr("title");

      if (!link.includes("shop.zeit.de")) {
        // Save these results in an object that we'll push into the result array we defined earlier
        articles.push({
          updateOne: {
            filter: {
              headline: headline
            },
            update: {
              link: link
            },
            upsert: true
          }
        });
      }
    });
    console.log(JSON.stringify(articles, null, 2))
    Article.bulkWrite(articles, (error, bulkWriteOpResult) => {
      if (error) {
        console.log(error)
      } else {
        console.log(bulkWriteOpResult)
        res.json(bulkWriteOpResult)
      }
    })
  });
}

module.exports.postComment = async (req, res) => {
  var newComment = new Comment(req.body)
  console.log(req.body)
  let articleId = req.body['_article']
  newComment.save((err) => {
    if (err) console.log(err)
    Article.update({ "_id": articleId }, {$push: { "comments": newComment._id }}, (err, numAffected) => {
      if(err) console.log(err)
      else {
        res.json(newComment)
      }});
  })
}

module.exports.delComment = async (req, res) => {
  Comment.deleteOne({ "_id": req.body.commentId}, (err, result) => {
    console.log("Deleted comment " + req.body.commentId)
    console.log(JSON.parse(result))
    res.json(result)
  })
}
