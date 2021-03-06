var workshopper = require('workshopper-adventure')
var levelMeUp = workshopper({
  appDir: __dirname,
  menu: {
    bg: 'green'
  },
  languages: ['en', 'ja'],
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass'),
  help: {
    file: './i18n/help/{lang}.md'
  }
})

levelMeUp.addAll([
  'all_your_base',
  'get_your_level_on',
  'basics_get',
  'basics_put',
  'basics_batch',
  'streaming',
  'horse_js_count',
  'horse_js_tweets',
  'keywise',
  'short_scrabble_words',
  'sublevel',
  'multilevel'
])

module.exports = levelMeUp
