var level = require('level')
var Readable = require('stream').Readable
module.exports = function (databaseDir) {
  var db = level(databaseDir)
  var stream = db.createReadStream()
  var result = new Readable()
  result.setEncoding('utf8')
  result._read = function (size) {}
  stream.on('data', function (data) {
    result.push(data.key + ' = ' + data.value)
  })
  stream.on('end', function () {
    db.close(function () {
      result.push(null)
    })
  })
  stream.on('error', function (err) {
    result.emit('error', err)
  })
  return result
}
