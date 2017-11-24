Write a module that uses multilevel to fetch a value from a server
running on your computer.

Create a TCP connection with the core `net` module to port **4545**
on localhost. Pipe this connection through a multilevel RPC stream and
back to the connection. Your code should look like:

```javascript
var multilevel = require('multilevel')
var net = require('net')

module.exports = function (callback) {
  var db = multilevel.client()
  var connection = net.connect(4545)
  connection.pipe(db.createRpcStream()).pipe(connection)

  // your code ...
  callback(null, value)
}
```

You will then have a `db` object that you can interact with like a
LevelUP object.

Fetch the value from the data store with the key `multilevelmeup`
and return it to the provided callback.

**You must close the connection using `connection.end(..)` after you
have fetched the value but before you execute the callback!**

---

## Hints:

Read more about multilevel here:

    http://npmjs.com/multilevel

Or off-line on your local filesystem:

    {rootdir}/docs/multilevel.html

You will need to `npm install multilevel` to get started with this
exercise.

If you don't have an Internet connection, simply make a `node_modules`
directory and copy the following directory into it:

    {rootdir}/node_modules/multilevel/
