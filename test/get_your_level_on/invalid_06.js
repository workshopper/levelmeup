var level = require('level')

module.exports = function (dir, key, callback) {
  var db = level(dir)
  setTimeout(function () {
  	callback(null, {})
 	})/*
  db.get(key, function (err, value) {
    if (err)
      throw err

    console.log(value)
  })*/
}
