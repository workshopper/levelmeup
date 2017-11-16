#!/usr/bin/env node
var Twitter = require('twitter')
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
})

var all = []
var fs = require('fs')
var path = require('path')
var out = fs.createWriteStream(path.join(__dirname, '..', 'data', 'horse_js.json'))

console.log('Loading all tweets from @horse_js')
out.write('[\n')
function more (formerId) {
  client.get('statuses/user_timeline', {screen_name: 'horse_js', count: 200, max_id: formerId}, function (error, tweets) {
    if (error) {
      if (error.length === 1 && error[0].code === 215) {
        console.log('Authentication Incorrect, please set following environment variables:')
        console.log('- CONSUMER_KEY')
        console.log('- CONSUMER_SECRET')
        console.log('- TOKEN_KEY')
        console.log('- TOKEN_SECRET')
      } else {
        console.log('Error: ')
        console.log(error)
      }
      process.exit(1)
    }
    console.log('Found tweets: ' + all.length + '〜' + (all.length + tweets.length))
    tweets.forEach(function (tweet, nr) {
      if (!tweet.retweeted) {
        if (nr !== 0 || all.length !== 0) {
          out.write(',\n')
        }
        out.write(JSON.stringify({
          type: 'put',
          key: new Date(tweet.created_at).toISOString(),
          value: tweet.text
        }))
      }
    })
    all = all.concat(tweets)
    if (all.length < 5000 && tweets.length > 0) {
      var id = tweets[tweets.length - 1].id
      console.log('Continuing from ' + id)
      more(id)
    } else {
      out.write('\n]')
      out.end()
    }
  })
}

more()
