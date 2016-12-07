var level = require('level')
module.exports = function (databaseDir, day, callback) {
  var db = level(databaseDir)
  var stream = db.createReadStream({
    start: day,
    end: day
  })
  var result = []
  var error
  stream.on('data', function (data) {
    result.push(data.value)
  })
  stream.on('error', function (err) {
    error = err
  })
  stream.on('end', function () {
    db.close(function (err) {
      callback(error || err, result)
    })
  })
}
