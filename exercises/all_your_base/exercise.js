var sample = require('lodash.sample')
var key = 'levelmeup_' + Date.now().toString(32) + '_' + (Math.random() * 1000 | 0)
var value = sample([
    [ 'BASE', 'US' ]
  , [ 'LANDS AND POSESSIONS', 'VIKINGS OF WESTERN NORWAY' ]
  , [ 'INDEPENDENCE', 'KING HENRY VIII' ]
  , [ 'INTERNET COMMUNICATIONS', 'THE NSA' ]
  , [ 'TICKS', 'LIBUV' ]
])

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    setImmediate(callback)
  },
  process: function (dir, result, callback) {
    callback(result)
  },
  exec: function (dir, mod, callback) {
    mod(value[0], value[1], callback)
  }
})
