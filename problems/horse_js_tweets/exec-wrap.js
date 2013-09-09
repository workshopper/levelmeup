// noop, let us take over this baby!
module.exports.init = function () {}
module.exports.args = -1

const path     = require('path')
    , level    = require('level')
    , db       = level(process.argv[4])
    , file     = process.argv[3]
    , horsejs  = require('../../data/horse_js.json')
    , solution = require(path.resolve(process.cwd(), file))

if (typeof solution != 'function')
  return console.log(process.argv[3], 'does not export a single function')

process.argv.slice(4).forEach(function (d) {
  solution(db, d, function (err, tweets) {
    if (err) throw err
    tweets.forEach(function (tweet) {
      console.log('<@horse_js ' + d + '>', tweet)
    })
  })
})