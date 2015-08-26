var level = require('level')
var os = require('os')
var path = require('path')
var through = require('through2')
var fs = require('fs')
var PassThrough = require('stream').PassThrough
  || require('readable-stream/passthrough')

var datafile = require.resolve('../../data/keywise.json')
var users = require(datafile).map(function (row) {
  return row.type === 'user' && row.name
}).filter(Boolean)

function streamTo (dir, out, users) {
  var db = level(dir)

  ;(function next () {
    if (users.length === 0)
      return out.end()

    var user = users.shift()

    reposFor(user, function (err, c) {
      if (err) {
        out.write('ERROR: ' + err + '\n')
        out.end()
      }

      out.write('repos for ' + user + ':\n')

      if (!c.repos || !Array.isArray(c.repos)) {
        out.write('ERROR: no `repos` property ' + user + '\'s entry value\n')
        return out.end()
      }
      c.repos.forEach(function (repo) {
        out.write('  ' + repo.name + '\n')
      })
      out.write('\n')
      next()
    })
  })()

  function reposFor (user, next) {
    var cur = {}
    db.readStream({ start: user, end: user + '~' })
      .on('data', function (data) {
        var value
        try {
          value = JSON.parse(data.value)
        } catch (e) {
          next('entry not stored as JSON: ' + data.key + '=' + data.value)
        }
        if (value.type === 'user') {
          if (cur.user)
            next(null, cur)
          cur.user = value
          cur.repos = []
        } else if (value.type === 'repo') {
          cur.repos.push(value)
        } else {
          next('unexpected row type in entry: ' + data.key + '=' + data.value)
        }
      })
      .on('end', function () {
        next(null, cur)
      })
  }
}

module.exports = function (run) {
  var dba = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db')
  var dbb = path.join(os.tmpDir(), 'keywise-' + Math.random() + '.db')

  var a = new PassThrough()
  var b = !run && new PassThrough()

  setTimeout(streamTo.bind(null, dba, a, users.slice()), 500)
  ;!run && setTimeout(streamTo.bind(null, dbb, b, users.slice()), 500)

  return {
      submissionArgs: [ dba, datafile ]
    , solutionArgs: [ dbb, datafile ]
    , long: true
    , a: a
    , b: !run && b
  }
}
