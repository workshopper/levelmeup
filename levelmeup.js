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
  "ALL YOUR_BASE",
  "BASICS BATCH",
  "BASICS GET",
  "BASICS PUT",
  "GET YOUR LEVEL ON",
  "HORSE JS COUNT",
  "HORSE JS TWEETS",
  "KEYWISE",
  "MULTILEVEL",
  "SHORT SCRABBLE WORDS",
  "STREAMING",
  "SUBLEVEL"
])

module.exports = levelMeUp
