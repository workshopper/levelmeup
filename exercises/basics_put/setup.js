const path        = require('path')
    , level       = require('level')
    , gibberish   = require('echomunge/dir2gibberish').bind(null, path.join(__dirname, '../..'))
    , existing    = require('../../lib/setup-existing')
    , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')
    , through2map = require('through2-map')

function streamTo (dir, out) {
  var db = level(dir)

  db.readStream()
    .pipe(through2map({ objectMode: true }, function (data) {
      return data.key + ' = ' + data.value + '\n'
    }))
    .pipe(out)
}

function setup (run, callback) {
  existing.setup(run, false)

  var c             = Math.ceil(Math.random() * 10) + 2
    , i             = c
    , obj           = {}
    , jsonobj
    , submissionOut = new PassThrough()
    , solutionOut   = !run && new PassThrough()

  while (i-- >= 1)
    obj['nonsense' + i] = gibberish()

  jsonobj = JSON.stringify(obj)

  setTimeout(streamTo.bind(null, existing.dir1, submissionOut), 500)
  ;!run && setTimeout(streamTo.bind(null, existing.dir2, solutionOut), 500)

  callback(null, {
      submissionArgs : [ existing.dir1, jsonobj ]
    , solutionArgs   : [ existing.dir2, jsonobj ]
    , long           : true
    , close          : existing.cleanup
    , a              : submissionOut
    , b              : !run && solutionOut
  })
}

module.exports       = setup
module.exports.async = true
