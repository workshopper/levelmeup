#!/usr/bin/env node

require('workshopper')({
    name     : 'levelmeup'
  , title    : 'LEVEL ME UP SCOTTY!'
  , subtitle : 'Learn You Some Node.js Databases'
  , appDir   : __dirname
  , menu     : {
        bg : 'green'
    }
}).init()