'use strict'

// Dependencies
const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const cheerio = require("cheerio")
const mongoose = require('mongoose')
const exphbs = require("express-handlebars");
const viewRouter = require("./routes/views.routes.js")
const apiRouter = require("./routes/api.routes.js")

const PORT = process.env.PORT || 8080


// Initialize Express
var app = express();
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Mongoose set-up
const localDbUrl = 'mongodb://localhost/9-scrape'
mongoose.connect("mongodb://heroku_nzcmzxww:vuss4k2oh07ts9r3gap5a02pi7@ds155841.mlab.com:55841/heroku_nzcmzxww")
// process.env.MONGOLAB_URI || localDbUrl
var db = mongoose.connection;
// Log any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use("/", viewRouter)
app.use("/api", apiRouter)

// Listen on port PORT
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});

module.exports = app
