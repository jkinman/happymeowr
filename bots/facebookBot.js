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
            var reply = wit.parseMessage( data, ( message ) => {
              sendTextMessage( sender, message );
            } );
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
