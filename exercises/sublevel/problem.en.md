Sometimes you just need a clean namespace to fill up with junk without
worrying about conflicting with existing keys in use.

You can use **sublevel** for creating clean namespaces!

You can extend a db handle to use sublevel by doing:

```javascript
var db = sub(level(...))
```

Then you can call `db.sublevel()` to make a new sublevel.

Just call `db.sublevel()` with a name and you get an object that acts
just like a normal db handle except it lives in a namespace:

```javascript
var wizards = db.sublevel('wizards')
```

To level up on this adventure, you will get a database path as the
first module argument. Create 2 sublevels, one called "robots"
and the other called "dinosaurs".

For each sublevel, create a key called "slogan". Set the _slogan_ for
the dinosaurs sublevel to `'rawr'` and set the _slogan_ for the robots
sublevel to `'beep boop'`.

---

# Hints:

Read more about sublevel here:

    http://npmjs.com/level-sublevel

Or off-line on your local filesystem:

    {appDir}/docs/sublevel.html

You will need to `npm install level-sublevel` to get started with this
exercise.

If you don't have an Internet connection, simply make a `node_modules`
directory and copy the following directory into it:

    {appdir}/node_modules/level-sublevel/

To get output for debugging when running `{appname} run program.js`
you should use console.error instead of console.log.