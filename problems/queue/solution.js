
function Queue(db) {
  if (!(this instanceof Queue)) return new Queue(db)

  this._db = db
}

Queue.prototype.push = function(element, callback) {
  var key = (new Date()).toISOString()

  this._db.put(key, element, callback)

  return this
}

Queue.prototype.shift = function(callback) {
  var stream = this._db.createReadStream({
                 limit: 1
               })

    , db = this._db

  stream.once('data', function(data) {
    db.del(data.key, function(err) {
      callback(err, data.value)
    })
  })

  stream.once('error', callback)

  return this
}

Queue.prototype.clear = function(callback) {
  this._db.createReadStream()
      .pipe(this._db.createWriteStream({
              type: 'del'
            }))
      .on('close', callback)

  return this
}

module.exports = Queue
// you can find an alternative implementation
// with more features in https://github.com/mcollina/level-queue-type
