// noop, let us take over this baby!
module.exports.init = function () {}
module.exports.args = -1

const path  = require('path')
    , level = require('level')
    , db    = level(process.argv[4])
    , file  = process.argv[3]

var solution = require(path.resolve(process.cwd(), file))

if (typeof solution != 'function')
  return console.log(process.argv[3], 'does not export a single function')

solution(db, '2013-06-01', function (err, tweets) {
  if (err) throw err
  tweets.forEach(function (tweet) {
    console.log('<@horse_js 2013-06-01>', tweet)
  })

  solution(db, '2013-07-11', function (err, tweets) {
    if (err) throw err
    tweets.forEach(function (tweet) {
      console.log('<@horse_js 2013-07-11>', tweet)
    })
  })
})