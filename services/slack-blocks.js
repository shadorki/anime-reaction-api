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
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Shuffle",
              "emoji": true
            },
            "value": "new_reaction"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Cancel",
              "emoji": true
            },
            "value": "cancel_reaction"
          }
        ]
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

const notFoundBlock = image => {
  return {
      "response_type": "ephemeral",
      "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "WAA- I- I can't understand that command.  P- P- Pwease use the /weeb categories command to see what I can handle uwu."
        },
        "accessory": {
          "type": "image",
          "image_url": image,
          "alt_text": "404"
        }
      }
    ]
  }
}


module.exports = {
  imageBlock,
  categoriesBlock,
  notFoundBlock
}
