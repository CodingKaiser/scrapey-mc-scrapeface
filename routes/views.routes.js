const express = require('express')
const viewController = require('../controllers/views.controller.js')

const router = express.Router()

module.exports = router
  .get('/', viewController.home)
  .get('/saved', viewController.saved)
