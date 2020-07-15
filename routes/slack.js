const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')
const { imageBlock, categoriesBlock, notFoundBlock, imagePendingBlock } = require('../services/slack-blocks')
const { cancelMessage, shuffleMessage } = require('../services/slack-interactions')

const fetch = require('node-fetch')

route
  .post('/', async (req, res, next) => {
    try {
      const [command] = req.body.text.split(' ')
      if(!command) {
        // Send a random reaction
        const reaction = await reactionFinder.findRandomReaction()
        const image = imagePendingBlock(reaction)
        console.log(image)
        res.json(image)
      } else {
        const categories = await reactionFinder.findCategories()
        if(command === 'categories') {
          const categoryBlock = categoriesBlock(categories)
          res.json(categoryBlock)
        } else {
          if(!categories.includes(command)) {
            const sadReaction = await reactionFinder.findRandomReactionWithCategory('sad')
            const notFound = notFoundBlock(sadReaction.reaction)
            res.json(notFound)
          } else {
            const reaction = await reactionFinder.findRandomReactionWithCategory(command)
            const image = imagePendingBlock(reaction)
            res.json(image)
          }
        }
      }
    } catch(err) {
      next(err)
    }
  })
  .post('/interaction', async (req, res, next) => {
    try {
      const payload = JSON.parse(req.body.payload)
      const { response_url } = payload
      const interaction = payload.actions[0].text.text
      if(interaction === 'Cancel') {
        const isCancelled = await cancelMessage(response_url)
        if(isCancelled) {
          res.status(200)
        } else {
          throw new ServerError('Unexpected Error Occurred', 500)
        }
      }
      if (interaction === 'Shuffle') {
        const category = payload.actions[0].value
        console.log(category)
        const nextReaction = await reactionFinder.findRandomReactionWithCategory(category)
        const isShuffled = await shuffleMessage(response_url, nextReaction.reaction)
        if (isShuffled) {
          res.status(200)
        } else {
          throw new ServerError('Unexpected Error Occurred', 500)
        }
      }
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

module.exports = route
