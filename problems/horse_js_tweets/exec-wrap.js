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

function booya (i) {
  var d = process.argv[i]
  if (!d)
    return
  streamedEntries = 0
  solution(db, d, function (err, tweets) {
    if (err)
      throw err
    if (!Array.isArray(tweets))
      return console.log('ERROR: module must return an array of tweets on the callback')
    tweets.forEach(function (tweet) {
      console.log('<@horse_js ' + d + '>', tweet)
    })
    console.log('[streamed %s entries for "%s"]', streamedEntries, d)
    booya(i + 1)
  })
}

db.on('ready', function () {
  db = wrapped(db, methodUsed)
  booya(5)
})