var level = require('level')
var db = level(process.argv[2])
db.createReadStream()
  .on('data', function (data) {
    console.log(data.key + '=' + data.value)
  })
