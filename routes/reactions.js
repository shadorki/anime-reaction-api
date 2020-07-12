const route = require('express-promise-router')()
const { findCategories, findReactions } = require('../services/file-system')
const { ClientError } = require('../services/errorhandling')

route
  .get('/', async (req, res, next) => {
    try {
      const { category } = req.query
      if(!category) throw new ClientError('Please supply a category.', 400)
      const categoriesArr = await findCategories()
      const categories = new Set(categoriesArr)
      if(!categories.has(category)) throw new ClientError('Please send a valid category.', 400)
      const reactionImages = await findReactions(category)
      res.json(reactionImages)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

module.exports = route
