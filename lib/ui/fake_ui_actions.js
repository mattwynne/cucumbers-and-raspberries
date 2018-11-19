'use strict'

module.exports = {
  changeStation: async ({ ui }) => ui.changeStation(),
  increaseVolume: async ({ ui }) => ui.increaseVolume(),
  decreaseVolume: async ({ ui }) => ui.decreaseVolume(),
  muteVolume: async ({ ui }) => ui.muteVolume()
}
