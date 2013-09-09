// noop, let us take over this baby!
module.exports.init = function () {}
module.exports.args = -1

const path     = require('path')
    , level    = require('level')
    , wrapped  = require('../../lib/wrapped-level')
    , db       = level(process.argv[4])
    , file     = process.argv[3]
    , horsejs  = require('../../data/horse_js.json')
    , solution = require(path.resolve(process.cwd(), file))
    , through2 = require('through2')

var streamedEntries

if (typeof solution != 'function')
  return console.log(process.argv[3], 'does not export a single function')

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

function out (date, count) {
  console.log('@horse_js tweets since %s: %s [streamed %s entries]', date, count, streamedEntries)
}

db.on('ready', function () {
  db = wrapped(db, methodUsed)
  streamedEntries = 0
  solution(db, process.argv[4], function (err, count) {
    if (err) throw err
    out(process.argv[4], count)

    streamedEntries = 0
    solution(db, process.argv[5], function (err, count) {
      if (err) throw err
      out(process.argv[5], count)

      streamedEntries = 0
      solution(db, process.argv[6], function (err, count) {
        if (err) throw err
        out(process.argv[6], count)
      })
    })
  })
})