Write a program that opens a **`level`** directory and reads a key from it.

Your program should be written as Node.js module with 3 arguments. 

```javascript
module.exports = function (databaseDir, key, callback) {
  // your code...
  callback(error, value)
}
```

The `database_dir` contains the data to be read by the `leveldb`. Your program 
should then retrieve the value of `key` and pass it to the callback.

_Note: You have to close the database before returning the key!_

---

## Hints

**`level`** is a package that bundles both **`levelup`**, the Node-friendly
data-store API and **`leveldown`**, the low-level LevelDB binding.

Read more about Level and LevelUP: http://npmjs.com/levelup

Or off-line on your local filesystem:

    {rootdir}/docs/levelup.html

You will need to `npm install level` to get started with this
exercise.

If you don't have an Internet connection, simply make a `node_modules`
directory and copy the following directory into it:

    {rootdir}/node_modules/level/

You can open an existing data-store, or create a new one, by invoking
`level()` and passing in a path to a directory. The function returns
a new _LevelUP_ instance.

All LevelUP methods are asynchronous. To _get_ a value out of 
the data-store, use the `.get(key, callback)` method:

```javascript
var level = require('level')
var db = level('/path/to/db/')
db.get('foo', function (err, value) {
  console.log('foo =', value)
})
```
