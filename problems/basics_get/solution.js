var level = require('level')
var db = level(process.argv[2])

function fetchNext (i) {
  db.get('gibberish' + i, function (err, data) {
    if (err) {
      if (err.name == 'NotFoundError')
        return
      throw err
    }

    console.log(data)
    fetchNext(i + 1)
  })
}

fetchNext(1)