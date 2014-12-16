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
  var key = word.length + '!' + word.replace(/\*/g, '')
  db.createReadStream({ start: key, end: key + '\xff' })
    .on('data', function (data) {
      words.push(data.value)
    })
    .on('error', function (err) {
      if (callback)
        callback(err)
      callback = null
    })
    .on('end', function () {
      if (callback)
        callback(null, words)
      callback = null
    })
}