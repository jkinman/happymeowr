var express = require('express');
var router = express.Router();
var fbController = require( '../bots/facebookBot' );
// var slackController = require( '../bots/slackBot' );

router.get( '/fbbot', fbController.verify );
router.post( '/fbbot', fbController.dealWithMessage );

// router.get('/slackbot', slackBot.message );

router.get('/kikbot', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
