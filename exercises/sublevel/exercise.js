module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    callback()
  },
  process: function (dbDir, result, callback) {
    require('../../lib/read-db')(dbDir, 'utf8', callback)
  },
  exec: function (dbDir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 2) {
      throw '{error.mod.not_long_enough}'
    }
    mod(dbDir, callback)
  }
})
