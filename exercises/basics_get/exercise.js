var path = require('path')
var shuffle = require('lodash.shuffle')
var gibberish = require('../../lib/gibberish')

var ops = []
for (var i = 0; i < 10; ++i) {
  ops.push({
    type: 'put',
    key: 'key' + Math.floor(Math.random() * (i == 1 ? 10 : 100)),
    value: gibberish()
  })
}

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    db.batch(ops, callback)
  },
  process: function (dir, result, callback) {
    callback(result)
  },
  exec: function (dir, mod, callback) {
    mod(dir, callback)
  }
})
