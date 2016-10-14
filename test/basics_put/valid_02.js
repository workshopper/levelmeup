var level = require('level')
module.exports = function (databaseDir, obj, callback) {
  var db = level(databaseDir)
  var keys = Object.keys(obj)
  var next = function () {
    var key = keys.shift()
    db.put(key, obj[key], function () {
      if (keys.length === 0) {
        return db.close(function () {
          return callback()
        })
      }
      next()
    })
  }
  next()
}
