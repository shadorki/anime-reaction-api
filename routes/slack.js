const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')
const {
      imageBlock,
      categoriesBlock,
      notFoundBlock,
      imagePendingBlock,
      infoBlock
    } = require('../services/slack-blocks')
const { cancelMessage, shuffleMessage, sendMessage } = require('../services/slack-interactions')
const path = require('path')
const fetch = require('node-fetch')

route
  .post('/', async (req, res, next) => {
    try {
      const [command] = req.body.text.split(' ')
      if(!command) {
        // Send a random reaction
        const reaction = await reactionFinder.findRandomReaction()
        reaction.category = 'random'
        const image = imagePendingBlock(reaction)
        res.json(image)
      } else if (command === 'info') {
        const message = infoBlock()
        res.json(message)
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
      const data = payload.actions[0].value
      let isResponseSuccessful = false

      const actions = {
        Cancel: async () => {
          isResponseSuccessful = await cancelMessage(response_url)
        },
        Shuffle: async () => {
          let nextReaction = null
          if(data === 'random') {
            nextReaction = await reactionFinder.findRandomReaction()
            nextReaction.category = 'random'
          } else {
            nextReaction = await reactionFinder.findRandomReactionWithCategory(data)
          }
          const nextImage = imagePendingBlock(nextReaction)
          isResponseSuccessful = await shuffleMessage(response_url, nextImage)
        },
        Send: async () => {
          const image = JSON.parse(data)
          const newImageBlock = imageBlock(image.reaction, image.category)
          isResponseSuccessful = await sendMessage(response_url, newImageBlock)
        }
      }

      await actions[interaction]()

      if(isResponseSuccessful) {
        res.status(200)
      } else {
        throw new ServerError('Unexpected Error Occurred', 500)
      }
    } catch(err) {
      console.error(err)
      next(err)
    }
  })
  .get('/oauth', async (req, res, next) => {
    try {
      const { code } = req.query
      const data = new URLSearchParams({
        code,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_uri: process.env.SLACK_REDIRECT_URI
      })
      const response = await fetch('https://slack.com/api/oauth.v2.access', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: data
      })
      const responseData = await response.json()
      if(responseData.ok) {
        res.sendFile(path.join(__dirname, '../views/successful-install.html'))
      } else {
        throw new ServerError('Unexpected Error Occurred', 500)
      }
    } catch(err) {
      console.log(err)
      next(err)
    }
  })

module.exports = route
