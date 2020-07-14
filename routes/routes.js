const router = require('express-promise-router')()
const categories = require('./categories')
const reactions = require('./reactions')
const slack = require('./slack')

router
  .use('/categories', categories)
  .use('/reactions', reactions)
  .use('/slack', slack)

module.exports = router
