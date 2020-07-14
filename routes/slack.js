const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')
const { imageBlock, categoriesBlock } = require('../services/slack-blocks')

route
  .post('/', async (req, res, next) => {
    try {
      const commands = req.body.text.split('')
      if(!commands.length) {
        // Send a random reaction
        const reaction = await reactionFinder.findRandomReaction()
        const image = imageBlock(reaction)
        res.json(image)
      } else {
        const [command] = commands
        if(command === 'categories') {
          const categories = await reactionFinder.findCategories()
          const categoryBlock = categoriesBlock(categories)
          res.json(categoryBlock)
        }
      }
    } catch(err) {
      next(err)
    }
  })

module.exports = route
