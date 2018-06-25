'use strict'

const buildRadio = require('./build')
const config = {
  player: {
    type: 'mpc_player',
    debug: true
  },
  ui: {
    type: 'gpio_ui',
    debug: true
  }
}

const { radio } = buildRadio(config)
radio.setStationUrls([
  "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4fm_mf_p",
  "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_6music_mf_p",
  "http://direct.fipradio.fr/live/fip-midfi.mp3",
])
radio.on()
console.log('The radio is playing.')
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', () => {
    radio.off()
    process.exit()
  }
  console.log('Press any key to exit')
}
