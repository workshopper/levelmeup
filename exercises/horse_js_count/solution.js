var level = require('level')
module.exports = function (dir, date, callback) {
  var tweets = 0
  var db = level(dir)
  db.createReadStream({ start: date })
    .on('data', function (data) {
      tweets++
    })
    .on('end', function () {
      db.close(function () {
        callback(tweets)
      })
    })
}
