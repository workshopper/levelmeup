Write a program that prints all of the key/value pairs in a LevelDB
store to the console. You will be provided with the location of the
store as the first argument on the command-line.

Each entry should be printed on a new line to stdout in the form:

key=value

---------------------------------------------------------------------
HINTS:

Since you don't know what the keys are in this exercise you can't
use `get()`. Instead, you'll need to query the data store using
a ReadStream.

The `createReadStream()` method creates a standard Node object-
stream where each chunk, or 'data' event, is an entry in the data
store. Each data object has both 'key' and 'value' properties for
the entry.

You can therefore stream the entire contents of the data store with:

  db.createReadStream().on('data', function (data) {
    // data.key and data.value
  })

Also note that the 'error' event may also be emitted if there is an
I/O error.
