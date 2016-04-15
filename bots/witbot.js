'use strict';

const token = process.env.wit_bot_token || 'QHVCRJPE3NXCNNNJQMP3DXI74I4KPVTF';
const Wit = require('node-wit').Wit;

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
