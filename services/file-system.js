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
const findReactions = async category => {
  try {
    const reactions = await readdirAsync(path.join(__dirname, `../reactions/${category}`))
    return reactions.map(reaction => `${process.env.URL}/${category}/${reaction}`)
  } catch(err) {
    console.error(err)
  }
}
const findRandomReaction = async () => {
  try {
    const categories = await findCategories()
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const reactions = await findReactions(randomCategory)
    return reactions[Math.floor(Math.random() * reactions.length)]
  } catch(err) {
    console.error(err)
  }
}
const findRandomReactionWithCategory = async category => {
  try {
    const reactions = await findReactions(category)
    return reactions[Math.floor(Math.random() * reactions.length)]
  } catch(err) {
    console.error(err)
  }
}
const reactionFinder = {
  findCategories,
  findReactions,
  findRandomReaction,
  findRandomReactionWithCategory
}
module.exports = reactionFinder
