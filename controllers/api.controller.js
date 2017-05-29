// Import the model to use its database functions.
var Article = require("../models/article.js")
const request = require("request")
const cheerio = require("cheerio")
const urlToScrape = 'http://www.zeit.de/politik/index'

// Create all our routes and set up logic within those routes where required.
module.exports.getArticle = async (req, res) => {
  Article.find({}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      res.json(found)
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
      if (error) console.log(error)
      console.log(bulkWriteOpResult)
    })
  });

  // Article.update({headline: "This is a test"}, {link: "http://www.zeit.de/politik/ausland/2017-05/emmanuel-macron-wladimir-putin-angela-merkel"}, {upsert: true}, (err, raw) => {
  //   if (err) console.log(err)
  //   console.log(raw)
  // })
}
