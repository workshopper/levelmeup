var path = require('path')
var level = require('level')
var generate = require('../../lib/generate')
var data = generate(5 + (Math.random() * 20 | 0))

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    callback()
  },
  process: function (dir, result, callback) {
    require('../../lib/read-db')(dir, 'utf8', callback)
  },
  exec: function (dir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 3) {
      throw '{error.mod.not_long_enough}'
    }
    mod(dir, data, callback)
  }
})
