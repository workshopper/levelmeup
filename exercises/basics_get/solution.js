var level = require('level')

module.exports = function (databaseDir, callback) {
  var db = level(databaseDir)
  var error
  db.on('error', function (err) {
    error = err
  })
  var result = []

  var fetchNext = function fetchNext (i) {
    var key = 'key' + i
    db.get(key, function (err, value) {
      if (err) {
        if (!err.notFound) {
          error = err
        }
      } else {
        result.push(value)
      }

      if (i < 100 && !error) {
        fetchNext(i + 1)
      } else {
        db.close(function (err) {
          callback(error || err, result)
        })
      }
    })
  }
  fetchNext(0)
}
