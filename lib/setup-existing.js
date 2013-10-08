const path      = require('path')
    , os        = require('os')
    , level     = require('level')
    , rimraf    = require('rimraf')
    , after     = require('after')

var run
  , dir1
  , dir2
  , db1
  , db2

function setup (_run, instantiate) {
  if (typeof instantiate == 'undefined')
    instantiate = true
  run = _run
  dir1 = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
  rimraf.sync(dir1)
  if (instantiate)
    db1 = level(dir1)
  if (!run) {
    dir2 = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)
    rimraf.sync(dir2)
    if (instantiate)
      db2 = level(dir2)
  }
}

function cleanup () {
  dir1 && rimraf(dir1, function () {})
  dir2 && rimraf(dir2, function () {})
}

function writeAndClose(write, callback) {
  var done = after(run ? 1 : 2, callback)

  ;(run ? [ db1 ] : [ db1, db2] ).forEach(function (db) {
    write(db, function (err) {
      if (err)
        return done(err)
      db.close(function () {
        setTimeout(done, 10)
      })
    })
  })
}

module.exports = {
    setup         : setup
  , cleanup       : cleanup
  , writeAndClose : writeAndClose
  , get dir1() { return dir1 }
  , get dir2() { return dir2 }
}
