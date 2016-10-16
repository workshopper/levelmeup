var keywiseFileName = require.resolve('../../data/keywise.json')

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    callback()
  },
  process: function (dbDir, result, callback) {
    require('../../lib/read-db')(dbDir, 'json', callback)
  },
  exec: function (dbDir, mod, callback) {
    mod(dbDir, keywiseFileName, callback)
  }
})
