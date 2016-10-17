var level = require('level')

module.exports = function (databaseDir, keywiseFile, callback) {
  var db = level(databaseDir, { valueEncoding: 'json' })
  db.batch(require(keywiseFile).map(function (row) {
    var key = row.name
    if (row.type === 'repo') {
      key = row.user + '!' + key
    }
    return {
      type: 'put',
      key: key,
      value: row
    }
  }), function (error) {
    db.close(function (err) {
      callback(error || err)
    })
  })
}
