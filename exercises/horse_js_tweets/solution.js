var level = require('level')
module.exports = function (databaseDir, day, callback) {
  var tweets = []
  var db = level(databaseDir)
  var error
  db.createReadStream({ gte: day, lte: day + '\xff' })
    .on('data', function (data) {
      tweets.push(data.value)
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
