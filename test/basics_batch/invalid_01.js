var fs = require('fs')
var level = require('level')

var data = fs.readFileSync(process.argv[3], 'utf8').split('\n')

level(process.argv[2], function (err, db) {
  if (err)
    throw err

  var batch = db.batch()
  data.forEach(function (line) {
    var d = line.split(',')
    if (d[0] == 'del')
      return batch.del(d[1])
  })
  batch.write()
})