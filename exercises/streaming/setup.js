const path     = require('path')
    , fs       = require('fs')
    , existing = require('../../lib/setup-existing')

function setup (run, callback) {
  existing.setup(run)

  var ops = fs.readFileSync(path.join(__dirname, '../../data/node_0.8_commits.dat'), 'utf8')
        .split('\n')
        .map(function (line) {
          var m = line.match(/^([^\s]+)\s+(.+)$/)
          return m && { type: 'put', key: m[1], value: m[2] }
        })
        .filter(Boolean)

  existing.writeAndClose(
      function (db, callback) {
        db.batch(ops, callback)
      }
    , function (err) {
        if (err)
          return callback(err)
        callback(null, {
            submissionArgs : [ existing.dir1 ]
          , solutionArgs   : [ existing.dir2 ]
          , long           : true
          , close          : existing.cleanup
        })
      }
  )
}

module.exports       = setup
module.exports.async = true
