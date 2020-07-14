const imageBlock = (image, category = 'Anime Reaction') => {
  return {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": category,
          "emoji": true
        },
        "image_url": image,
        "alt_text": category
      }
    ]
  }
}

const categoriesBlock = categories => {
  const categoryList = categories.reduce((acc, cur) => {
    return acc + (cur + ' \n')
  }, '')
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "Here are the categories you can pick from.",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": categoryList,
          "emoji": true
        }
      }
    ]
  }
}


module.exports = {
  imageBlock,
  categoriesBlock
}
