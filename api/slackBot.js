var Botkit = require('botkit');
var wit = require( './witbot' );

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

controller.configureSlackApp({
  clientId: process.env.clientId || '2194069077.34881592214',
  clientSecret: process.env.clientSecret || '50ce04f6746e55f1db0d217b3d6d4102',
  redirectUri: 'https://happymeowr.herokuapp.com/',
  scopes: ['incoming-webhook','team:read','users:read','channels:read','im:read','im:write','groups:read','emoji:read','chat:write:bot']
});

controller.setupWebserver( process.env.port || 8080, function(err,webserver) {

  // set up web endpoints for oauth, receiving webhooks, etc.
  controller
    .createHomepageEndpoint(controller.webserver)
    .createOauthEndpoints(controller.webserver,function(err,req,res) { ... })
    .createWebhookEndpoints(controller.webserver);

});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-34898924722-xPezESeJW34idudT8bJspbjJ',
}).startRTM()

controller.on('direct_message', function(bot, message) {

  wit.message( message, (error, data) => {
    if (error) {
      console.log('Oops! Got an error: ' + error);
    } else {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    }
  });
});
