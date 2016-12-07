var level = require('level')
module.exports = function (dir, date, callback) {
  var db = level(dir)
  var tweets = 0
  var error
  db.createReadStream({ start: date })
    .on('data', function (data) {
      tweets++
    })
    .on('error', function (err) {
      error = err
    })
    .on('end', function () {
      db.close(function (err) {
        callback(error || err, tweets)
      })
    })
}
