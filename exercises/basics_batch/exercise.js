var path = require('path')
var shuffle = require('lodash.shuffle')
var gibberish = require('../../lib/gibberish')
var generate = require('../../lib/generate')
var del = generate(5 + (Math.random() * 20 | 0))
var mod = generate(5 + (Math.random() * 20 | 0))
var put = generate(5 + (Math.random() * 20 | 0))
var ops = []
Object.keys(del).forEach(function (key) {
  ops.push({
    type: 'put',
    key: key,
    value: del[key]
  })
})
Object.keys(mod).forEach(function (key) {
  ops.push({
    type: 'put',
    key: key,
    value: gibberish()
  })
  put[key] = mod[key]
})

var changes = {
  del: Object.keys(del),
  put: put
}

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  prepare: function (db, callback) {
    db.batch(ops, callback)
  },
  process: function (dir, result, callback) {
    require('../../lib/read-db')(dir, 'utf8', callback)
  },
  exec: function (dir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 3) {
      throw '{error.mod.not_long_enough}'
    }
    mod(dir, changes, callback)
  }
})
