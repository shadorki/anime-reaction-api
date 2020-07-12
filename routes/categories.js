const route = require('express-promise-router')()
const { findCategories } = require('../services/file-system')
const { ServerError } = require('../services/errorhandling')
route
  .get('/', async (req, res, next) => {
    try {
      const categories = await findCategories()
      if(!categories) throw new ServerError('Unexpected Error Occurred', 500)
      res.json(categories)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })


module.exports = route
