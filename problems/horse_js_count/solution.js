var level = require('level')
var db = level(process.argv[2])
var tweets = 0

db.createReadStream({ start: process.argv[3] })
  .on('data', function (data) {
    tweets++
  })
  .on('end', function () {
    console.log(tweets)
  })
