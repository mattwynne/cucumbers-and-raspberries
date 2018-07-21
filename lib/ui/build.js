'use strict'

module.exports = ({ type, debug }) => {
  const Ui = require(`./${type}`)
  const ui = new Ui({ debug })
  const actions = require(`./${type}_actions`)
  return { ui, ...actions }
}
