var generate = require('../../lib/generate')

function newDate () {
  var start = new Date(horseJs[0].key)
    , end   = new Date(horseJs[horseJs.length - 1].key)
    , mark  = new Date(start.getTime() + Math.floor(Math.random() * (end.getTime() - start.getTime())))
    , marks = mark.getFullYear() + '-' + (mark.getUTCMonth() < 9 ? '0' : '') + (mark.getUTCMonth() + 1) + '-' + (mark.getUTCDate() < 9 ? '0' : '') + (mark.getUTCDate() + 1)

  return marks
}

var horseJs
var startDates

module.exports = require('../../lib/setup-existing')({
  dir: __dirname,
  prepare: function (db, callback) {
    if (!horseJs) {
      horseJs = require('../../data/horse_js.json')
      startDates = [ '2013-06-01', newDate(), '2013-07-11', newDate() ]
    }
    db.batch(horseJs, callback)
  },
  process: function (dbDir, result, callback) {
    callback(result)
  },
  exec: function (dbDir, mod, callback) {
    if (typeof mod !== 'function') {
      throw '{error.mod.not_function}'
    }
    if (mod.length < 3) {
      throw '{error.mod.not_long_enough}'
    }
    var dates = startDates.concat()
    var result = []
    var call = function () {
      mod(dbDir, dates.shift(), function (data) {
        result.push(data)
        if (dates.length === 0) {
          callback(result)
        } else {
          call()
        }
      })
    }
    call()
  }
})
