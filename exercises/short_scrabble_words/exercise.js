var fs = require('fs')
var path = require('path')
var through2 = require('through2')
var sample = require('lodash.sample')
var level = require('level')

function loadWords (file) {
  return fs.readFileSync(path.join(__dirname, '../../data/', file), 'utf8').split(/\s|\n/g)
}

var twoLetter = loadWords('sowpods_2.dat')
var threeLetter = loadWords('sowpods_3.dat')
var fourLetter = loadWords('sowpods_4.dat')
var words = []
  .concat(twoLetter)
  .concat(threeLetter)
  .concat(fourLetter)
  .filter(Boolean)

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  init: function () {
    var queries = [
      sample(twoLetter).substr(0, 1) + '*',
      sample(twoLetter),
      sample(threeLetter).substr(0, 1) + '**',
      sample(threeLetter).substr(0, 2) + '*',
      sample(threeLetter),
      sample(fourLetter).substr(0, 1) + '***',
      sample(fourLetter).substr(0, 2) + '**',
      sample(fourLetter).substr(0, 3) + '*',
      sample(fourLetter),
      'NODE'
    ]
    return {
      prepare: function (db, callback) {
        callback()
      },
      exec: function (dbDir, mod, callback) {
        if (typeof mod !== 'object') {
          throw String('{error.mod.not_object}')
        }
        if (typeof mod.init !== 'function') {
          throw String('{error.mod.init_missing}')
        }
        if (typeof mod.query !== 'function') {
          throw String('{error.mod.query_missing}')
        }
        var db = level(dbDir)
        mod.init(db, words, function (error) {
          if (error) {
            return db.close(callback.bind(null, error))
          }
          var _createReadStream = db.createReadStream
          db.createReadStream = function () {
            return _createReadStream.apply(db, arguments).pipe(through2({ objectMode: true },
              function (chunk, enc, callback) {
                result.count += 1
                callback(null, chunk)
              }
            ))
          }
          var result
          var runQueries = queries.concat()
          var next = function () {
            var query = runQueries.shift()
            result = {
              data: {},
              count: 0
            }
            mod.query(db, query, function (err, data) {
              if (!err) {
                result.data[query] = data
              }
              if (err || runQueries.length === 0) {
                return db.close(callback.bind(null, err, result))
              }
              next()
            })
          }
          next()
        })
      }
    }
  }
})
