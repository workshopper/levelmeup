var level = require('level')
var db = level(process.argv[2])
var obj = JSON.parse(process.argv[3])

for (var key in obj) {
  db.put(key, obj[key])
}