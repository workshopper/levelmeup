var level = require('level')

module.exports = function (databaseDir, changes, callback) {
  var db = level(databaseDir)
  var error
  db.on('error', function (err) {
    error = err
  })
  var ops = changes.del.map(function (key) {
    return {
      type: 'del',
      key: key
    }
  }).concat(Object.keys(changes.put).map(function (key) {
    return {
      type: 'put',
      key: key,
      value: changes.put[key]
    }
  }))
  db.batch(ops, function (err) {
    if (err) {
      error = err
    }
    db.close(function (err) {
      callback(error || err)
    })
  })
}
