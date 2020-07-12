const reactionFinder = require('../services/file-system')
const { ClientError } = require('../services/errorhandling')

module.exports = async (req, res, next) => {
  try {
    const { category } = req.query
    console.log(category)
    if (!category) throw new ClientError('Please supply a category.', 400)
    console.log(reactionFinder)
    const categoriesArr = await reactionFinder.findCategories()
    const categories = new Set(categoriesArr)
    if (!categories.has(category)) throw new ClientError('Please send a valid category.', 400)
    console.log('we made it this far')
    next()
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
