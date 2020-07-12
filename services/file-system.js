const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdirAsync = promisify(fs.readdir)

const findCategories = async () => {
  try {
    return await readdirAsync(path.join(__dirname, '../reactions'))
  } catch (err) {
    console.error(err)
  }
}
const findReactions = async(category) => {
  try {
    const reactions = await readdirAsync(path.join(__dirname, `../reactions/${category}`))
    return reactions.map(reaction => `${process.env.URL}/${category}/${reaction}`)
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  findCategories,
  findReactions
}
