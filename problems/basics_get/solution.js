var level = require('level')
var db = level(process.argv[2])

function fetchNext (i) {
  var key = 'gibberish' + i
  db.get(key, function (err, data) {
    if (err) {
      if (!err.notFound)
        throw err
    } else
      console.log(key + '=' + data)

    if (i < 100)
      fetchNext(i + 1)
  })
}

fetchNext(0)