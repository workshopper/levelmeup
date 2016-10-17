var level = require('level')

module.exports = function (databaseDir, obj, callback) {
  var db = level(databaseDir)
  var error

  for (var key in obj) {
    db.put(key, obj[key])
  }
  db.on('error', function (err) {
    error = err
  })
  db.close(function (err) {
    callback(error || err)
  })
}
