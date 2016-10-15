Write a program that opens a LevelDB data-store using **`level`** and reads a few keys.

Your program should be written as Node.js module with 3 arguments. 

```javascript
module.exports = function (databaseDir, changes, callback) {
  // your code...
  callback(values)
}
```

`changes` is an Object that contains a `del` property with an array of keys to
delete. It also contains a `put` property with an object that contains keys
and values to add to the leveldb.

For example:

```
{
  del: [ '@darachennis' ],
  put: {
    '@izs': 'Isaac Z. Schlueter',
    '@tmpvar': 'Elijah Insua',
    '@mrbruning': 'Max Bruning'
  }
}
```

In this case, you have 3 new entries to add, mapping twitter handles
to real names, and one entry to remove.

You are encouraged to use the `batch()` method for this exercise. A
_batch_ operation is an atomic, and efficient mechanism for
performing multiple writes (put and delete).

---

## Hints:

The `batch()` method has two forms:

### The `Array` form

The `Array` form lets you provide an array containing your operations
followed by an optional callback. The array must contain objects of the 
form:

```javascript
{ type: 'put', key: 'foo', value: 'bar' }
```

or:

```javascript
{ type: 'del', key: 'foo' }
```

### The _chained form_

The chained form is closer to the way that LevelDB exposes its batch
operation. Calling `batch()` with no arguments returns a `Batch` object 
that you can use to build your complete set of writes and then submit when 
ready. It has the following methods:

```javascript
batch.put('key', 'value')
batch.del('key')
batch.write(callback)
```

You can't use the chained form of batch until the LevelUP instance is
_"ready"_, you can determine this by either providing a callback to the 
main `level()` function or by listening to a "ready" event on the 
resulting LevelUP object. See the LevelUP documentation for more details.

### Atomicity
Batch writes are "atomic" in that either all writes succeed or they all fail. 
If you receive an error on your callback then you can safely assume that your 
whole batch failed.

To get output for debugging when running `{appname} run program.js`
you should use console.error instead of console.log.
