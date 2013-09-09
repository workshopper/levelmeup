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

solution(db, process.argv[4], function (err, count) {
  if (err) throw err
  console.log('@horse_js tweets since', process.argv[4] + ':', count)

  solution(db, process.argv[5], function (err, count) {
    if (err) throw err
    console.log('@horse_js tweets since', process.argv[5] + ':', count)

    solution(db, process.argv[6], function (err, count) {
      if (err) throw err
      console.log('@horse_js tweets since', process.argv[6] + ':', count)
    })
  })
})