var multilevel = require('multilevel')
var net = require('net')
var db = multilevel.client()
var con = net.connect(4545)
con.pipe(db.createRpcStream()).pipe(con)

db.get('multilevelmeup', function (err, value) {
  if (err)
    throw err
  console.log(value)
  con.end()
})