var gibberish = require('../../lib/gibberish')

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  init: function () {
    var ops = []
    for (var i = 0; i < 10; ++i) {
      ops.push({
        type: 'put',
        key: 'key' + Math.floor(Math.random() * (i === 1 ? 10 : 100)),
        value: gibberish()
      })
    }
    return {
      prepare: function (db, callback) {
        db.batch(ops, callback)
      },
      exec: function (dir, mod, callback) {
        if (typeof mod !== 'function') {
          throw String('{error.mod.not_function}')
        }
        if (mod.length < 2) {
          throw String('{error.mod.not_long_enough}')
        }
        mod(dir, callback)
      }
    }
  }
})
