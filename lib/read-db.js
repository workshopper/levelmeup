var level = require('level')

module.exports = function (dir, callback) {
  var db = level(dir)
  var result = {}
  var stream = db.readStream()
  stream.on('data', function (entry) {
    result[entry.key] = entry.value
  })
  stream.on('end', function () {
    db.close(function () {
      callback(result)
    })
  }) 
}
