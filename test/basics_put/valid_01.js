var level = require('level')
module.exports = function (databaseDir, obj, callback) {
  var db = level(databaseDir)
  Object.keys(obj).forEach(function (key) {
    db.put(key, obj[key])
  })
  db.close(function () {
    callback()
  })
}
