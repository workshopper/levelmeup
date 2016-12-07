module.exports = function (db, key, callback) {
  setImmediate(function () {
    throw new Error('def')
  })
}
