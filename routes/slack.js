const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')
const { imageBlock, categoriesBlock, notFoundBlock } = require('../services/slack-blocks')
const fetch = require('node-fetch')

route
  .post('/', async (req, res, next) => {
    try {
      const [command] = req.body.text.split(' ')
      if(!command) {
        // Send a random reaction
        const reaction = await reactionFinder.findRandomReaction()
        const image = imageBlock(reaction)
        res.json(image)
      } else {
        const categories = await reactionFinder.findCategories()
        if(command === 'categories') {
          const categoryBlock = categoriesBlock(categories)
          res.json(categoryBlock)
        } else {
          if(!categories.includes(command)) {
            const sadReaction = await reactionFinder.findRandomReactionWithCategory('sad')
            const notFound = notFoundBlock(sadReaction)
            res.json(notFound)
          } else {
            const reaction = await reactionFinder.findRandomReactionWithCategory(command)
            const image = imageBlock(reaction)
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
      console.log(req.body)
      const { response_url } = req.body
      const interaction = req.body.actions[0].value
      if(interaction === 'cancel_reaction') {
        const response = await fetch(response_url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            "delete_original": "true"
          })
        })
        if(response.status === 200) {
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
