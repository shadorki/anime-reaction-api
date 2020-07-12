const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError } = require('../services/errorhandling')
const categoryProtected = require('../services/category-protection')

route
  .get('/', categoryProtected, async (req, res, next) => {
    try {
      console.log('hit')
      const { category } = req.query
      const reactionImages = await reactionFinder.findReactions(category)
      return res.json(reactionImages)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })
  .get('/random', async(req, res, next) => {
    try {
      const { category } = req.query;
      if(typeof category === 'undefined') {
        const reaction = await reactionFinder.findRandomReaction()
        return res.json({reaction})
      } else {
        if (!category) throw new ClientError('Please supply a category.', 400)
        const categoriesArr = await reactionFinder.findCategories()
        const categories = new Set(categoriesArr)
        if (!categories.has(category)) throw new ClientError('Please send a valid category.', 400)
        const reaction = await reactionFinder.findRandomReactionWithCategory(category)
        return res.json({reaction})
      }
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

module.exports = route
