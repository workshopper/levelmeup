const path      = require('path')
    , os        = require('os')
    , level     = require('level')
    , rimraf    = require('rimraf')
    , after     = require('after')
    , dir1      = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
    , dir2      = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)
    //, trackFile = path.join(os.tmpDir(), '~levelmeup_' + process.pid + 'track.json')
    , gibberish = require('echomunge/dir2gibberish').bind(null, path.join(__dirname, '../..'))

/* too much cleverness going on underneath this, too much scope
   for problems, avoid for now
function verify () {
  var track   = require(trackFile)
    , fscalls = track.calls.filter(function (call) {
        return (call.module == 'level' || call.module == 'levelup')
          && call.stack
          && call.stack[0].file != 'module.js'
          && call.stack[0].file != 'fs.js'
      })

  fscalls.forEach(function (c) {
    // verify that each call is a 'get' and nothing else (e.g. batch)
    console.error(c.module, c.stack[0].file, c.fn)
  })
}
*/

function cleanup () {
  dir1 && rimraf(dir1, function () {})
  dir2 && rimraf(dir2, function () {})
}

function setup (run, callback) {
  rimraf.sync(dir1)
  rimraf.sync(dir2)

  var db1  = level(dir1)
    , db2  = level(dir2)
    , ops  = []
    , c    = Math.ceil(Math.random() * 10) + 2
    , i    = c
    //, wrap = [ require.resolve('../../lib/track-level'), trackFile, 'level,levelup' ]
    , done = after(2, function (err) {
        if (err)
          return callback(err)

        callback(null, {
            submissionArgs : [ dir1 ]
          , solutionArgs   : [ dir2 ]
          //, execWrap       : wrap
          //, verify         : verify
          , long           : true
          , close          : cleanup
        })
      })

  while (i-- >= 1) {
    ops.push({ type: 'put', key: 'gibberish' + i, value: gibberish() })
  }

  [ db1, db2 ].forEach(function (db) {
    db.batch(ops, function (err) {
      if (err)
        return done(err)
      db.close(done)
    })
  })
}

module.exports       = setup
module.exports.async = true