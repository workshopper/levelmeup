Write a program that opens a LevelDB data-store using **`level`** and reads a 
few keys.

Your program should be written as Node.js module with 1 argument that returns 
a stream. 

```javascript
module.exports = function (databaseDir) {
  var resultStream
  // your code...
  return resultStream
}
```


The resulting stream should be transformed to a stream of strings with one chunk per entry formatted as `{key}={value}`.

---

## Hints:

Since you don't know what the keys are in this exercise you can't
use `get()`. Instead, you'll need to query the data store using
a ReadStream.

The `createReadStream()` method creates a standard Node object-
stream where each chunk, or `data` event, is an entry in the data
store. Each data object has both `key` and `value` properties for
the entry.

You can therefore stream the entire contents of the data store with:

```javascript
    db.createReadStream().on('data', function (data) {
      // data.key and data.value
    })
```

There is still the need to `.close` the database after the stream has
ended!

You can use `through2` to process the stream. 

    npm i through2

or if you have no connection to 

    file://{rootdir}/node_modules/through2

Also note that the 'error' event may also be emitted if there is an
I/O error.
