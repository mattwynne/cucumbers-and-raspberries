'use strict'

module.exports = class FakeUi {
  constructor() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
    this._onDecreaseVolume = () => {}
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

  changeStation() {
    this._onChangeStation()
  }

  increaseVolume() {
    this._onIncreaseVolume()
  }

  decreaseVolume() {
    this._onDecreaseVolume()
  }

  stop() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
    this._onDecreaseVolume = () => {}
  }
}
