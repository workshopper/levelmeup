var level = require('level')

module.exports = function (databaseDir, input, callback) {
  var db = level(databaseDir, function () {
    Object.keys(input.put).forEach(function (key) {
      db.put(key, input.put[key])
    })
    input.del.forEach(function (key) {
      db.del(key)
    })
    db.close(callback)
  })
}
