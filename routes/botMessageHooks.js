var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fbbot', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/slackbot', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/kikbot', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
