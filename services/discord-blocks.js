const Discord = require('discord.js')

const imageBlock = ({reaction, category}) => {
  return new Discord.RichEmbed({
    title: category,
    image: {
      url: reaction,
    },
  })
}
const infoBlock = () => {
  return new Discord.RichEmbed({
    title: 'GitHub',
    url: 'https://github.com/uzair-ashraf/anime-reaction-api',
    description: "H- Hello.  My name is Nene. \n\n I- If you wan't me to post a reaction image I need to know wh- what category to pick from. \n\n T- To see which categories I have available type *!nene categories*  \n\n Once you find the category type *!nene category-name* so I can grab the reaction. \n\n If you just w-wan't a random reaction type *!nene* and I will find one randomly.  \n\n I-I'm not perfect so if I mess up p-pwease open an issue on my G-GitHub.",
  })
}

const categoriesBlock = categories => {
  const categoryList = categories.reduce((acc, cur) => {
    return acc + (cur + ' \n')
  }, '')
  return new Discord.RichEmbed({
    title: 'H-Here are the list of my categories you can choose from.',
    description: categoryList
  })
}

module.exports = {
  imageBlock,
  infoBlock,
  categoriesBlock
}
