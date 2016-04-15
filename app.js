var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Botkit = require('botkit');
var os = require('os');

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var bots = require('./routes/botMessageHooks');

var app = express();

var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
app.use('/bots', bots);

console.log( `loaded routes` );

// Start server
// set the port of our application
// process.env.PORT lets the port be set by Heroku

app.listen( port, function() {
	console.log('Express server listening on %d', port );
});

module.exports = app;
