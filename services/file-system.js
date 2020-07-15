const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { ServerError } = require('../services/errorhandling')
const readdirAsync = promisify(fs.readdir)


const findCategories = async () => {
  try {
    return await readdirAsync(path.join(__dirname, '../reactions'))
  } catch (err) {
    console.error(err)
    return null
  }
}
const findReactions = async category => {
  try {
    const reactions = await readdirAsync(path.join(__dirname, `../reactions/${category}`))
    return reactions.map(reaction => `${process.env.URL}/${category}/${reaction}`)
  } catch(err) {
    console.error(err)
    return null
  }
}
const findRandomReaction = async () => {
  try {
    const categories = await findCategories()
    if(!categories) return null
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const reactions = await findReactions(randomCategory)
    if(!reactions) return null
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]
    return {
      reaction: randomReaction,
      category: randomCategory
    }
  } catch(err) {
    console.error(err)
    return null
  }
}
const findRandomReactionWithCategory = async category => {
  try {
    const reactions = await findReactions(category)
    if(!reactions) return null
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]
    return {
      reaction: randomReaction,
      category
    }
  } catch(err) {
    console.error(err)
    return null
  }
}
const reactionFinder = {
  findCategories,
  findReactions,
  findRandomReaction,
  findRandomReactionWithCategory
}
module.exports = reactionFinder
