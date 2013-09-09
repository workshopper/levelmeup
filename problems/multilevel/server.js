var level = require('level');
var net = require('net');
var multilevel = require('multilevel');

var db = level(__dirname + '/db');

net.createServer(function(con) {
  con.pipe(multilevel.server(db)).pipe(con);
}).listen(4545);

db.put('the holy secret', 'the solution is *you*');
