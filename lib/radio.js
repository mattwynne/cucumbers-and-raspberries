'use strict'

module.exports = class Radio {
  constructor({ player, ui }) {
    this._player = player
    this._ui = ui
    this._stationUrls = []
    this._stationIndex = 0
    this._volume = 50
  }

  setStationUrls(stationUrls) {
    this._stationUrls = stationUrls
  }

  setVolume(volume) {
    this._volume = volume
    this._player.setVolume(volume)
  }

  on() {
    this._player.play(this._stationUrls[this._stationIndex])
    this._ui.onChangeStation(() => {
      this._stationIndex += 1
      if (this._stationIndex === this._stationUrls.length)
        this._stationIndex = 0
      this._player.play(this._stationUrls[this._stationIndex])
    })
    this._ui.onIncreaseVolume(() => this.setVolume(this._volume + 5))
    this._ui.onDecreaseVolume(() => this.setVolume(this._volume - 5))
  }

  off() {
    this._player.stop()
  }
}

