var multilevel = require('multilevel');
var net = require('net');

var db = multilevel.client();
var con = net.connect(4545);
con.pipe(db.createRpcStream()).pipe(con);

db.get('the holy secret', function(err, value) {
  console.log(value);
});
