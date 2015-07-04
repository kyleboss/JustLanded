var config  		= require('./config.js')
var Twit    		= require('twit');
var express 		= require('express');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var routes 			= require('./routes/index');
var users 			= require('./routes/users');
var app 			= express();
var http    		= require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var T       = new Twit({
	consumer_key: 			config.twitter.consumerKey,
	consumer_secret: 		config.twitter.consumerSecret,
	access_token: 			config.twitter.accessToken,
	access_token_secret: 	config.twitter.accessTokenSecret
});

http.listen(3000, function() {
  console.log('Listening on port %d', http.address().port);
});
// var stream = T.stream('statuses/sample')

var stream = T.stream('statuses/filter', { track: 'just landed' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})


io.sockets.on('connection', function (socket) {
	console.log("connented")
	stream.on('tweet', function(tweet) {
		socket.emit('info', { tweet: tweet});
	});
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
