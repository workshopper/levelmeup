var level = require('level')
module.exports = function (databaseDir, day, callback) {
  var db = level(databaseDir)
  var stream = db.createReadStream({
    start: day,
    end: day + '\xff'
  })
  var result = []
  stream.on('data', function (data) {
    result.push(data.value)
  })
  stream.on('end', function () {
    db.close(callback.bind(null, result))
  })
}
