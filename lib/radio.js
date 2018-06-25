'use strict'

module.exports = class Radio {
  constructor({ player, ui }) {
    this._player = player
    this._ui = ui
    this._stationUrls = []
    this._stationIndex = 0
  }

  setStationUrls(stationUrls) {
    this._stationUrls = stationUrls
  }

  on() {
    this._player.play(this._stationUrls[this._stationIndex])
    this._ui.onChangeStation(() => {
      this._stationIndex += 1
      if (this._stationIndex === this._stationUrls.length)
        this._stationIndex = 0
      this._player.play(this._stationUrls[this._stationIndex])
    })
  }

  off() {
    this._player.stop()
  }
}

