var level = require('level')
var db = level(process.argv[2])

db.get('levelmeup', function (err, value) {
  if (err)
    throw err

  console.log(value)
})
