const path     = require('path')
    , existing = require('../../lib/setup-existing')
    , horsejs  = require('../../data/horse_js.json')

function setup (run, callback) {
  existing.setup(run)

  var ops = horsejs.map(function (tweet) {
    return {
        type  : 'put'
      , key   : new Date(tweet.date).toISOString()
      , value : tweet.tweet
    }
  })

  var start = new Date(horsejs[0].date)
    , end   = new Date(horsejs[horsejs.length - 1].date)
    , mark  = new Date(start.getTime() + Math.floor(Math.random() * (end.getTime() - start.getTime())))
    , marks = mark.getFullYear() + '-' + (mark.getUTCMonth() < 9 ? '0' : '') + (mark.getUTCMonth() + 1) + '-' + (mark.getUTCDate() < 9 ? '0' : '') + (mark.getUTCDate() + 1)

  existing.writeAndClose(
      function (db, callback) {
        db.batch(ops, callback)
      }
    , function (err) {
        if (err)
          return callback(err)

        callback(null, {
            submissionArgs : [ existing.dir1, marks ]
          , solutionArgs   : [ existing.dir2, marks ]
          , long           : true
          , close          : existing.cleanup
        })
      }
  )
}

module.exports       = setup
module.exports.async = true
