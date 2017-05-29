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

const PORT = 8080


// Initialize Express
var app = express();
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Mongoose set-up
const localDbUrl = 'mongodb://localhost/9-scrape'
mongoose.connect(process.env.MONGOLAB_URI || localDbUrl)

app.use("/", viewRouter)
app.use("/api", apiRouter)

// Listen on port PORT
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
