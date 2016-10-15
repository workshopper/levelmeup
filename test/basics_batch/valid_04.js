var level = require('level')

module.exports = function (databaseDir, input, callback) {
  var db = level(databaseDir, function () {
    var batch = db.batch()
    Object.keys(input.put).forEach(function (key) {
      batch.put(key, input.put[key])
    })
    input.del.forEach(batch.del.bind(batch))
    batch.write(function () {
      db.close(callback)
    })
  })
}
