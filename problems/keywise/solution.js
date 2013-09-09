var level = require('level')
var db = level(process.argv[2])
var data = require(process.argv[3])
var operations = data.map(function (row) {
  var key
  if (row.type === 'user') {
    key = row.name
  }
  else if (row.type === 'repo') {
    key = row.user + '!' + row.name
  }
  return { type: 'put', key: key, value: JSON.stringify(row) }
})

db.batch(operations)