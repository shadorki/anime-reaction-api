const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')
const { imageBlock, categoriesBlock, notFoundBlock } = require('../services/slack-blocks')

route
  .post('/', async (req, res, next) => {
    try {
      const commands = req.body.text.split(' ')
      if(!commands.length) {
        // Send a random reaction
        const reaction = await reactionFinder.findRandomReaction()
        const image = imageBlock(reaction)
        res.json(image)
      } else {
        const [command] = commands
        const categories = await reactionFinder.findCategories()
        if(command === 'categories') {
          const categoryBlock = categoriesBlock(categories)
          res.json(categoryBlock)
        } else {
          if(!categories.includes(command)) {
            const sadReaction = await reactionFinder.findRandomReactionWithCategory('sad')
            res.json(sadReaction)
          }
        }
      }
    } catch(err) {
      next(err)
    }
  })

module.exports = route
