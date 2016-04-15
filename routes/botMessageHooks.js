var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fbbot', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'i_fell_asleep_on_my_keyboard') {
      res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

router.get('/slackbot', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/kikbot', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
