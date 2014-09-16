var level = require('level')
var db = level(process.argv[2])
var key = process.argv[3]

db.get(key, function (err, value) {
  if (err)
    throw err

  console.log(value)
})
