var level = require('level')

module.exports = function (databaseDir, keywiseFile, callback) {
  var db = level(databaseDir, { valueEncoding: 'utf8' })
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
  }), db.close.bind(db, callback))
}
