'use strict'

const assert = require('assert')
const { defineParameterType, setDefaultTimeout, Before, After, Given, When, Then } = require('cucumber')
const buildRadio = require('../../lib/build')

const stations = require('../../fixtures/station_urls')

const config = {
  player: {
    type: process.env.player_type || 'fake_player',
    debug: false
  },
  ui: {
    type: process.env.ui_type || 'fake_ui',
    debug: true
  }
}

setDefaultTimeout(10 * 1000)

Before(async function () {
  Object.assign(this, buildRadio(config))
})

defineParameterType({
  name: 'stationName',
  regexp: new RegExp(`(${Object.keys(stations).join("|")})`)
})

Given('a station is configured', function () {
  this.theStationName = "BBC Radio 4"
  this.radio.setStationUrls([stations[this.theStationName]])
})

Given('these stations are configured:', async function (dataTable) {
  const stationNames = dataTable.raw().map(row => row[0])
  const stationUrls = stationNames.map(name => stations[name])
  this.radio.setStationUrls(stationUrls)
})

Given('the radio has been turned on', async function () {
  this.radio.on()
  await this.assertCurrentlyPlaying({ expectedStationName: this.theStationName, ...this })
})

Given('the volume is {int}%', function (volume) {
  this.player.setVolume(volume)
})

Given('the radio is playing', function () {
  this.radio.setStationUrls([stations["BBC Radio 4"]])
  this.radio.on()
})

When('the radio is turned on', function () {
  this.radio.on()
})

When('the station is changed', function () {
  this.changeStation(this)
})

When('the radio is turned off', function () {
  this.radio.off()
})

When('the volume is increased', async function () {
  await this.increaseVolume(this)
})

When('the volume is decreased', async function () {
  await this.decreaseVolume(this)
})

When('the volume is muted', async function () {
  await this.muteVolume(this)
})

When('the volume is un-muted', async function () {
  await this.muteVolume(this)
})

Then('the station should be playing', async function () {
  await this.assertCurrentlyPlaying({ expectedStationName: this.theStationName, ...this })
})

Then('{stationName} should be playing', async function (stationName) {
  await this.assertCurrentlyPlaying({ expectedStationName: stationName, ...this })
})

Then('nothing should be playing', async function () {
  await this.assertCurrentlyPlaying({ expectedStationName: "nothing", ...this })
})

Then('the volume should be {int}%', async function (volume) {
  await this.assertVolumeIs({ volume, ...this })
})

After(async function () {
  this.player.stop()
  this.ui.stop()
})
