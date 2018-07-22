'use strict'

const MpcPlayer = require('./mpc_player')
const verifyPlayerContract = require('./verify_player_contract')
const assertions = require('./mpc_player_assertions')

const factory = () => new MpcPlayer({ debug: true }) // set to `true` to see console output

const timeout = 9000

try {
  require('child_process').execSync('which mpc')
  describe("an MPC player @slow", () => {
    verifyPlayerContract({ factory, timeout, ...assertions })
  })
} catch (error) {
  console.log('skipping MPC player tests')
}
