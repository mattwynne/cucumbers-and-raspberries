'use strict'

module.exports = class FakeUi {
  constructor() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
    this._onDecreaseVolume = () => {}
    this._onMuteVolume = () => {}
  }

  onChangeStation(handler) {
    this._onChangeStation = handler
  }

  onIncreaseVolume(handler) {
    this._onIncreaseVolume = handler
  }

  onDecreaseVolume(handler) {
    this._onDecreaseVolume = handler
  }
  
  onMuteVolume(handler) {
    this._onMuteVolume = handler
  }

  changeStation() {
    this._onChangeStation()
  }

  increaseVolume() {
    this._onIncreaseVolume()
  }

  decreaseVolume() {
    this._onDecreaseVolume()
  }

  muteVolume() {
    this._onMuteVolume()
  }

  stop() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
    this._onDecreaseVolume = () => {}
    this._onMuteVolume = () => {}
  }
}
