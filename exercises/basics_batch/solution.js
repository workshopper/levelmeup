var fs = require('fs')
var level = require('level')

// read file and split into an array of lines
var data = fs.readFileSync(process.argv[3], 'utf8').split('\n')

level(process.argv[2], function (err, db) {
  if (err)
    throw err

  // chained batch object
  var batch = db.batch()
  data.forEach(function (line) {
    var d = line.split(',')
    if (d[0] == 'del')
      return batch.del(d[1])
    batch.put(d[1], d[2])
  })
  // commit the batch
  batch.write()
})

/* Alternative method:

  var operations = data.map(function (line) {
    var d = line.split(',')
    // 'value' is ignored for del
    return { type: d[0], key: d[1], value: d[2] }
  })

  db.batch(operations, function (err) {
    if (err)
      throw err
    db.close()
  })

*/
