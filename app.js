var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var question1 = require('./routes/question1');
var question2 = require('./routes/question2');
var question3 = require('./routes/question3');
var question4 = require('./routes/question4');
var question5 = require('./routes/question5');
var question6 = require('./routes/question6');
var question7 = require('./routes/question7');
var question8 = require('./routes/question8');
var question9 = require('./routes/question9');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', question1);
app.use('/', question2);
app.use('/', question3);
app.use('/', question4);
app.use('/', question5);
app.use('/', question6);
app.use('/', question7);
app.use('/', question8);
app.use('/', question9);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
