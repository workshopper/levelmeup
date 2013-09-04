 const path  = require('path')
    , fs     = require('fs')
    , os     = require('os')
    , level  = require('level')
    , rimraf = require('rimraf')
    , after  = require('after')
    , dir1   = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
    , dir2   = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)

function cleanup () {
  dir1 && rimraf.sync(dir1, function () {})
  dir2 && rimraf.sync(dir2, function () {})
}

function setup (run, callback) {
  cleanup()

  var db1 = level(dir1)
    , db2 = !run && level(dir2)
    , ops = fs.readFileSync(path.join(__dirname, '../../data/node_0.8_commits.dat'), 'utf8')
        .split('\n')
        .map(function (line) {
          var m = line.match(/^([^\s]+)\s+(.+)$/)
          return m && { type: 'put', key: m[1], value: m[2] }
        })
        .filter(Boolean)

  var done = after(run ? 1 : 2, function (err) {
  if (err)
    return callback(err)

    callback(null, {
        submissionArgs   : [ dir1 ]
      , solutionArgs     : [ dir2 ]
      , long             : true
      , close            : cleanup
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
