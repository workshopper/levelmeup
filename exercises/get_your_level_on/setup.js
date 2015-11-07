const path     = require('path')
    , existing = require('../../lib/setup-existing')

function setup (run, callback) {
  existing.setup(run)

  existing.writeAndClose(
      function (db, callback) {
        db.put('levelmeup', 'You have been LEVELED UP!', callback)
      }
    , function (err) {
        if (err)
          return callback(err)
        callback(null, {
            submissionArgs : [ existing.dir1, 'levelmeup' ]
          , solutionArgs   : [ existing.dir2, 'levelmeup' ]
          , long           : true
          , close          : existing.cleanup
        })
      }
  )
}

module.exports       = setup
module.exports.async = true
