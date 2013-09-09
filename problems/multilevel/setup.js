const path       = require('path')
    , os         = require('os')
    , level      = require('level')
    , net        = require('net')
    , multilevel = require('multilevel')
    , dir        = path.join(os.tmpDir(), '~levelmeup_' + process.pid)

function setup (run, callback) {
  var db = level(dir)
    , server = net.createServer(function(con) {
      con.pipe(multilevel.server(db)).pipe(con)
    }).listen(4545)

  db.put('multilevelmeup', '`Twas brillig, and the slithy toves\n\tDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\n\tAnd the mome raths outgrabe.')

  db.on('ready', function () {
    callback(null, {
        args  : []
      , stdin : null
      , long  : true
      , close : server.close.bind(server)
    })
  })
}

module.exports       = setup
module.exports.async = true