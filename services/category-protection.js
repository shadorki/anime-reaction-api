const reactionFinder = require('../services/file-system')
const { ClientError } = require('../services/errorhandling')

module.exports = async (req, res, next) => {
  try {
      console.log('hit')
    const { category } = req.query
    if (!category) throw new ClientError('Please supply a category.', 400)
    console.log(reactionFinder)
    const categoriesArr = await reactionFinder.findCategories()
    const categories = new Set(categoriesArr)
    if (!categories.has(category)) throw new ClientError('Please send a valid category.', 400)
    next()
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
