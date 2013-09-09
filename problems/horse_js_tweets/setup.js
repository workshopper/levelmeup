const path     = require('path')
    , existing = require('../../lib/setup-existing')
    , horsejs  = require('../../data/horse_js.json')

function newDate () {
  var start = new Date(horsejs[0].date)
    , end   = new Date(horsejs[horsejs.length - 1].date)
    , mark  = new Date(start.getTime() + Math.floor(Math.random() * (end.getTime() - start.getTime())))
    , marks = mark.getFullYear() + '-' + (mark.getUTCMonth() < 9 ? '0' : '') + (mark.getUTCMonth() + 1) + '-' + (mark.getUTCDate() < 9 ? '0' : '') + (mark.getUTCDate() + 1)

  return marks
}

function setup (run, callback) {
  existing.setup(run)

  var ops = horsejs.map(function (tweet) {
    return {
        type  : 'put'
      , key   : new Date(tweet.date).toISOString()
      , value : tweet.tweet
    }
  })

  existing.writeAndClose(
      function (db, callback) {
        db.batch(ops, callback)
      }
    , function (err) {
        if (err)
          return callback(err)

        var dates = [ '2013-06-01', newDate(), '2013-07-11', newDate() ]

        callback(null, {
            submissionArgs   : [ existing.dir1 ].concat(dates)
          , solutionArgs     : [ existing.dir2 ].concat(dates)
          , long             : true
          , close            : existing.cleanup
          , execWrap         : require.resolve('./exec-wrap')
          , solutionExecWrap : require.resolve('./exec-wrap')
        })
      }
  )
}

module.exports       = setup
module.exports.async = true