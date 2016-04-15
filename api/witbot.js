'use strict';


var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'Xl-Fu3VgSH347wuaGudkPA',
  consumer_secret: '_Z-eP5uOy2b1c2cc0l5LyaW_IHU',
  token: 'NMLuRkyVpNOz4Ydcqsoky7wmao9H08qe',
  token_secret: '7YHP0BPxvRR3XSqRSsBK4eMTS7k',
});

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};


const actions = {
  say: (sessionId, msg, cb) => {
    console.log(msg);
    cb();
  },
  merge: (context, entities, cb) => {
    // console.log( context, entities );
    const intent = firstEntityValue(entities, 'intent');
     if(intent) {
       context.intent = intent;
     }

    cb(context);
  },
  error: (sessionid, msg) => {
    console.log('Oops, I don\'t know what to do.');
  },
  'find-venue': (context, cb ) => {

    yelp.search({
      term: context.intent,
      location: 'Vancouver canada',
    limit: 20,
    sort: 0,
    radius_filter: 2000
   })
    .then(function (data) {
      //get a random selection
      let spots = data.businesses;
      var randBusiness = spots[Math.floor(Math.random() * spots.length)];

      console.log( `${randBusiness.name} ${randBusiness.rating} stars`);
      console.log(randBusiness.location.display_address);

      cb(context);
    })
    .catch(function (err) {
      console.error(err);
      cb(context);
    });
    console.log( context );

  }
};

const client = new Wit(token, actions);
// client.interactive();

// client.message('where can I get drunk with a big group of friends tonight?', (error, data) => {
//   if (error) {
//     console.log('Oops! Got an error: ' + error);
//   } else {
//     console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
//   }
// });
