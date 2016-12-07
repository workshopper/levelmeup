var level = require('level')
module.exports = function (databaseDir, callback) {
  var db = require('level-sublevel')(level(databaseDir))
  db.sublevel('robots').put('slogan', 'beep boop')
  db.sublevel('dinosaurs').put('slogan', 'rawr')
  db.close(callback)
}
