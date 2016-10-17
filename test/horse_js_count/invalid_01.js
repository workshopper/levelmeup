var level = require('level')
module.exports = function (databaseDir, date, callback) {
  var db = level(databaseDir, function () {
    var stream = db.createReadStream({start: date})
    var i = 1
    stream.on('data', function () {
      i++
    })
    stream.on('end', function () {
      db.close(callback.bind(null, i))
    })
  })
}
