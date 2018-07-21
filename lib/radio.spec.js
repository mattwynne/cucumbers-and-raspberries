'use strict'

const Radio = require('./radio')
const buildPlayer = require('./player/build')
const buildUi = require('./ui/build')
const stations = require('../fixtures/station_urls')

describe('a radio', () => {
  const { player, assertCurrentlyPlaying, assertVolumeIs } = buildPlayer({ type: 'fake_player' })
  const { ui, changeStation, increaseVolume } = buildUi({ type: 'fake_ui' })

  it('turns on', async () => {
    const radio = new Radio({ player, ui })
    const stationName = "BBC Radio 4"
    radio.setStationUrls([stations[stationName]])
    await radio.on()
    await assertCurrentlyPlaying({ expectedStationName: stationName, player })
  })

  it('turns off', async () => {
    const radio = new Radio({ player, ui })
    const stationName = "BBC Radio 4"
    radio.setStationUrls([stations[stationName]])
    await radio.on()
    await radio.off()
    await assertCurrentlyPlaying({ expectedStationName: 'nothing', player })
  })

  it('changes station once', async () => {
    const radio = new Radio({ player, ui })
    radio.setStationUrls([stations["BBC Radio 4"], stations["BBC Radio 6 Music"]])
    await radio.on()
    await changeStation({ ui })
    await assertCurrentlyPlaying({ expectedStationName: 'BBC Radio 6 Music', player })
  })

  it('increases the volume', async () => {
    const radio = new Radio({ player, ui })
    radio.setStationUrls([stations["BBC Radio 4"]])
    radio.setVolume(10)
    await radio.on()
    await increaseVolume({ ui })
    await assertVolumeIs({ volume: 15, player })
  })
})
