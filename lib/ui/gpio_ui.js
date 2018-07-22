'use strict'

const Gpio = require('onoff').Gpio
const rotaryEncoder = require('onoff-rotary')

module.exports = class GpioUi {
  constructor({ debug }) {
    this._debug = debug
    this._button = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 })
    this._onIncreaseVolumeHandler = () => {}
    this._onDecreaseVolumeHandler = () => {}
    const volume = rotaryEncoder(26, 13)
    volume.on('rotation', direction =>
      (direction > 0) ?
        this._onIncreaseVolumeHandler()
        :
        this._onDecreaseVolumeHandler()
    )
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
}
