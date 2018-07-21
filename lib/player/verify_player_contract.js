'use strict'

const assert = require('assert')
const stations = require('../../fixtures/station_urls')

module.exports =  ({ factory, assertCurrentlyPlaying, assertVolumeIs, timeout }) => 
  describe("a player", () => {
    let player

    beforeEach(() => {
      player = factory()
    })

    it("plays a station URL", async () => {
      const expectedStationName = "BBC Radio 4"
      player.play(stations[expectedStationName])
      await assertCurrentlyPlaying({ expectedStationName, player, timeout })
    }).timeout(timeout)

    it("refuses to play an invalid URL", async () => {
      assert.throws(
        () => player.play(null), 
        "Unable to play station at URL: 'null'"
      )
    })

    it("sets the volume when something is playing", async () => {
      const volume = 50
      const expectedStationName = "BBC Radio 4"
      player.play(stations[expectedStationName])
      await assertCurrentlyPlaying({ expectedStationName, player, timeout })
      player.setVolume(volume)
      await assertVolumeIs({ volume, player, timeout })
    }).timeout(timeout)

    it("does not crash attempting to set the volume when nothing is playing", async () => {
      const volume = 50
      player.setVolume(volume)
    }).timeout(timeout)

    afterEach(async () => {
      player.stop()
    })
  })
