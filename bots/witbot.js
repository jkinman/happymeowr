'use strict';

const token = process.env.wit_bot_token || 'QHVCRJPE3NXCNNNJQMP3DXI74I4KPVTF';
const Wit = require('node-wit').Wit;

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


// const actions = {
//   say: (sessionId, msg, cb) => {
//     console.log(msg);
//     cb();
//   },
//   merge: (sessionId, context, entities, message, cb) => {
//     // console.log( context, entities );
//     const intent = firstEntityValue(entities, 'intent');
//     if(intent) {
//       context.intent = intent;
//     }
//
//     cb(context);
//   },
//
//   error: (sessionid, msg) => {
//     console.log('Oops, I don\'t know what to do.');
//   },
//
//   'find-venue': (sessionId, context, cb ) => {
//
//     yelp.search({
//       term: context.intent,
//       location: 'Vancouver canada',
//       limit: 20,
//       sort: 0,
//       radius_filter: 2000
//     })
//     .then(function (data) {
//       //get a random selection
//       let spots = data.businesses;
//       var randBusiness = spots[Math.floor(Math.random() * spots.length)];
//
//       console.log( `${randBusiness.name} ${randBusiness.rating} stars`);
//       console.log(randBusiness.location.display_address);
//
//       cb(context);
//     })
//     .catch(function (err) {
//       console.error(err);
//       cb(context);
//     });
//     console.log( context );
//
//   }
// };

const client = new Wit(token );

module.exports = client;
