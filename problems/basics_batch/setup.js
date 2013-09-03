const path        = require('path')
    , fs          = require('fs')
    , os          = require('os')
    , level       = require('level')
    , rimraf      = require('rimraf')
    , after       = require('after')
    , dir1        = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
    , dir2        = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)
    , dataFile    = path.join(os.tmpDir(), '~levelmeup_3_' + process.pid)
    , gibberish   = require('echomunge/dir2gibberish').bind(null, path.join(__dirname, '../..'))
    , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')
    , through2map = require('through2-map')

function cleanup () {
  dir1 && rimraf(dir1, function () {})
  dir2 && rimraf(dir2, function () {})
}

function streamTo (dir, out) {
  var db = level(dir)

  db.readStream()
    .pipe(through2map({ objectMode: true }, function (data) {
      return data.key + ' = ' + data.value + '\n'
    }))
    .pipe(out)
}

function setup (run, callback) {
  rimraf.sync(dir1)
  ;!run && rimraf.sync(dir2)

  var db1           = level(dir1)
    , db2           = !run && level(dir2)
    , c             = Math.ceil(Math.random() * 10) + 5
    , i             = c
    , fileContents  = 'DEL,!existing1\n'
    , submissionOut = new PassThrough()
    , solutionOut   = !run && new PassThrough()
    , ops           = [
          { type: 'put', key: '!existing1', value: 'THIS ENTRY SHOULD BE DELETED!' }
        , { type: 'put', key: '~existing2', value: 'THIS ENTRY SHOULD BE DELETED ALSO!' }
      ]

  while (i-- >= 1) {
    fileContents +=
        'PUT,batchable'
        + Math.floor(Math.random() * 100)
        + ','
        + gibberish().replace(/,/g, '')
        + '\n'
  }

  fileContents += 'DEL,~existing2'

  fs.writeFileSync(dataFile, fileContents, 'utf8')

  var done = after(run ? 1 : 2, function (err) {
    if (err)
      return callback(err)

    setTimeout(streamTo.bind(null, dir1, submissionOut), 1000)
    ;!run && setTimeout(streamTo.bind(null, dir2, solutionOut), 1000)

    callback(null, {
        submissionArgs : [ dir1, dataFile ]
      , solutionArgs   : [ dir2, dataFile ]
      , long           : true
      , close          : cleanup
      , a              : submissionOut
      , b              : !run && solutionOut
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