const path     = require('path')
    , fs       = require('fs')
    , os       = require('os')
    , existing = require('../../lib/setup-existing')

function setup (run, callback) {
  existing.setup(run, false)

  callback(null, {
      submissionArgs   : [ existing.dir1 ]
    , solutionArgs     : [ existing.dir2 ]
    , long             : true
    , close            : existing.cleanup
    , execWrap         : require.resolve('./exec-wrap')
    , solutionExecWrap : require.resolve('./exec-wrap')
  })
}

module.exports       = setup
module.exports.async = true