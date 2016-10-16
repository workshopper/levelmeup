var path = require('path')
var shuffle = require('lodash.shuffle')
var gibberish = require('../../lib/gibberish')

var ops = []
for (var i = 0; i < 10; ++i) {
  ops.push({
    type: 'put',
    key: 'key' + Math.floor(Math.random() * (i == 1 ? 10 : 100)),
    value: gibberish()
  })
}

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  prepare: function (db, callback) {
    db.batch(ops, callback)
  },
  exec: function (dir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 2) {
      throw '{error.mod.not_long_enough}'
    }
    mod(dir, callback)
  }
})
