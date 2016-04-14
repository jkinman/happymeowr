'use strict';

const Wit = require('./node_modules/node-wit').Wit;

const token = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/template.js <wit-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  say: (sessionId, msg, cb) => {
    console.log(msg);
    cb();
  },
  merge: (context, entities, cb) => {
    console.log( context, entities );
    cb(context);
  },
  error: (sessionid, msg) => {
    console.log('Oops, I don\'t know what to do.');
  },
  'find-venue': (context, cb ) => {
    console.log( context );
    cb(context);

  }
};

const client = new Wit(token, actions);
client.interactive();
