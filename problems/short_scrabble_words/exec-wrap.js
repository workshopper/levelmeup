module.exports.init = function () {}
module.exports.args = -1

const path     = require('path')
    , fs       = require('fs')
    , level    = require('level')
    , wrapped  = require('../../lib/wrapped-level')
    , db       = level(process.argv[4])
    , file     = process.argv[3]
    , solution = require(path.resolve(process.cwd(), file))
    , through2 = require('through2')

var words = fs.readFileSync(path.join(__dirname, '../../data/sowpods_2.dat'), 'utf8')
  .split(/(?:\+| ) .+$\n?/m)
  .concat(fs.readFileSync(path.join(__dirname, '../../data/sowpods_3.dat'), 'utf8').split(/\s|\n/g))
  .concat(fs.readFileSync(path.join(__dirname, '../../data/sowpods_4.dat'), 'utf8').split(/\s|\n/g))
  .filter(Boolean)

if (typeof solution.init != 'function')
  return console.log(file, 'does not export an init() function')

if (typeof solution.query != 'function')
  return console.log(file, 'does not export an query() function')

function methodUsed (db, methodName, method, args) {
  if (!/Stream/.test(methodName))
    return

  return method.apply(db, args).pipe(through2({ objectMode: true },
      function (chunk, enc, callback) {
        streamedEntries++
        callback(null, chunk)
      }
    , function (callback) {
        callback()
      })
  )
}

function runQuery (db, query, callback) {
  streamedEntries = 0
  solution.query(db, query, function (err, words) {
    if (err)
      throw err

    console.log('Query: "%s", streamed %s entries, result: %s', query, streamedEntries, words.join(', '))
    callback()
  })
}

db.on('ready', function () {
  db = wrapped(db, methodUsed)

  solution.init(db, words, function (err) {
    if (err)
      throw err

    runQuery(db, 'AA', function () {
      runQuery(db, 'P*', function () {
        runQuery(db, 'M**', function () {
          runQuery(db, 'DI**', function () {
            runQuery(db, 'NODE', function () {
            })
          })
        })
      })
    })
  })
})