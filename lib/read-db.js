var level = require('level')

module.exports = function (dir, valueEncoding, callback) {
  level(dir, { valueEncoding: valueEncoding }, function (err, db) {
    if (err) {
      if (err.type === 'OpenError') {
        return callback(dir + '\n\n{error.db.not_closed}')
      } else {
        return callback(dir + '\n\n{error.mod.unexpected}:\n\n```\n' + ((err && err.stack) || err) + '\n```')
      }
    }
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
  })
}
