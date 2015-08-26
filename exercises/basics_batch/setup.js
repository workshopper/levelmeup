const path        = require('path')
    , fs          = require('fs')
    , os          = require('os')
    , level       = require('level')
    , gibberish   = require('echomunge/dir2gibberish').bind(null, path.join(__dirname, '../..'))
    , existing    = require('../../lib/setup-existing')
    , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')
    , through2map = require('through2-map')
    , dataFile    = path.join(os.tmpDir(), '~levelmeup_3_' + process.pid)

function streamTo (dir, out) {
  var db = level(dir)

  db.readStream()
    .pipe(through2map({ objectMode: true }, function (data) {
      return data.key + ' = ' + data.value + '\n'
    }))
    .pipe(out)
}

function setup (run, callback) {
  existing.setup(run)

  var i             = Math.ceil(Math.random() * 10) + 5
    , fileContents  = 'del,!existing1\n'
    , submissionOut = new PassThrough()
    , solutionOut   = !run && new PassThrough()
    , ops           = [
          { type: 'put', key: '!existing1', value: 'THIS ENTRY SHOULD BE DELETED!' }
        , { type: 'put', key: '~existing2', value: 'THIS ENTRY SHOULD BE DELETED ALSO!' }
      ]

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

  existing.writeAndClose(
      function (db, callback) {
        db.batch(ops, callback)
      }
    , function (err) {
        setTimeout(streamTo.bind(null, existing.dir1, submissionOut), 500)
        ;!run && setTimeout(streamTo.bind(null, existing.dir2, solutionOut), 500)

        callback(null, {
            submissionArgs : [ existing.dir1, dataFile ]
          , solutionArgs   : [ existing.dir2, dataFile ]
          , long           : true
          , close          : existing.cleanup
          , a              : submissionOut
          , b              : !run && solutionOut
        })
      }
  )
}

module.exports       = setup
module.exports.async = true
