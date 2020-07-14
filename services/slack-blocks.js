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

module.exports = {
  imageBlock
}
