var level = require('level')
var through2 = require('through2')

module.exports = function (databaseDir) {
  var db = level(databaseDir)
  return db.createReadStream()
    .pipe(through2({objectMode: true}, function (data, enc, next) {
      this.push(data.key + '=' + data.value)
      next()
    }, function (next) {
      db.close(next)
    }))
}
