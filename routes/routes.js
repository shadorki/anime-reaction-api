const router = require('express-promise-router')()
const categories = require('./categories')
router
  .use('/categories', categories)

module.exports = router
