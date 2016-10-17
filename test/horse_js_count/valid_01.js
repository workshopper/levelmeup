var level = require('level')
module.exports = function (databaseDir, date, callback) {
  var db = level(databaseDir, function () {
    var stream = db.createReadStream({start: date})
    var i = 0
    var error
    stream.on('data', function () {
      i++
    })
    stream.on('error', function (err) {
      error = err
    })
    stream.on('end', function () {
      db.close(function (err) {
        callback(error || err, i)
      })
    })
  })
}
