const route = require('express-promise-router')()
const {findCategories} = require('../services/file-system')
route
  .get('/', async (req, res, next) => {
    try {
      const categories = await findCategories()
      res.json(categories)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })


module.exports = route
