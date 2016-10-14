Write a module that opens a LevelDB data-store using **`level`**.

Your module should be written as Node.js module with 3 arguments. 

```javascript
module.exports = function (databaseDir, obj, callback) {
  // your code...
}
```

The second argument contains an object. **put** each property of the 
object as key and value into a level store.

Your solution will be verified by reading the data-store and checking
against the object that was provided to you.

---

## Hints:

The `put()` method in LevelUP is very simple, you just need to supply
the key and value. An optional callback may be passed if you need
to know when the data has been committed to the store or to
properly catch any errors (otherwise errors will be thrown):

```javascript
var db = level('/path/to/db/')
db.put('foo', 'bar', function (err) {
  if (err)
    return console.error('Error in put():', err)
  console.error('put foo = bar')
})
```

You may also call `db.close()` after all your callbacks have returned,
however this is optional as the data-store will be automatically
closed when your program exits. An open LevelDB store will not keep
your program running indefinitely.

To get output for debugging when running `levelmeup run program.js`
you should use console.error instead of console.log.
