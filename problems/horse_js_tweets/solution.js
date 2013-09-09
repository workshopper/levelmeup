module.exports = function (db, day, callback) {
  var tweets = []
  db.createReadStream({ start: day, end: day + '\xff' })
    .on('data', function (data) {
      tweets.push(data.value)
    })
    .on('error', function (err) {
      if (callback)
        callback(err)
      callback = null
    })
    .on('end', function () {
      if (callback)
        callback(null, tweets)
      callback = null
    })
}