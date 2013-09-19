const path        = require('path')
    , level       = require('level')
    , existing    = require('../../lib/setup-existing')
    , PassThrough = require('stream').PassThrough || require('readable-stream/passthrough')
    , through2map = require('through2-map')
    , sub         = require('level-sublevel')

function streamTo (dir, out) {
  var db = sub(level(dir))
  var r = db.sublevel('robots')
  var d = db.sublevel('dinosaurs')

  r.get('slogan', function (err, v) {
    if (err) return out.write('ERROR: ' + err + '\n')
    out.write('robot slogan: ' + v + '\n')
    d.get('slogan', function (err, v) {
      if (err) out.write('ERROR: ' + err + '\n')
      else out.write('dinosaur slogan: ' + v + '\n')
      out.end()
    })
  })
}

function setup (run, callback) {
  existing.setup(run, false)

  var c             = Math.ceil(Math.random() * 10) + 2
    , i             = c
    , obj           = {}
    , jsonobj
    , submissionOut = new PassThrough()
    , solutionOut   = !run && new PassThrough()

  submissionOut.resume()
  if (solutionOut) solutionOut.resume()

  setTimeout(streamTo.bind(null, existing.dir1, submissionOut), 500)
  ;!run && setTimeout(streamTo.bind(null, existing.dir2, solutionOut), 500)

  callback(null, {
      submissionArgs : [ existing.dir1 ]
    , solutionArgs   : [ existing.dir2 ]
    , long           : true
    , close          : existing.cleanup
    , a              : submissionOut
    , b              : !run && solutionOut
  })
}

module.exports       = setup
module.exports.async = true
