module.exports.init = function (db, words, callback) {
  var batch = words.map(function (word) {
    // length-prefixed keys, separated by a '!' so we
    // can query by length
    var key = word.length + '!' + word
    return { type: 'put', key: key, value: word }
  })
  db.batch(batch, callback)
}

module.exports.query = function (db, word, callback) {
  var words = []
  var key = word.length + '!' + word
  var error
  db.createReadStream({ start: key, end: key + '\xff' })
    .on('data', function (data) {
      words.push(data.key)
    })
    .on('error', function (err) {
      error = err
    })
    .on('end', function () {
      callback(error, words)
    })
}
