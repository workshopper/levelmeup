#!/usr/bin/env node

const workshopper = require('workshopper-adventure')
    , path        = require('path')
    , levelMeUp   = workshopper({
        title        : 'LEVEL ME UP SCOTTY!'
      , subtitle     : 'Learn You Some Node.js Databases'
      , appDir       : __dirname
      , menu         : {
            bg : 'green'
        }
      , header      : require('workshopper-adventure/default/header')
      , helpFile : path.join(__dirname, 'help.txt')
    })

levelMeUp.addAll([
    "ALL YOUR BASE"
  , "Get Your Level On!"
  , "Basics: GET"
  , "Basics: PUT"
  , "Basics: BATCH"
  , "Streaming"
  , "@horse_js Count"
  , "@horse_js Tweets"
  , "Keywise"
  , "Short Scrabble Words"
  , "Sublevel"
  , "Multilevel"
])

module.exports = levelMeUp
