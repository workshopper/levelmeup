var level = require('level')

module.exports = function (databaseDir, key, callback) {
  var db = level(databaseDir)
  db.get(key, function (err, value) {
    if (err) {
      return callback(err)
    }
    db.close(function () {
      callback(value)
    })
  })
}
