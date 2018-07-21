'use strict'

const assert = require('assert')
const stations = require('../../fixtures/station_urls')

module.exports = {
  assertCurrentlyPlaying: async ({ expectedStationName, player }) =>
    assert.equal(player.currentStationUrl, stations[expectedStationName]),

  assertVolumeIs: async ({ volume, player }) =>
    assert.equal(player.currentVolume, volume)
}
