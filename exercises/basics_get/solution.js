var level = require('level')

module.exports = function (dir, callback) {
  var db = level(dir)
  var result = []

  var fetchNext = function fetchNext (i) {
    var key = 'key' + i
    db.get(key, function (err, value) {
      if (err) {
        if (!err.notFound) {
          throw err
        }
      } else {
        result.push(value)
      }

      if (i < 100) {
        fetchNext(i + 1)
      } else {
        db.close(function () {
          callback(result)
        })
      }
    })
  }
  fetchNext(0)
}
