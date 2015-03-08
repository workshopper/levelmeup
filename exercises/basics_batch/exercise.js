var exercise      = require('workshopper-exercise')()
  , filecheck     = require('workshopper-exercise/filecheck')
  , execute       = require('workshopper-exercise/execute')
  , comparestdout = require('workshopper-exercise/comparestdout')


// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// compare stdout of solution and submission
exercise = comparestdout(exercise)

var path        = require('path')
  , fs          = require('fs')
  , os          = require('os')
  , level       = require('level')
  , after       = require('after')
  , gibberish   = require('echomunge/dir2gibberish').bind(null, path.join(__dirname, '../..'))
  , existing    = require('../../lib/setup-existing')
  , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')
  , through2map = require('through2-map')
  , dataFile    = path.join(os.tmpDir(), '~levelmeup_3_' + process.pid)


function streamTo (dir, out, done) {
  return level(dir)
    .readStream()
    .on("close", done)
    .pipe(through2map({ objectMode: true }, function (data) {
      return data.key + ' = ' + data.value + '\n'
    }))
    .pipe(out)
}

exercise.addSetup(function setup (mode, callback) {
  existing.setup(mode)

  var i             = Math.ceil(Math.random() * 10) + 5
    , fileContents  = 'del,!existing1\n'
    , self          = this

  while (i-- >= 1) {
    fileContents +=
        'put,batchable'
        + Math.floor(Math.random() * 100)
        + ','
        + gibberish().replace(/,/g, '')
        + '\n'
  }

  fileContents += 'del,~existing2'

  fs.writeFileSync(dataFile, fileContents, 'utf8')

  this.submissionArgs = [ existing.dir1, dataFile ]
  this.solutionArgs = [ existing.dir2, dataFile ]
  this.submissionOut = new PassThrough()
  if (mode === 'verify')
    this.solutionOut   = new PassThrough()
  this.longCompareOutput = true

  existing.writeAndClose(
      function (db, callback) {
        db.batch([
            { type: 'put', key: '!existing1', value: 'THIS ENTRY SHOULD BE DELETED!' }
          , { type: 'put', key: '~existing2', value: 'THIS ENTRY SHOULD BE DELETED ALSO!' }
        ], callback)
      }
    , callback
  )
})

exercise.addProcessor(function (mode, callback) {
  this.sub
  var done = after(mode === "verify" ? 2 : 1, setTimeout.bind(null, callback, 10))
  ;streamTo(existing.dir1, this.submissionOut, done)
  if (mode === "verify")
    streamTo(existing.dir2, this.solutionOut, done)
})

exercise.addCleanup(existing.cleanup)

module.exports = exercise
