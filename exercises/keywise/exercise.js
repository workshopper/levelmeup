var keywiseFileName = require.resolve('../../data/keywise.json')

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  init: function () {
    return {
      prepare: function (db, callback) {
        callback()
      },
      exec: function (dbDir, mod, callback) {
        if (typeof mod !== 'function') {
          throw String('{error.mod.not_function}')
        }
        if (mod.length < 3) {
          throw String('{error.mod.not_long_enough}')
        }
        mod(dbDir, keywiseFileName, function () {
          require('../../lib/read-db')(dbDir, 'json', callback)
        })
      }
    }
  }
})
