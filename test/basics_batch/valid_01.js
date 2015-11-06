var fs = require('fs')
var level = require('level')
var inputFile = process.argv[3]
var dbFile = process.argv[2]

fs.readFile(inputFile, 'utf8', function (error, data) {
  if (error) throw error

  level(dbFile, function (error, db) {
    if (error) throw error

    var batch = db.batch()
    data.split('\n').forEach(function (line) {
      var delValue = /^del\,(.*)$/.exec(line)[1]
      if (delValue !== null)
        return batch.del(delValue)
      var parts = /^([^,]+)\,(.*)$/.exec(line)
      batch.put(parts[1], parts[2])
    })
    batch.write()
  })
})
