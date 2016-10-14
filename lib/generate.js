var path = require('path')
var gibberish = require('./gibberish')

module.exports = function (i) {
  var key = 'level_' + Date.now().toString(32) + '_' + (Math.random() * 1000 | 0)
  var data = {}
  while (i-- > 0) {
    data[key + i] = gibberish()
  }
  return data
}
