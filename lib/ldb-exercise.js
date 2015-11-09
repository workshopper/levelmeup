var filecheck     = require('workshopper-exercise/filecheck')
  , execute       = require('workshopper-exercise/execute')
  , comparestdout = require('workshopper-exercise/comparestdout')
  , through2map   = require('through2-map')
  , level         = require('level')

function streamTo (dir, out, done) {
  return level(dir)
    .readStream()
    .on("error", function (e) {
      done(e)
    })
    .on("close", done)
    .pipe(through2map({ objectMode: true }, function (data) {
      return data.key + ' = ' + data.value + '\n'
    }))
    .pipe(out)
}

module.exports = function (setupLevelDB) {
  var exercise      = require('workshopper-exercise')()

  // checks that the submission file actually exists
  exercise = filecheck(exercise)

  // execute the solution and submission in parallel with spawn()
  exercise = execute(exercise)

  var path        = require('path')
    , fs          = require('fs')
    , after       = require('after')
    , existing    = require('./setup-existing')
    , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')

  exercise.addSetup(function setup (mode, callback) {
    existing.setup(mode)

    var data = setupLevelDB()
    
    this.submissionArgs = [ existing.dir1 ].concat( data.args || [] )
    this.solutionArgs   = [ existing.dir2 ].concat( data.args || [] )
    this.longCompareOutput = true

    if (data.op) {
      existing.writeAndClose(data.op, callback) 
    } else {
      nextTick(callback)
    }
  })

  exercise.addProcessor(function (mode, callback) {
    var done = after(mode === "verify" ? 2 : 1, setTimeout.bind(null, callback, 10))

    ;streamTo(existing.dir1, this.submissionStdout, done)
    if (mode === "verify")
      streamTo(existing.dir2, this.solutionStdout, done)
  })

  exercise.addCleanup(existing.cleanup)

  return exercise
}