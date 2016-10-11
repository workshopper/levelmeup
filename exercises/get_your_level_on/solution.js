var level = require('level')

module.exports = function (dir, key, callback) {
  var db = level(dir)
  db.get(key, function (err, value) {
    if (err) {
      throw err
    }

    db.close(callback.bind(null, value))
  })
}