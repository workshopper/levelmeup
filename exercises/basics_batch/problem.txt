Write a program that opens a LevelDB data-store using `{bold}level{/bold}`.

The full path to the data-store will be provided to your program as
the first command-line argument.

The second command-line argument will be a full path to a file
containing some data you must load in to the data-store. Each {bold}line{/bold}
of the file will contain two or three strings separated by commas. The
first string will either be {italic}"put"{/italic} or {italic}"del"{/italic}, the second string will be
a {italic}key{/italic} and in the case of a "put", the third string will be a {italic}value{/italic}.

For example:

  put,@izs,Isaac Z. Schlueter
  put,@tmpvar,Elijah Insua
  put,@mrbruning,Max Bruning
  del,@darachennis

In this case, you have 3 new entries to add, mapping twitter handles
to real names, and one entry to remove.

You are encouraged to use the `batch()` method for this exercise. A
{italic}batch{/italic} operation is an atomic, and efficient mechanism for performing
multiple writes (put and delete).

----------------------------------------------------------------------
HINTS:

The `batch()` method has two forms:

 * The {italic}`Array` form{/italic} lets you provide an array containing your
   operations followed by an optional callback. The array must contain
   objects of the form:

     { type: 'put', key: 'foo', value: 'bar' }
     or:
     { type: 'del', key: 'foo' }

 * The {italic}chained form{/italic} is closer to the way that LevelDB exposes its
   batch operation. Calling `batch()` with no arguments returns a
   `Batch` object that you can use to build your complete set of
   writes and then submit when ready. It has the following methods:

     - batch.put('key', 'value')
     - batch.del('key')
     - batch.write(callback)

   You can't use the chained form of batch until the LevelUP instance
   is {italic}"ready"{/italic}, you can determine this by either providing a callback
   to the main `level()` function or by listening to a "ready" event
   on the resulting LevelUP object. See the LevelUP documentation for
   more details.

Batch writes are "atomic" in that either all writes succeed or they
all fail. If you receive an error on your callback then you can safely
assume that your whole batch failed.

The lines in the file can be safely split with:

  var arr = line.split(',')

To get output for debugging when running `levelmeup run program.js`
you should use console.error instead of console.log.
