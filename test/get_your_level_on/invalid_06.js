module.exports = function (dir, key, callback) {
  setTimeout(function () {
    callback(null, {
      dir: dir,
      key: key
    })
  })
}
