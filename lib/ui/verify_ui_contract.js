'use strict'

const assert = require('assert')
const sinon = require('sinon')

module.exports = ({ factory, changeStation, increaseVolume, decreaseVolume, timeout }) =>
  describe("a UI", () => {
    let ui

    beforeEach(() => {
      ui = factory()
    })

    it("changes station", async () => {
      const spy = sinon.spy()
      ui.onChangeStation(spy)
      await changeStation({ ui })
      assert(spy.called, "The onChangeStation callback was not called")
    }).timeout(timeout)

    it("increases volume", async () => {
      const spy = sinon.spy()
      ui.onIncreaseVolume(spy)
      await increaseVolume({ ui })
      assert(spy.called, "The onIncreaseVolume callback was not called")
    }).timeout(timeout)

    it("decreases volume", async () => {
      const spy = sinon.spy()
      ui.onDecreaseVolume(spy)
      await decreaseVolume({ ui })
      assert(spy.called, "The onDecreaseVolume callback was not called")
    }).timeout(timeout)

    afterEach(async () => {
      await ui.stop()
    })
  })
