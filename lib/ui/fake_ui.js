'use strict'

module.exports = class FakeUi {
  constructor() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
  }

  onChangeStation(handler) {
    this._onChangeStation = handler
  }

  onIncreaseVolume(handler) {
    this._onIncreaseVolume = handler
  }

  changeStation() {
    this._onChangeStation()
  }

  increaseVolume() {
    this._onIncreaseVolume()
  }

  stop() {
    this._onChangeStation = () => {}
    this._onIncreaseVolume = () => {}
  }
}
