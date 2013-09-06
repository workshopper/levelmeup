const horsejs     = require('../../data/horse_js.json')
    , path        = require('path')
    , fs          = require('fs')
    , os          = require('os')
    , level       = require('level')
    , rimraf      = require('rimraf')
    , after       = require('after')
    , dir1        = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
    , dir2        = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)

function cleanup () {
  dir1 && rimraf.sync(dir1, function () {})
  dir2 && rimraf.sync(dir2, function () {})
}

function setup (run, callback) {
  cleanup()

  var db1 = level(dir1)
    , db2 = !run && level(dir2)
    , ops = horsejs.map(function (tweet) {
        return {
            type  : 'put'
          , key   : new Date(tweet.date).toISOString()
          , value : tweet.tweet
        }
      })

  var done = after(run ? 1 : 2, function (err) {
  if (err)
    return callback(err)

    callback(null, {
        submissionArgs   : [ dir1 ]
      , solutionArgs     : [ dir2 ]
      , long             : true
      , close            : cleanup
      , execWrap         : require.resolve('./exec-wrap')
      , solutionExecWrap : require.resolve('./exec-wrap')
    })
  })

  function close (err) {
    if (err)
      return done(err)
    this.close(done)
  }

  db1.batch(ops, close.bind(db1))
  ;!run && db2.batch(ops, close.bind(db2))
}

module.exports       = setup
module.exports.async = true