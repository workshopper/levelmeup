const path        = require('path')
    , os          = require('os')
    , level       = require('level')
    , rimraf      = require('rimraf')
    , after       = require('after')
    , dir1        = path.join(os.tmpDir(), '~levelmeup_1_' + process.pid)
    , dir2        = path.join(os.tmpDir(), '~levelmeup_2_' + process.pid)
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

function setup (run) {
  rimraf.sync(dir1)
  ;!run && rimraf.sync(dir2)

  var c             = Math.ceil(Math.random() * 10) + 2
    , i             = c
    , obj           = {}
    , jsonobj
    , submissionOut = new PassThrough()
    , solutionOut   = !run && new PassThrough()

  while (i-- >= 1)
    obj['nonsense' + i] = gibberish()

  jsonobj = JSON.stringify(obj)

  setTimeout(streamTo.bind(null, dir1, submissionOut), 500)
  ;!run && setTimeout(streamTo.bind(null, dir2, solutionOut), 500)

  return {
      submissionArgs : [ dir1, jsonobj ]
    , solutionArgs   : [ dir2, jsonobj ]
    , long           : true
    , close          : cleanup
    , a              : submissionOut
    , b              : !run && solutionOut
  }
}

module.exports = setup