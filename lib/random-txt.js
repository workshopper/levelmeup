const fs        = require('fs')
    , path      = require('path')
    , EchoMunge = require('echomunge')

var db

function feed (p) {
  var stat = fs.lstatSync(p)

  if (stat.isFile() && (/(readme)|(\.txt$)/i).test(p))
    return db.recordText(fs.readFileSync(p, 'utf8'))

  if (!stat.isDirectory() || stat.isSymbolicLink())
    return

  fs.readdirSync(p).forEach(function (file) {
    feed(path.join(p, file))
  })
}

function random () {
  if (!db) {
    db = new EchoMunge()
    feed(path.join(__dirname, '..'))
  }
  return db.makeText({ maxLength: 1000, terminate: true })
}