'use strict';
var express = require('express');
var wit = require( './witbot' );


var app = express();

var exports = module.exports = {};

exports.verify = (req, res ) => {
  if (req.query['hub.verify_token'] === 'my_token_here') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
};

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      wit.message( text, (error, data) => {
        if (error) {
          console.log('Oops! Got an error: ' + error);
        } else {
          console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        }
      });
    }
  }
  res.sendStatus(200);
});
