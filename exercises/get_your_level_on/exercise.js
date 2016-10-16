var sample = require('lodash.sample')
var key = 'levelmeup_' + Date.now().toString(32) + '_' + (Math.random() * 1000 | 0)
var value = sample([
  'You have been LEVELED UP!',
  'A LEVEL UP for you!',
  'More LEVELS for you!',
  'Your LEVEL has gone UP!',
  'One LEVEL for you!',
  'LEVELS and LEVELS for you!',
  'Another one has a LEVEL!',
  'LEVEL increased!',
  'You have got another LEVEL!',
  'Your LEVEL was just a raised!',
  'Hey you\'ve made it to the next LEVEL!',
  'You are a LEVEL explorer!',
  'Here is a bag of LEVELS!',
  'LEVELED you up for the win!'
])

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    db.put(key, value)
    setImmediate(callback)
  },
  process: function (dir, result, callback) {
    callback(result)
  },
  exec: function (dir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 3) {
      throw '{error.mod.not_long_enough}'
    }
    mod(dir, key, callback)
  }
})
