var path = require('path')
var os = require('os')
var level = require('level')
var rimraf = require('rimraf')
var deepDiff = require('deep-diff')
var execModule = require('exec-module')
var formatDiff = require('./formatDiff')

function setupDb (name) {
  var dir = path.join(os.tmpdir ? os.tmpdir() : os.tmpDir(), '~levelmeup_' + name + '_' + process.pid)
  rimraf.sync(dir)
  return dir
}

function exec (opts, file, callback) {
  var dbDir = setupDb('1')
  execModule(file, {
    setUp: function (file, opt, callback) {
      var db = level(dbDir)
      opts.prepare(db, function (err) {
        if (err) {
          return callback(err)
        }
        db.close(callback)
      })
    },
    exec: function (file, opt, mod, callback) {
      opts.exec(dbDir, mod, callback)
    },
    timeout: 5000,
    tearDown: function (file, opt, err, data, callback) {
      var db = level(dbDir, function (err) {
        if (err && err.type === 'OpenError') {
          return callback(file + '\n\n{error.db.not_closed}')
        } else if (err) {
          return callback(file + '\n\n{error.mod.unexpected}:\n\n```\n' + ((err && err.stack) || err) + '\n```')
        }
        db.close(function () {
          try {
            rimraf.sync(dbDir)
          } catch (e) {
            // eat rimraf errors
          }
          callback(null, data)
        })
      })
    }
  }, callback)
}

module.exports = function (opt) {
  return {
    problem: {
      file: path.join(opt.dir, 'problem.{lang}.md')
    },
    solution: {
      file: path.join(opt.dir, 'solution.js'),
      type: 'js'
    },
    verify: function (args, callback) {
      var cmd = opt.init()
      var finish = function (err) {
        if (err) {
          callback(null, false, err)
        }
        callback(null, true)
      }
      exec(cmd, path.join(opt.dir, 'solution.js'), function (err, data) {
        if (err) {
          return finish('Error in this workshopper!\n\n```\n' + err.stack + '\n```')
        }
        exec(cmd, path.resolve(process.cwd(), args[0]), function (err, data2) {
          if (err) {
            return finish('```\n' + err.stack + '\n```')
          }
          var diffs = deepDiff(data, data2)
          if (diffs === undefined) {
            return finish()
          }
          try {
            finish('{error.not_same}:\n' + formatDiff(diffs))
          } catch (e) {
            console.log(e)
          }
        })
      })
    },
    run: function (args, callback) {
      var cmd = opt.init()
      exec(cmd, path.resolve(process.cwd(), args[0]), function (err, data) {
        if (err) {
          return callback(err, false)
        }
        console.log(JSON.stringify(data, null, 2))
        callback(null, true)
      })
    }
  }
}
