const router = require('express-promise-router')()
const categories = require('./categories')
const reactions = require('./reactions')
router
  .use('/categories', categories)
  .use('/reactions', reactions)

module.exports = router
