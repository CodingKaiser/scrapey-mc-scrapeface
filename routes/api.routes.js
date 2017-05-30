const express = require('express')
const apiController = require('../controllers/api.controller.js')

const router = express.Router()

module.exports = router
  .get('/all', apiController.getArticle)
  .post('/scrape', apiController.scrapeArticles)
  .post('/comment', apiController.postComment)
