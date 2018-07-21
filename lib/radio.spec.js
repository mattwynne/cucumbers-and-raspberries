'use strict'

const Radio = require('./radio')
const buildPlayer = require('./player/build')
const buildUi = require('./ui/build')
const stations = require('../fixtures/station_urls')

describe('a radio', () => {
  const { player, assertCurrentlyPlaying, assertVolumeIs } = buildPlayer({ type: 'fake_player' })
  const { ui, changeStation, increaseVolume, decreaseVolume } = buildUi({ type: 'fake_ui' })

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

  context('controlling the volume', () => {
    const radio = new Radio({ player, ui })
    radio.setStationUrls([stations["BBC Radio 4"]])

    it('increases the volume', async () => {
      radio.setVolume(10)
      await radio.on()
      await increaseVolume({ ui })
      await assertVolumeIs({ volume: 15, player })
    })

    it('decreases the volume', async () => {
      radio.setVolume(10)
      await radio.on()
      await decreaseVolume({ ui })
      await assertVolumeIs({ volume: 5, player })
    })

    it('has a maximum volume', async () => {
      radio.setVolume(100)
      await radio.on()
      await increaseVolume({ ui })
      await assertVolumeIs({ volume: 100, player })
    })

    it('has a minimum volume', async () => {
      radio.setVolume(0)
      await radio.on()
      await decreaseVolume({ ui })
      await assertVolumeIs({ volume: 0, player })
    })
  })
})
