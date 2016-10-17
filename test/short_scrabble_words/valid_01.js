module.exports.init = function (db, words, callback) {
  var batch = words.map(function (word) {
    return { type: 'put', key: word.length + '!' + word, value: word }
  })
  db.batch(batch, callback)
}

module.exports.query = function (db, word, callback) {
  var words = []
  var key = word.length + '!' + word.replace(/\*/g, '')
  var error
  db.createReadStream({ start: key, end: key + '\xff' })
    .on('data', function (data) {
      words.push(data.value)
    })
    .on('error', function (err) {
      error = err
    })
    .on('end', function () {
      callback(error, words)
    })
}
