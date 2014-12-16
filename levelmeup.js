#!/usr/bin/env node

const workshopper = require('workshopper')
    , path        = require('path')

workshopper({
    name         : 'levelmeup'
  , title        : 'LEVEL ME UP SCOTTY!'
  , subtitle     : 'Learn You Some Node.js Databases'
  , exerciseDir : path.join(__dirname, './exercises/')
  , appDir       : __dirname
  , menu         : {
        bg : 'green'
    }
  , helpFile : path.join(__dirname, 'help.txt')
})//.init()
