var level = require('level')

module.exports = function (dir, valueEncoding, callback) {
  var db = level(dir, { valueEncoding: valueEncoding })
  var result = {}
  var stream = db.readStream()
  var error
  stream.on('data', function (entry) {
    result[entry.key] = entry.value
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
