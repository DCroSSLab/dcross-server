/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		app.js
* Description:      Express application setup - Database connection, routes setup and some general error handling
*
*/


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoClient = require('mongodb').MongoClient
const {mongo_uri} = require('./config')

// global variable to hold the connection
var mongo = {}

MongoClient.connect(mongo_uri, function(err, client) {
  if(err) { console.error(err); }
  // mongo = client.db('test') // once connected, assign the connection to the global variable
  mongo.events = client.db('events');
  mongo.reports = client.db('reports')
  mongo.users = client.db('users');
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var reportsRouter = require('./routes/reports');

var cors = require('cors')
var app = express();

//Using cors so that requests can be made from the port where React development server is running
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

//Static paths to serve images from.
//Filenames are stored along with path and extension fields, but filename is enough to get a resource.
app.use('/reports/telegram/images', express.static(path.join(__dirname, '/../shared_data/telegram/images')));
//Unused path as Twitter media is directly served with Twitter's media URL
// app.use('/reports/twitter/images', express.static(path.join(__dirname, '/../shared_data/twitter/images')));


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
