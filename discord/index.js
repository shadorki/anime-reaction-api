require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const reactionFinder = require('../services/file-system')
const discordBlocks = require('../services/discord-blocks')

client.once('ready', () => {
  console.log('Nene is now ready')
})

client.on('message', async message => {
  try {
    const data = message.content.split(' ')
    const [mainCommand] = data
    if (mainCommand !== '!nene') return;
    console.log(data)
    // only random
    if (data.length === 1) {
      const reaction = await reactionFinder.findRandomReaction()
      const image = discordBlocks.imageBlock(reaction)
      message.channel.send(image)
    } else {
      const [,command] = data
      if(command === 'info') {
        message.channel.send(discordBlocks.infoBlock())
      } else if(command === 'categories') {
        const categories = await reactionFinder.findCategories()
        message.channel.send(discordBlocks.categoriesBlock(categories))
      } else {
        const categories = await reactionFinder.findCategories()
        if(categories.includes(command)) {
          const reaction = await reactionFinder.findRandomReactionWithCategory(command)
          message.channel.send(discordBlocks.imageBlock(reaction))
        } else {

        }
      }
    }
  } catch(err) {
    console.error(err)
    message.channel.send('uhh- I think I made an error. ._. sowee')
  }
})

client.login(process.env.DISCORD_TOKEN)
