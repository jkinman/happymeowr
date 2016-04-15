var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var bots = require('./routes/botMessageHooks');

var app = express();
console.log( `express started` );

const Wit = require('./node_modules/node-wit').Wit;
console.log( `wit imported` );

// const token = (() => {
//   if (process.argv.length !== 3) {
//     console.log('usage: node examples/template.js <wit-token>');
//     process.exit(1);
//   }
//   console.log( `wit bot starting with ${process.argv[2]}`)
//   return process.argv[2];
// })();

const token = 'QHVCRJPE3NXCNNNJQMP3DXI74I4KPVTF';

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
console.log( `loaded routes` );

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// console.log( `setup 404` );

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   console.log( `found env=development` );
//
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// Start server
server.listen( 8080, function() {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

module.exports = app;
