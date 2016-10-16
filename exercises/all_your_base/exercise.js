var sample = require('lodash.sample')
var key = 'levelmeup_' + Date.now().toString(32) + '_' + (Math.random() * 1000 | 0)
var value = sample([
    [ 'BASE', 'US' ]
  , [ 'LANDS AND POSESSIONS', 'VIKINGS OF WESTERN NORWAY' ]
  , [ 'INDEPENDENCE', 'KING HENRY VIII' ]
  , [ 'INTERNET COMMUNICATIONS', 'THE NSA' ]
  , [ 'TICKS', 'LIBUV' ]
])

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  prepare: function (db, callback) {
    setImmediate(callback)
  },
  exec: function (dir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 3) {
      throw '{error.mod.not_long_enough}'
    }
    mod(value[0], value[1], callback)
  }
})
