// this is a bit too clever, probably best to avoid potential problems
// that might arise from using this

const path         = require('path')
    , trackMethods = require('workshopper/module-use-tracker').trackMethods
    , globmodule   = require('module')

function hijackLevel (name, path, trackFile) {
  require(path) // prime cache
  var orig = require.cache[path].exports
  require.cache[path].exports = function () {
    var ret = orig.apply(this, arguments)
    trackMethods(name, ret.__proto__, trackFile)
    return ret
  }
}

function init () {
  var parent   = {}
  parent.id    = parent.filename = path.resolve(process.cwd(), process.argv[5])
  parent.paths = globmodule._nodeModulePaths(path.dirname(process.argv[5]))

  process.argv[4].split(',').forEach(function (mod) {
    try {
      hijackLevel(mod, globmodule._resolveFilename(mod, parent), process.argv[3])
    } catch (e) {}
  })
}

module.exports.init = init
module.exports.args = 2