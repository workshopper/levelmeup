var level = require('level')
var net = require('net')
var multilevel = require('multilevel')

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  prepare: function (db, callback) {
    db.put('multilevelmeup', '`Twas brillig, and the slithy toves\n\tDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\n\tAnd the mome raths outgrabe.', callback)
  },
  exec: function (dbDir, mod, callback) {
    if (typeof mod !== 'function') {
      throw String('{error.mod.not_function}')
    }
    if (mod.length < 1) {
      throw String('{error.mod.not_long_enough}')
    }
    var db = level(dbDir)
    var server = net
      .createServer(function (con) {
        con.pipe(multilevel.server(db)).pipe(con)
      })
      .listen(4545, function (conn) {
        mod(function (data) {
          server.close(function () {
            db.close(function () {
              callback(data)
            })
          })
        })
      })
  }
})
