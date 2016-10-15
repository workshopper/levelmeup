const path      = require('path')
    , os        = require('os')
    , level     = require('level')
    , rimraf    = require('rimraf')
    , after     = require('after')
    , diff      = require('diff')

function noop () {
}

function killTimer(fn, timeout, error) {
  var timer = null
  var killed = false
  var stop = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  var kill = function () {
    stop()
    killed = true
    fn(error)
  }
  var result = function () {
    stop()
    return fn.apply(null, arguments)
  }
  result.initTimeout = function () {
    stop()
    if (!killed) {
      timer = setTimeout(kill, timeout)
    }
  }
  result.cancelTimeout = stop
  return result
}

function setupDb (name) {
  var dir = path.join(os.tmpDir(), '~levelmeup_' + name + '_' + process.pid)
  rimraf.sync(dir)
  return dir
}

function formatDiffs (diffs) {
  return '```\n' + diffs.map(function (diff) {
    if (diff.removed) {
      return ' [-] ' + diff.value
    } else if (diff.added) {
      return ' [+] ' + diff.value
    }
    return ' [.] ' + diff.value
  }) + '```'
}

function exec (opt, file, callback) {
  var dir = setupDb('1')
  var db = level(dir)
  var handler = function (err) {
    cleanup(file + '\n\n{error.mod.unexpected}:\n\n```\n' + ((err && err.stack) || err) + '\n```')
  }
  process.on('uncaughtException', handler)
  var cleanup = function (err, data) {
    cleanup = noop
    process.removeListener('uncaughtException', handler)
    process.on('uncaughtException', noop)
    if (err) {
      try {
        rimraf.sync(dir)
      } catch (e) {
        // eat rimraf errors
      }
      return callback(err)
    }
    db = level(dir, function (err) {
      rimraf.sync(dir)
      if (err && err.type === 'OpenError') {
        callback(file + '\n\n{error.db.not_closed}')
      } else if (err) {
        callback(file + '\n\n{error.mod.unexpected}:\n\n```\n' + ((err && err.stack) || err) + '\n```')
      }
      db.close(function () {
        callback(null, data)
      })
    })
  }
  cleanup = killTimer(cleanup, 10000, file + '\n\n{error.timeout}')
  opt.prepare(db, function () {
    db.close(function () {
      var mod
      cleanup.initTimeout()
      try {
        mod = require(file)
      } catch (e) {
        return cleanup(file + '\n\n{error.mod.broken}:\n\n```\n' + e.stack + '\n```')
      }
      if (typeof mod !== 'function') {
        return cleanup(file + '\n\n{error.mod.not_function}')
      }
      /*
      if (mod.length < 3) {
        return cleanup(file + '\n\n{error.mod.not_long_enough}')
      }
      */
      try {
        cleanup.initTimeout()
        opt.exec(dir, mod, function (data) {
          cleanup.cancelTimeout()
          opt.process(dir, data, function (data) {
            cleanup(null, data)
          })
        })
      } catch(e) {
        handler(e)
      }
    })
  })
}

module.exports = function (opt) {
  return {
    problem: {
      file: path.join(opt.dir, 'problem.{lang}.md')
    },
    verify: function (args, callback) {
      exec(opt, path.join(opt.dir, 'solution.js'), function (err, data) {
        if (err) {
          return callback(err)
        }
        exec(opt, path.resolve(process.cwd(), args[0]), function (err, data2) {
          if (err) {
            return callback(err)
          }
          var diffs = diff.diffJson(data, data2)
          if (diffs.length === 1) {
            return callback(null, true)
          }
          callback('{error.not_same}:\n' + formatDiffs(diffs), false)
        })
      }.bind(this))
    },
    run: function (args, callback) {
      exec(opt, path.resolve(process.cwd(), args[0]), function (err, data) {
        if (err) {
          return callback(err)
        }
        console.log(JSON.stringify(data, null, 2))
      })
    }
  }
}
