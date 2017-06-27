Write a module with one argument that opens a LevelDB data-store using
**`level`**.

The store will contain up to 10 entries with keys in the form:

    'key' + i

Where _'i'_ is an integer between 0 and 100.

You must find those entries and return them in the callback as an, ordered
by _'i'_, ascending. Your module could look like:

```javascript
module.exports = function (databaseDir, callback) {
  var result = []
  // your code...
  result.push()
  // more code...
  callback(null,result)
}
```

The full path to the data-store will be provided to your program as
the first argument.

---

## Hints:

When you perform a `.get()` operation, if the entry does not exist
your callback will receive an error object as the first argument.

It is also possible to receive I/O errors but you can differentiate
a `NotFoundError` by checking `err.type == 'NotFoundError'` or by
checking for a `err.notFound` boolean.

Using `.get()` is recommended for this exercise but if you're tempted
to use a ReadStream to solve this problem, beware that the sorting
may be a problem.
