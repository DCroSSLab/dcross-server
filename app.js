var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoClient = require('mongodb').MongoClient
const {mongo_uri} = require('./config')

var mongo = {} // global variable to hold the connection

MongoClient.connect(mongo_uri, function(err, client) {
  if(err) { console.error(err); }
  // mongo = client.db('test') // once connected, assign the connection to the global variable
  mongo.events = client.db('events');
  mongo.reports = client.db('reports')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var reportsRouter = require('./routes/reports');

var cors = require('cors')
var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('mongo_client', mongo);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
// module.exports = {
//   app: app,
//   mongo: mongo,
// }