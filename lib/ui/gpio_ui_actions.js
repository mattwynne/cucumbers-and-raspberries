'use strict'

const { promisify } = require('util')
const read = promisify(require('read'))

module.exports = {
  changeStation: async ({ timeout }) => {
    await read({ 
      prompt: "Please change station manually. Press [ENTER] when done.",
      timeout: timeout - 1
    })
  },
  increaseVolume: async ({ timeout }) => {
    await read({ 
      prompt: "Please increase volume manually. Press [ENTER] when done.",
      timeout: timeout - 1
    })
  },
  decreaseVolume: async ({ timeout }) => {
    await read({ 
      prompt: "Please decrease volume manually. Press [ENTER] when done.",
      timeout: timeout - 1
    })
  },
  muteVolume: async ({ timeout }) => {
    await read({
      prompt: "Please press the mute button. Press [ENTER] when done.",
      timeout: timeout - 1
    })
  }
}
