'use strict'

const Gpio = require('onoff').Gpio

module.exports = class GpioUi {
  constructor({ debug }) {
    this._debug = debug
    this._button = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 })
    this._rotaryA = new Gpio(26, 'in', 'rising', { debounceTimeout: 10 })
    this._rotaryB = new Gpio(13, 'in', 'rising', { debounceTimeout: 10 })
    this._isRotating = false
    this._onIncreaseVolumeHandler = () => { }
    this._onDecreaseVolumeHandler = () => { }
    this._rotaryA.watch(() => {
      if (this._debug) console.log("rotary A", this._isRotating)
      this._rotate(this._onIncreaseVolumeHandler)
    })
    this._rotaryB.watch(() => {
      if (this._debug) console.log("rotary B", this._isRotating)
      this._rotate(this._onDecreaseVolumeHandler)
    })
  }

  onChangeStation(handler) {
    this._button.watch(() => {
      if (this._debug) console.log("click!")
      handler()
    })
  }

  onIncreaseVolume(handler) {
    this._onIncreaseVolumeHandler = handler
  }

  onDecreaseVolume(handler) {
    this._onDecreaseVolumeHandler = handler
  }

  stop() {
    this._button.unexport()
  }

  _rotate(handler) {
    if (!this._isRotating) {
      this._isRotating = true
      return
    }
    handler()
    this._isRotating = false
  }
}
