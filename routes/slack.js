const route = require('express-promise-router')()
const reactionFinder = require('../services/file-system')
const { ClientError, ServerError } = require('../services/errorhandling')

route
  .post('/', async (req, res, next) => {
    try {
      console.log(req.headers)
      console.log(req.header)
      res.send("https://anime-reactions.uzairashraf.dev/surprised/O6.jpg")
    } catch(err) {
      next(err)
    }
  })

module.exports = route
