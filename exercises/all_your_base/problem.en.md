To get into the rhythm, let's do a simple _hello world_.

Write a Node module with three arguments:

```javascript
module.exports = function (X, Y, callback) {
  callback(/* your code here */)
}
```

This module should use **X** and **Y** and call the `callback` with the 
following text:

    ALL YOUR {X} ARE BELONG TO {Y}

Where `X` and `Y` are filled in with the arguments. When you have completed 
your program, you can run it in the test environment with:

    {appname} run program.js

And once you are happy that it is correct then run:

    {appname} verify program.js

And your submission will be verified for correctness. After you have
a correct solution, run **`{appname}`** again and select the next problem!
