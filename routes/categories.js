const route = require('express-promise-router')()
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdirAsync = promisify(fs.readdir)
route
  .get('/', async (req, res, next) => {
    try {
      const categories = await readdirAsync(path.join(__dirname, '../reactions'))
      res.json(categories)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })


module.exports = route
