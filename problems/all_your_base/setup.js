// array for substitution in: 'ALL YOUR X ARE BELONG TO Y'
const inputs = [
    [ 'BASE', 'US' ]
  , [ 'LANDS AND POSESSIONS', 'VIKINGS OF WESTERN NORWAY' ]
  , [ 'INDEPENDENCE', 'KING HENRY VIII' ]
  , [ 'INTERNET COMMUNICATIONS', 'THE NSA' ]
  , [ 'TICKS', 'LIBUV' ]
]

module.exports = function () {
  var i = Math.floor(Math.random() * inputs.length)
  return { args: inputs[i], stdin: null, long: true }
}