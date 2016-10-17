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
        if (mod.length < 2) {
          throw String('{error.mod.not_long_enough}')
        }
        mod(dbDir, function () {
          require('../../lib/read-db')(dbDir, 'utf8', callback)
        })
      }
    }
  }
})
