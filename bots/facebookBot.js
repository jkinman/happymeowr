'use strict';
var exports = module.exports = {};
var express = require('express');
var app = express();
var wit = require( './witbot' );
var yelp = require( '../api/venueFinder.js' );
const request = require('request');

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
// {
//   "msg_id":"ac38d298-e19d-49ea-86d2-ab3ca9a6fca4",
//   "_text":"How about now?",
//   "outcomes":[{"_text":"How about now?","confidence":null,
//   "intent":"default_intent","entities":{"datetime":[{"type":"value","value":"2016-04-15T16:59:06.000-07:00","grain":"second","values":[{"type":"value","value":"2016-04-15T16:59:06.000-07:00","grain":"second"}]}]}}]}
            console.log( JSON.stringify(data) );

            var entities = false;
            if( data.outcomes && data.outcomes.intent && data.outcomes.intent.entities ){
              entities = data.outcomes.intent.entities;
            }

            if( entities ){
              var intent = 'dont know';
              if( entities.intent && entities.intent.value ){
                intent = entities.intent.value;
              }
              switch( intent ){
                case 'drugs':
                sendTextMessage( sender, `Only cat nap for me bro.` );
                break;

              case 'coffee':
              sendTextMessage( sender, `Ewwww, cats, hate ${intent}.` );
              break;

              case 'datetime':
              sendTextMessage( sender, `nap time.` );
              break;

                default:
                sendTextMessage( sender, `ok... ${intent}. ` );
                break;
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
                  sendTextMessage( sender, venueName );
                });
              }
            }
            else{
              sendTextMessage( sender, `zzzzzzzzzzzzzzzzz...` );
            }

          }
        });
      }
    }
  }

  var token = 'CAAOSawHNHskBAK9iUpZBQNfk261LG5ZBjzKQMrAanXUR1PH6TpQu3T67o6RPFZAEiv0k2buX62UztXHe39AvQLlOII0m8SDgvvwaLYd7omeORdMYK6BAOcdPEhZAJ3xLoAmrZBT7b7rXlZB9JsdyKRx7JfAhWvwxugGJV3TXbf8r9diAZBEBZBfsmoQkxdlCamEZD';

  var sendTextMessage = (sender, text) => {
    var messageData = {
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

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

// See the Webhook reference
// https://developers.facebook.com/docs/messenger-platform/webhook-reference
const getFirstMessagingEntry = (body) => {
  const val = body.object == 'page' &&
  body.entry &&
  Array.isArray(body.entry) &&
  body.entry.length > 0 &&
  body.entry[0] &&
  body.entry[0].id == FB_PAGE_ID &&
  body.entry[0].messaging &&
  Array.isArray(body.entry[0].messaging) &&
  body.entry[0].messaging.length > 0 &&
  body.entry[0].messaging[0]
  ;
  return val || null;
};

var parseMessage = ( obj, cb ) => {
  var entities = obj.outcomes.entities;
  if( entities ){
    var intent = entities.intent.value;
    var message;
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
