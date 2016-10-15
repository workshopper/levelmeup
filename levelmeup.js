#!/usr/bin/env node

const workshopper = require('workshopper-adventure')
    , path        = require('path')
    , levelMeUp   = workshopper({
        appDir  : __dirname
      , menu    : {
        bg: 'green'
      }
      , header  : require('workshopper-adventure/default/header')
      , helpFile: path.join(__dirname, 'help.txt')
    })

levelMeUp.addAll([
    "all_your_base"
  , "get_your_level_on"
  , "basics_get"
  , "basics_put"
  , "basics_batch"
  , "streaming"
  , "horse_js_count"
  , "horse_js_tweets"
  , "keywise"
  , "short_scrabble_words"
  , "sublevel"
  , "multilevel"
])

module.exports = levelMeUp
