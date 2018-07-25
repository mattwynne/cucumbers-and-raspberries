'use strict'

const actions = require('./gpio_ui_actions')
const verifyContract = require('./verify_ui_contract')
const GpioUi = require('./gpio_ui')

const factory = () => new GpioUi({ debug: true })

try {
  const GpioUi = require('./gpio_ui')
  describe("a GPIO UI @slow", () => {
    verifyContract({ factory, ...actions })
  })
} catch (error) {
  console.log(`skipping GPIO UI tests: ${error}`)
}
