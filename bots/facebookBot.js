'use strict';
var express = require('express');
var wit = require( './witbot' );


var app = express();

var exports = module.exports = {};

exports.verify = (req, res ) => {
  if (req.query['hub.verify_token'] === 'i_fell_asleep_on_my_keyboard') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
};

exports.dealWithMessage = (req, res) => {
  // console.log( req.body.entry[0] );
  var messaging_events = req.body.entry[0].messaging;
  if( messaging_events ){

    for (var i = 0; i < messaging_events.length; i++) {
      var event = messaging_events[i];
      var sender = event.sender.id;
      console.log( event );
      console.log( '--------------------------------------' );
      console.log( event.sender );

      if (event.message && event.message.text) {
        var text = event.message.text;
        wit.message( text, (error, data) => {
          if (error) {
            console.log('Oops! Got an error: ' + error);
          } else {
              sendTextMessage( sender, 'Sorry im changing my litterbox 💩💩💩 ')
            // var reply = wit.parseMessage( data, ( message ) => {
            //   sendTextMessage( sender, message );
            // } );
            console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
          }
        });
      }
    }
  }

var token = 'CAAOSawHNHskBAK9iUpZBQNfk261LG5ZBjzKQMrAanXUR1PH6TpQu3T67o6RPFZAEiv0k2buX62UztXHe39AvQLlOII0m8SDgvvwaLYd7omeORdMYK6BAOcdPEhZAJ3xLoAmrZBT7b7rXlZB9JsdyKRx7JfAhWvwxugGJV3TXbf8r9diAZBEBZBfsmoQkxdlCamEZD';

var sendTextMessage = (sender, text) => {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}


  res.sendStatus(200);
}



var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'Xl-Fu3VgSH347wuaGudkPA',
  consumer_secret: '_Z-eP5uOy2b1c2cc0l5LyaW_IHU',
  token: 'NMLuRkyVpNOz4Ydcqsoky7wmao9H08qe',
  token_secret: '7YHP0BPxvRR3XSqRSsBK4eMTS7k',
});


// {
//   "msg_id":"f67a3859-2b43-46e7-8ad0-499141aa4e84",
//   "_text":"Where is a good patio?",
//   "outcomes":[{
//     "_text":"Where is a good patio?",
//     "confidence":null,
//     "intent":"default_intent",
//     "entities":{"intent":[
//       {"type":"value","value":"patio"}]}}]}

parseMessage = ( obj, cb ) => {
  var entities = obj.outcomes.entities;
  if( entities ){

    var intent = entities.intent.value;
    yelp.search({
      term: intent,
      location: 'Vancouver canada',
      limit: 20,
      sort: 0,
      radius_filter: 2000
    })
    .then(function ( data ) {
      //get a random selection
      let spots = data.businesses;
      var randBusiness = spots[Math.floor(Math.random() * spots.length)];
      var venueName = `${randBusiness.name} ${randBusiness.rating} stars`;
      cb.call( this, venueName );
    });
  }
};
