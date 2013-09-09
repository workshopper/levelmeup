var level = require('level')
var os = require('os')
var path = require('path')
var through = require('through')
var fs = require('fs')
var PassThrough = require('stream').PassThrough
  || require('readable-stream/passthrough')

var datafile = path.join(__dirname, 'data.json')
var users = require('./data.json').map(function (row) {
  return row.type === 'user' && row.name
}).filter(Boolean)

function streamTo (dir, out) {
  var db = level(dir, { valueEncoding: 'json' })

  ;(function next () {
    if (users.length === 0) return out.end()
    var user = users.shift()

    reposFor(user, function (err, c) {
      if (err) return out.write('ERROR: ' + err + '\n')
      out.write('repos for ' + user + ':\n')

      c.repos.forEach(function (repo) {
        out.write('  ' + repo.name + '\n')
      })
      out.write('\n')
      next()
    })
  })()

  function reposFor (user, next) {
    var cur = {}
    db.readStream({ start: user, end: user + '\xff' })
      .pipe(through(write, end))

    function write (row) {
      if (row.value.type === 'user') {
        if (cur.user) next(null, cur)
        cur.user = row.value
        cur.repos = []
      } else if (row.value.type === 'repo') {
        cur.repos.push(row.value)
      } else next('unexpected row type ' + row.value.type)
    }

    function end () { next(null, cur) }
  }
}

module.exports = function (run) {
  var dba = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db')
  var dbb = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db')

  var a = new PassThrough
  var b = new PassThrough
  a.on('data', function () {})
  b.on('data', function () {})

  setTimeout(streamTo.bind(null, dba, a), 500)
  ;!run && setTimeout(streamTo.bind(null, dbb, b), 500)

  return {
      submissionArgs: [ dba, datafile ]
    , solutionArgs: [ dbb, datafile ]
    , long: true
    , a: a
    , b: b
  }
}
