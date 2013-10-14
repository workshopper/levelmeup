const path      = require('path')
    , gibberish = require('echomunge/dir2gibberish').bind(null, path.join(__dirname,'../../node_modules/level/'))
    , existing  = require('../../lib/setup-existing')

function setup (run, callback) {
  existing.setup(run)

  var ops = []
    , i   = 10
    , k

  while (i-- > 0) {
    k = Math.floor(Math.random() * (i == 1 ? 10 : 100))
    ops.push({ type: 'put', key: 'gibberish' + k, value: gibberish() })
  }

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
