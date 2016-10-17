var level = require('level')
module.exports = function (databaseDir, day, callback) {
  var tweets = []
  var db = level(databaseDir)
  db.createReadStream({ start: day, end: day + '\xff' })
    .on('data', function (data) {
      tweets.push(data.value)
    })
    .on('end', function () {
      db.close(function () {
        callback(tweets)
      })
    })
}
