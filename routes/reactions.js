const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError } = require('../services/errorhandling')
const categoryProtected = require('../services/category-protection')

route
  .get('/', categoryProtected, async (req, res, next) => {
    try {
      const { category } = req.query
      const reactionImages = await reactionFinder.findReactions(category)
      res.json(reactionImages)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })
  .get('/random', async(req, res, next) => {
    try {
      const { category } = req.query;
      if(typeof category !== 'undefined') {
        await categoryProtected(req, res, next)
        const reaction = await reactionFinder.findRandomReactionWithCategory(category)
        res.json(reaction)
      } else {
        const reaction = await reactionFinder.findRandomReaction()
        res.json(reaction)
      }
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

module.exports = route
