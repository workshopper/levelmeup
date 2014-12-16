var exercise      = require('workshopper-exercise')()
  , filecheck     = require('workshopper-exercise/filecheck')
  , execute       = require('workshopper-exercise/execute')
  , comparestdout = require('workshopper-exercise/comparestdout')


// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// compare stdout of solution and submission
exercise = comparestdout(exercise)

exercise.addSetup(function (mode, callback) {

  // array for substitution in: 'ALL YOUR X ARE BELONG TO Y'
  const inputs = [
      [ 'BASE', 'US' ]
    , [ 'LANDS AND POSESSIONS', 'VIKINGS OF WESTERN NORWAY' ]
    , [ 'INDEPENDENCE', 'KING HENRY VIII' ]
    , [ 'INTERNET COMMUNICATIONS', 'THE NSA' ]
    , [ 'TICKS', 'LIBUV' ]
  ]

  var i = Math.floor(Math.random() * inputs.length)
  this.submissionArgs = this.solutionArgs = inputs[i]

  process.nextTick(callback)
})

module.exports = exercise
