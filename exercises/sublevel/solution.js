var level = require('level')
module.exports = function (databaseDir, callback) {
  var sub = require('level-sublevel')
  var db = sub(level(databaseDir))
  var error
  db.on('error', function (err) {
    error = err
  })

  var robots = db.sublevel('robots')
  robots.put('slogan', 'beep boop')

  var dinosaurs = db.sublevel('dinosaurs')
  dinosaurs.put('slogan', 'rawr')

  db.close(function (err) {
    callback(error || err)
  })
}
