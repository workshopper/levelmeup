var level = require('level')

module.exports = function (databaseDir, input, callback) {
  var db = level(databaseDir, function () {
    var putKeys = Object.keys(input.put)
    var nextPut = function () {
      var key = putKeys.pop()
      db.put(key, input.put[key], function () {
        if (putKeys.length === 0) {
          db.close(callback)
        } else {
          nextPut()
        }
      })
    }
    var nextDel = function () {
      var key = input.del.pop()
      db.del(key, function () {
        if (input.del.length === 0) {
          nextPut()
        } else {
          nextDel()
        }
      })
    }
    nextDel()
  })
}
