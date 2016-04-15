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

const actions = {
  say: (sessionId, context, message, cb) => {
    console.log(message);
    cb();
  },
  merge: (sessionId, context, entities, message, cb) => {
    cb(context);
  },
  error: (sessionId, context, error) => {
    console.log(error.message);
  },
};

const client = new Wit( token, actions );

module.exports = client;
