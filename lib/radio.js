'use strict'

module.exports = class Radio {
  constructor({ player, ui }) {
    this._player = player
    this._ui = ui
    this._stationUrls = []
    this._stationIndex = 0
    this._volume = 50
    this._isMuted = false
  }

  setStationUrls(stationUrls) {
    this._stationUrls = stationUrls
  }

  setVolume(volume) {
    this._volume = volume
    this._player.setVolume(volume)
  }

  _muteVolume() {
    this._isMuted = !this._isMuted
    const newVolume = this._isMuted ? 0 : this._volume
    this._player.setVolume(newVolume)
  }

  on() {
    this._player.play(this._stationUrls[this._stationIndex])
    this._ui.onChangeStation(() => this._changeStation())
    this._ui.onIncreaseVolume(() => this._increaseVolume())
    this._ui.onDecreaseVolume(() => this._decreaseVolume())
    this._ui.onMuteVolume(() => this._muteVolume())
  }

  off() {
    this._player.stop()
  }

  _changeStation() {
    this._stationIndex += 1
    if (this._stationIndex === this._stationUrls.length)
      this._stationIndex = 0
    this._player.play(this._stationUrls[this._stationIndex])
  }

  _decreaseVolume() {
    if (this._volume === 0) return
    this.setVolume(this._volume - 5)
  }

  _increaseVolume() {
    if (this._volume === 100) return
    this.setVolume(this._volume + 5)
  }
}

