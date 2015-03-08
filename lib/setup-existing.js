const path      = require('path')
    , os        = require('os')
    , level     = require('level')
    , rimraf    = require('rimraf')
    , after     = require('after')

var mode
  , dir1
  , dir2
  , db1
  , db2

function setupDb (name) {
  var dir = path.join(os.tmpDir(), '~levelmeup_' + name + '_' + process.pid)
  rimraf.sync(dir)
  return dir
}

function setup (_mode, instantiate) {
  mode = _mode
  dir1 = setupDb('1')
  if (mode === 'verify')
    dir2 = setupDb('2')
  
  if (instantiate || typeof instantiate === 'undefined') { 
    db1 = level(dir1)
    if (dir2)
      db2 = level(dir2)
  }
}

function cleanup () {
  dir1 && rimraf(dir1, function () {})
  dir2 && rimraf(dir2, function () {})
}

function writeAndClose(write, callback) {
  var done = after(mode === 'verify' ? 2 : 1, callback)

  ;(mode === 'verify' ? [ db1, db2 ] : [ db1 ] ).forEach(function (db) {
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
