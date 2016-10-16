var level = require('level')
module.exports = function (databaseDir, callback) {
  var db = level(databaseDir)
  db.put('!robots!slogan', 'beep boop')
  db.put('!dinosaurs!slogan', 'rawr')
  db.close(callback)
}
