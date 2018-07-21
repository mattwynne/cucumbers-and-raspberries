'use strict'

module.exports = class FakePlayer {
  get currentStationUrl() {
    return this._currentStationUrl
  }

  get currentVolume() {
    return this._currentVolume
  }

  play(url) {
    if (!url)
      throw new Error(`Unable to play station at URL: '${url}'`)
    this._currentStationUrl = url
  }

  setVolume(volume) {
    this._currentVolume = volume
  }

  stop() {
    this._currentStationUrl = null
  }
}

