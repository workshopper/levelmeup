var level = require('level')

module.exports = function (databaseDir, key, callback) {
  var db = level(databaseDir)
  var error
  db.get(key, function (err, value) {
    if (err) {
      error = err
    }
    db.close(function (err) {
      callback(error || err, value)
    })
  })
}
