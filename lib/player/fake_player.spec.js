'use strict'

const FakePlayer = require('./fake_player')
const verifyPlayerContract = require('./verify_player_contract')
const assertions = require('./fake_player_assertions')

const factory = () => new FakePlayer()

describe("an fake player", () => {
  verifyPlayerContract({ factory, timeout: 2000, ...assertions })
})
