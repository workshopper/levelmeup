function wrap (db, useCallback) {
  Object.keys(db.__proto__).forEach(function (methodName) {
    if (typeof db[methodName] != 'function')
      return
    var method = db[methodName]
    db[methodName] = function () {
      var use = useCallback(db, methodName, method, Array.prototype.slice.call(arguments))
      if (use)
        return use
      return method.apply(db, arguments)
    }
  })
  return db
}

module.exports = wrap