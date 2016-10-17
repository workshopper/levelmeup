var level = require('level')

module.exports = function (dir, key, callback) {
  var db = level(dir)
  db.get(key, function (error, value) {
    db.close(function (err) {
      callback(error || err, value)
    })
  })
}
