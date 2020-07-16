const imagePendingBlock = ({reaction, category}) => {
  if(!reaction || !category) return null
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": category,
          "emoji": true
        },
        "image_url": reaction,
        "alt_text": category
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Send",
              "emoji": true
            },
            "style": "primary",
            "value": JSON.stringify({
              reaction,
              category
            })
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Shuffle",
              "emoji": true
            },
            "value": category
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Cancel",
              "emoji": true
            },
            "style": "danger",
            "value": "cancel_reaction"
          }
        ]
      }
    ]
  }
}

const imageBlock = (image, category) => {
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

const notFoundBlock = image => {
  return {
      "response_type": "ephemeral",
      "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "WAA- I- I can't understand that command.  P- P- Pwease use the /nene categories command to see what I can handle uwu."
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

const infoBlock = () => {
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "H- Hello.  My name is Nene. \n\n I- If you wan't me to post a reaction image I need to know wh- what category to pick from. \n\n T- To see which categories I have available type */nene categories*  \n\n Once you find the category type */nene category-name* so I can grab the reaction. \n\n If you just w-wan't a random reaction type */nene* and I will find one randomly.  \n\n I-I'm not perfect so if I mess up p-pwease open an issue on <https://github.com/uzair-ashraf/anime-reaction-api|GitHub>."
        }
      }
    ]
  }
}


module.exports = {
  imageBlock,
  categoriesBlock,
  notFoundBlock,
  imagePendingBlock,
  infoBlock
}
