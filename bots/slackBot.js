var Botkit = require('botkit');
var wit = require( './witbot' );

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-34898924722-xPezESeJW34idudT8bJspbjJ',
}).startRTM()

controller.on('message_received', function(bot, message) {
  wit.message( message, (error, data) => {
    if (error) {
      console.log('Oops! Got an error: ' + error);
    } else {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    }
  });
});
